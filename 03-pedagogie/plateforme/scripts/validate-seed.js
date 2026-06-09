import { loadSeedFile, validateSeedData } from "../src/services/seedService.js";

const data = await loadSeedFile("05-donnees/seeds/seed-data.json");
validateSeedData(data);
console.log("✅ 05-donnees/seeds/seed-data.json est valide.");
