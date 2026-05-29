/**
 * Configuration de la connexion PostgreSQL
 *
 * Supporte:
 * - Développement local (docker-compose)
 * - Production cloud (Render, Railway, etc.)
 */

import pg from "pg";
import dotenv from "dotenv";

dotenv.config({ path: process.env.DOTENV_CONFIG_PATH || ".env.local" });
dotenv.config();

const { Pool } = pg;

// Récupérer la DATABASE_URL ou construire à partir des variables DB_*
let databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  const user = process.env.DB_USER || process.env.PGUSER || "postgres";
  const password = process.env.DB_PASSWORD || process.env.PGPASSWORD || process.env.POSTGRES_PASSWORD || "postgres";
  const host = process.env.DB_HOST || process.env.PGHOST || "localhost";
  const port = process.env.DB_PORT || process.env.PGPORT || 5432;
  const db = process.env.DB_NAME || process.env.PGDATABASE || process.env.POSTGRES_DB || "grammar_app";

  databaseUrl = `postgresql://${user}:${password}@${host}:${port}/${db}`;
}

console.log(`📦 Connexion à PostgreSQL...`);
console.log(`   URL: ${databaseUrl.replace(/:[^:@/]+@/, ":***@")}`);

// Créer le pool de connexions
const pool = new Pool({
  connectionString: databaseUrl,
  // Activer SSL si DATABASE_URL contient 'sslmode=require' ou si explicitement demandé
  ssl: process.env.DB_SSL === 'true' || /sslmode=require/.test(databaseUrl) ? { rejectUnauthorized: false } : false,
  // Pour éviter les timeouts en production
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Gestion des erreurs de pool
pool.on("error", (err) => {
  console.error("❌ Erreur PostgreSQL non gérée:", err);
  process.exit(1);
});

/**
 * Exécute une requête
 * @param {string} query - Requête SQL
 * @param {Array} params - Paramètres (pour prévenir les injections SQL)
 * @returns {Promise<Object>} Résultat {rows, rowCount}
 */
export async function query(sql, params = []) {
  try {
    const result = await pool.query(sql, params);
    return result;
  } catch (error) {
    console.error("❌ Erreur requête:", error.message);
    console.error("   SQL:", sql);
    console.error("   Params:", params);
    throw error;
  }
}

/**
 * Exécute une transaction
 * @param {Function} callback - Fonction contenant les requêtes
 * @returns {Promise} Résultat de la transaction
 */
export async function transaction(callback) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await callback(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Teste la connexion
 * @returns {Promise<boolean>} True si connecté
 */
export async function testConnection() {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log(`✅ Connecté à PostgreSQL`);
    return true;
  } catch (error) {
    console.error(`❌ Impossible de connecter à PostgreSQL:`, error.message);
    return false;
  }
}

/**
 * Ferme le pool de connexions
 */
export async function closePool() {
  await pool.end();
  console.log(`🔌 Connexion fermée`);
}

export default pool;
