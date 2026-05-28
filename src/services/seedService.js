import fs from "fs/promises";
import { transaction } from "../db/connection.js";
import { createRule, getRuleByInternalId, addRuleExample, addRuleMistake } from "../db/queries/rules.js";
import { createExercise } from "../db/queries/exercises.js";

export async function loadSeedFile(path = "seed-data.json") {
  const raw = await fs.readFile(path, "utf-8");
  return JSON.parse(raw);
}

export function validateSeedData(data) {
  if (!data || !Array.isArray(data.rules) || !Array.isArray(data.exercises)) {
    throw new Error("Format seed invalide: { rules: [], exercises: [] } attendu.");
  }
}

export async function importSeedData(data) {
  validateSeedData(data);

  return transaction(async (client) => {
    for (const rule of data.rules) {
      const existing = await client.query("SELECT id FROM rules WHERE internal_id = $1", [rule.internal_id]);
      const ruleId = existing.rows[0]?.id || (await client.query(
        `INSERT INTO rules (internal_id, title, level_cecrl, category, short_explanation, detailed_explanation)
         VALUES ($1,$2,$3,$4,$5,$6) RETURNING id`,
        [rule.internal_id, rule.title, rule.level_cecrl, rule.category, rule.short_explanation, rule.detailed_explanation]
      )).rows[0].id;

      for (const ex of rule.examples || []) {
        await client.query("INSERT INTO rule_examples (rule_id, example) VALUES ($1,$2)", [ruleId, ex]);
      }
      for (const m of rule.mistakes || []) {
        await client.query("INSERT INTO rule_mistakes (rule_id, mistake) VALUES ($1,$2)", [ruleId, m]);
      }
    }

    for (const exercise of data.exercises) {
      const parent = await client.query("SELECT id FROM rules WHERE internal_id = $1", [exercise.rule_internal_id]);
      if (!parent.rows[0]) throw new Error(`Règle introuvable pour ${exercise.internal_id}`);
      await client.query(
        `INSERT INTO exercises (internal_id, rule_id, title, type, instruction, question, options, correct_answer, explanation, difficulty, estimated_duration)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
         ON CONFLICT (internal_id) DO NOTHING`,
        [exercise.internal_id, parent.rows[0].id, exercise.title, exercise.type, exercise.instruction, exercise.question, JSON.stringify(exercise.options || []), exercise.correct_answer, exercise.explanation, exercise.difficulty, exercise.estimated_duration]
      );
    }

    return { rules: data.rules.length, exercises: data.exercises.length };
  });
}
