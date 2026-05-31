#!/usr/bin/env node
import fs from "fs/promises";
import grammarRepository from "../src/repositories/grammarRepository.js";

const data = JSON.parse(await fs.readFile(new URL("../seed-grammar.json", import.meta.url), "utf-8"));
const result = await grammarRepository.importRules(data.grammar_rules);
console.log(`✅ Import Google Sheets terminé: ${result.imported} règles importées, ${result.total} règles présentes.`);
