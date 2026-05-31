import assert from "node:assert/strict";
import test from "node:test";
import { GrammarRepository, TABLES, seedRuleId } from "../src/repositories/grammarRepository.js";

class MemorySheetsService {
  constructor(tables = {}) { this.tables = structuredClone(tables); }
  async ensureSheets(definitions) {
    const created = [];
    for (const [name, headers] of Object.entries(definitions)) {
      if (!this.tables[name]) { this.tables[name] = [headers]; created.push(name); }
    }
    return { created, available: Object.keys(definitions) };
  }
  async readRows(name) { return structuredClone(this.tables[name] || []); }
  async writeRows(name, rows) { this.tables[name] = structuredClone(rows); }
}

const emptyTables = () => Object.fromEntries(Object.entries(TABLES).map(([name, headers]) => [name, [headers]]));

test("initialize creates the four required tabs", async () => {
  const service = new MemorySheetsService();
  const result = await new GrammarRepository(service).initialize();
  assert.deepEqual(result.created, Object.keys(TABLES));
});

test("importRules is idempotent and keeps manually added rules", async () => {
  const service = new MemorySheetsService(emptyTables());
  const repository = new GrammarRepository(service);
  const seed = { level: "A1", title: "Les articles", category: "Articles", learning_objective: "Comprendre", short_description: "Description", order_index: 1 };
  await repository.replaceTable("grammar_rules", [{ ...seed, id: "manual", title: "Règle manuelle", order_index: 2, is_active: true }]);
  await repository.importRules([seed]);
  await repository.importRules([{ ...seed, short_description: "Mise à jour" }]);
  const rules = await repository.getTable("grammar_rules");
  assert.equal(rules.length, 2);
  assert.equal(rules.find((rule) => rule.id === seedRuleId(seed)).short_description, "Mise à jour");
});

test("getRuleDetail returns nested active lessons, exercises and questions", async () => {
  const service = new MemorySheetsService(emptyTables());
  const repository = new GrammarRepository(service);
  await repository.replaceTable("grammar_rules", [{ id: "rule-1", title: "Règle", level: "A1", is_active: true }]);
  await repository.replaceTable("grammar_lessons", [{ id: "lesson-1", rule_id: "rule-1", title: "Leçon", lesson_order: 1, is_active: true }]);
  await repository.replaceTable("exercises", [{ id: "exercise-1", lesson_id: "lesson-1", title: "Exercice", exercise_order: 1, is_active: true }]);
  await repository.replaceTable("exercise_questions", [{ id: "question-1", exercise_id: "exercise-1", question_text: "Question", question_order: 1, is_active: true }]);
  const detail = await repository.getRuleDetail("rule-1");
  assert.equal(detail.lessons[0].exercises[0].questions[0].question_text, "Question");
});
