import crypto from "crypto";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config({ path: process.env.DOTENV_CONFIG_PATH || ".env.local" });
dotenv.config();

const SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SHEETS_API_URL = "https://sheets.googleapis.com/v4/spreadsheets";

function required(name, value) {
  if (!value) throw new Error(`Variable d'environnement manquante: ${name}`);
  return value;
}

function base64url(value) {
  return Buffer.from(value).toString("base64url");
}

export function loadServiceAccountCredentials({ credentialFile, email, privateKey } = {}) {
  const file = credentialFile || process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE;
  if (file) {
    let credentials;
    try {
      credentials = JSON.parse(fs.readFileSync(file, "utf-8"));
    } catch (error) {
      throw new Error(`Impossible de lire GOOGLE_SERVICE_ACCOUNT_KEY_FILE (${file}): ${error.message}`);
    }
    return {
      email: required("client_email dans le fichier JSON du compte de service", credentials.client_email),
      privateKey: required("private_key dans le fichier JSON du compte de service", credentials.private_key),
    };
  }

  return {
    email: required("GOOGLE_SERVICE_ACCOUNT_EMAIL ou GOOGLE_SERVICE_ACCOUNT_KEY_FILE", email || process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL),
    privateKey: required("GOOGLE_PRIVATE_KEY ou GOOGLE_SERVICE_ACCOUNT_KEY_FILE", privateKey || process.env.GOOGLE_PRIVATE_KEY).replace(/\\n/g, "\n"),
  };
}

function quoteSheetName(sheetName) {
  return `'${sheetName.replaceAll("'", "''")}'`;
}

export class GoogleSheetsService {
  constructor({ spreadsheetId, fetchImpl = globalThis.fetch } = {}) {
    this.spreadsheetId = spreadsheetId || process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    this.fetch = fetchImpl;
    this.accessToken = null;
    this.accessTokenExpiresAt = 0;
  }

  getSpreadsheetId() {
    return required("GOOGLE_SHEETS_SPREADSHEET_ID", this.spreadsheetId);
  }

  async getAccessToken() {
    if (this.accessToken && Date.now() < this.accessTokenExpiresAt - 60_000) return this.accessToken;

    const now = Math.floor(Date.now() / 1000);
    const { email, privateKey } = loadServiceAccountCredentials();
    const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
    const claims = base64url(JSON.stringify({ iss: email, scope: SHEETS_SCOPE, aud: TOKEN_URL, exp: now + 3600, iat: now }));
    const unsignedJwt = `${header}.${claims}`;
    const signature = crypto.sign("RSA-SHA256", Buffer.from(unsignedJwt), privateKey).toString("base64url");
    const assertion = `${unsignedJwt}.${signature}`;
    const response = await this.fetch(TOKEN_URL, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion }),
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(`Authentification Google impossible: ${payload.error_description || payload.error || response.status}`);

    this.accessToken = payload.access_token;
    this.accessTokenExpiresAt = Date.now() + payload.expires_in * 1000;
    return this.accessToken;
  }

  async request(path = "", { method = "GET", body } = {}) {
    const response = await this.fetch(`${SHEETS_API_URL}/${this.getSpreadsheetId()}${path}`, {
      method,
      headers: { authorization: `Bearer ${await this.getAccessToken()}`, ...(body ? { "content-type": "application/json" } : {}) },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
    const payload = response.status === 204 ? {} : await response.json();
    if (!response.ok) throw new Error(`Google Sheets API: ${payload.error?.message || response.status}`);
    return payload;
  }

  async listSheetNames() {
    const payload = await this.request("?fields=sheets.properties.title");
    return (payload.sheets || []).map((sheet) => sheet.properties.title);
  }

  async ensureSheets(tableDefinitions) {
    const existing = new Set(await this.listSheetNames());
    const missing = Object.keys(tableDefinitions).filter((name) => !existing.has(name));
    if (missing.length > 0) {
      await this.request(":batchUpdate", {
        method: "POST",
        body: { requests: missing.map((title) => ({ addSheet: { properties: { title } } })) },
      });
    }

    for (const [name, headers] of Object.entries(tableDefinitions)) {
      const values = await this.readRows(name);
      if (values.length === 0) await this.writeRows(name, [headers]);
      else if (values[0].join("|") !== headers.join("|")) {
        throw new Error(`En-têtes invalides dans l'onglet ${name}. En-têtes attendus: ${headers.join(", ")}`);
      }
    }
    return { created: missing, available: Object.keys(tableDefinitions) };
  }

  async readRows(sheetName) {
    const range = encodeURIComponent(`${quoteSheetName(sheetName)}!A:ZZ`);
    const payload = await this.request(`/values/${range}`);
    return payload.values || [];
  }

  async writeRows(sheetName, rows) {
    const fullRange = encodeURIComponent(`${quoteSheetName(sheetName)}!A:ZZ`);
    await this.request(`/values/${fullRange}:clear`, { method: "POST" });
    if (rows.length > 0) {
      const startRange = encodeURIComponent(`${quoteSheetName(sheetName)}!A1`);
      await this.request(`/values/${startRange}?valueInputOption=RAW`, { method: "PUT", body: { values: rows } });
    }
  }
}

export default new GoogleSheetsService();
