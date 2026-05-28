import { closePool } from "../src/db/connection.js";
import { loadSeedFile, importSeedData } from "../src/services/seedService.js";

const data = await loadSeedFile("seed-data.json");
const result = await importSeedData(data);
console.log("✅ Import terminé:", result);
await closePool();
