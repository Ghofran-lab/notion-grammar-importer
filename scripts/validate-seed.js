import { loadSeedFile, validateSeedData } from "../src/services/seedService.js";

const data = await loadSeedFile("seed-data.json");
validateSeedData(data);
console.log("✅ seed-data.json est valide.");
