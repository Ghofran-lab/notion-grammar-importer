#!/usr/bin/env node
import fs from "fs/promises";

const data = JSON.parse(await fs.readFile(new URL("../seed-grammar.json", import.meta.url), "utf-8"));
if (!Array.isArray(data.grammar_rules)) throw new Error("Format invalide: grammar_rules doit être un tableau.");
for (const [index, rule] of data.grammar_rules.entries()) {
  for (const field of ["level", "title", "category", "learning_objective", "short_description", "order_index"]) {
    if (rule[field] === undefined || rule[field] === "") throw new Error(`Règle ${index}: champ manquant ${field}`);
  }
}
console.log(`✅ seed-grammar.json valide: ${data.grammar_rules.length} règles.`);
