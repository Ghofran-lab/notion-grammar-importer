import fs from "fs/promises";
import { query, closePool } from "../src/db/connection.js";

const schema = await fs.readFile("05-donnees/schemas/schema.sql", "utf-8");
await query(schema);
console.log("✅ Schéma initialisé.");
await closePool();
