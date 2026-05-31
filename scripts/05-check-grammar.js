#!/usr/bin/env node
import grammarRepository from "../src/repositories/grammarRepository.js";

await grammarRepository.initialize();
const stats = await grammarRepository.getStatistics();
const levels = await grammarRepository.getLevels();
console.log("✅ Google Sheets accessible.");
console.log(`   Niveaux: ${levels.join(", ") || "aucun"}`);
console.log(`   Règles: ${stats.rules}; leçons: ${stats.lessons}; exercices: ${stats.exercises}; questions: ${stats.questions}`);
