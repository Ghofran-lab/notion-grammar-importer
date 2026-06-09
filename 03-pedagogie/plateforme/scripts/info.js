import { query, closePool } from "../src/db/connection.js";

const rules = await query("SELECT level_cecrl, COUNT(*)::int AS total FROM rules GROUP BY level_cecrl ORDER BY level_cecrl");
const ex = await query("SELECT difficulty, COUNT(*)::int AS total FROM exercises GROUP BY difficulty ORDER BY difficulty");

console.log("📚 Règles par niveau:", rules.rows);
console.log("🧩 Exercices par difficulté:", ex.rows);

await closePool();
