#!/usr/bin/env node
import grammarRepository from "../src/repositories/grammarRepository.js";

const stats = await grammarRepository.getStatistics();
console.log("📊 Contenu Google Sheets:");
console.log(stats);
