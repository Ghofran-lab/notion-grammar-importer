import { query } from "../connection.js";

export async function createRule(rule) {
  const result = await query(
    `INSERT INTO rules (internal_id, title, level_cecrl, category, short_explanation, detailed_explanation)
     VALUES ($1,$2,$3,$4,$5,$6)
     RETURNING *`,
    [
      rule.internal_id,
      rule.title,
      rule.level_cecrl,
      rule.category,
      rule.short_explanation,
      rule.detailed_explanation,
    ]
  );
  return result.rows[0];
}

export async function getRuleByInternalId(internalId) {
  const result = await query("SELECT * FROM rules WHERE internal_id = $1", [internalId]);
  return result.rows[0];
}

export async function addRuleExample(ruleId, example) {
  await query("INSERT INTO rule_examples (rule_id, example) VALUES ($1, $2)", [ruleId, example]);
}

export async function addRuleMistake(ruleId, mistake) {
  await query("INSERT INTO rule_mistakes (rule_id, mistake) VALUES ($1, $2)", [ruleId, mistake]);
}
