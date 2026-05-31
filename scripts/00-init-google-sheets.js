#!/usr/bin/env node
import grammarRepository from "../src/repositories/grammarRepository.js";

const result = await grammarRepository.initialize();
console.log("✅ Google Sheets initialisé.");
console.log(`   Onglets disponibles: ${result.available.join(", ")}`);
if (result.created.length > 0) console.log(`   Onglets créés: ${result.created.join(", ")}`);
