import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { GoogleSheetsService, loadServiceAccountCredentials } from "../src/services/googleSheetsService.js";
import test from "node:test";
import { GoogleSheetsService } from "../src/services/googleSheetsService.js";

test("readRows requests an encoded A1 range with the cached access token", async () => {
  const calls = [];
  const service = new GoogleSheetsService({
    spreadsheetId: "sheet-id",
    fetchImpl: async (url, options) => {
      calls.push({ url, options });
      return { ok: true, status: 200, json: async () => ({ values: [["id"], ["rule-1"]] }) };
    },
  });
  service.accessToken = "cached-token";
  service.accessTokenExpiresAt = Date.now() + 120_000;

  assert.deepEqual(await service.readRows("grammar_rules"), [["id"], ["rule-1"]]);
  assert.match(calls[0].url, /\/values\/'grammar_rules'!A%3AZZ$/);
  assert.equal(calls[0].options.headers.authorization, "Bearer cached-token");
});

test("writeRows clears the tab before replacing its values", async () => {
  const calls = [];
  const service = new GoogleSheetsService({
    spreadsheetId: "sheet-id",
    fetchImpl: async (url, options) => {
      calls.push({ url, options });
      return { ok: true, status: 200, json: async () => ({}) };
    },
  });
  service.accessToken = "cached-token";
  service.accessTokenExpiresAt = Date.now() + 120_000;

  await service.writeRows("grammar_rules", [["id"], ["rule-1"]]);
  assert.equal(calls.length, 2);
  assert.match(calls[0].url, /:clear$/);
  assert.equal(calls[0].options.method, "POST");
  assert.match(calls[1].url, /!A1\?valueInputOption=RAW$/);
  assert.equal(calls[1].options.method, "PUT");
});


test("loadServiceAccountCredentials reads the downloaded JSON key file", () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "grammar-sheets-"));
  const credentialFile = path.join(directory, "service-account.json");
  fs.writeFileSync(credentialFile, JSON.stringify({ client_email: "writer@example.test", private_key: "private-key" }));

  try {
    assert.deepEqual(loadServiceAccountCredentials({ credentialFile }), {
      email: "writer@example.test",
      privateKey: "private-key",
    });
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

test("loadServiceAccountCredentials keeps environment variables as a hosting fallback", () => {
  assert.deepEqual(loadServiceAccountCredentials({ email: "writer@example.test", privateKey: "line-1\\nline-2" }), {
    email: "writer@example.test",
    privateKey: "line-1\nline-2",
  });
});
