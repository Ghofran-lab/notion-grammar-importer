import googleSheetsService from "../services/googleSheetsService.js";

export const TABLES = {
  grammar_rules: ["id", "title", "level", "category", "learning_objective", "short_description", "detailed_description", "order_index", "is_active"],
  grammar_lessons: ["id", "rule_id", "title", "content", "lesson_order", "is_active"],
  exercises: ["id", "lesson_id", "title", "exercise_type", "instructions", "difficulty_level", "exercise_order", "is_active"],
  exercise_questions: ["id", "exercise_id", "question_text", "question_order", "is_active"],
};

function toBoolean(value) {
  return value === true || String(value).toLowerCase() === "true";
}

function toNumber(value) {
  const number = Number(value);
  return Number.isNaN(number) ? value : number;
}

function normalizeRow(tableName, row) {
  const normalized = { ...row };
  if ("is_active" in normalized) normalized.is_active = toBoolean(normalized.is_active);
  for (const field of ["order_index", "lesson_order", "exercise_order", "question_order"]) {
    if (field in normalized) normalized[field] = toNumber(normalized[field]);
  }
  return normalized;
}

function recordToRow(headers, record) {
  return headers.map((header) => record[header] ?? "");
}

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function seedRuleId(rule) {
  return `${rule.level}-${String(rule.order_index).padStart(2, "0")}-${slugify(rule.title)}`;
}

export class GrammarRepository {
  constructor(service = googleSheetsService) {
    this.service = service;
  }

  async initialize() {
    return this.service.ensureSheets(TABLES);
  }

  async getTable(tableName) {
    const headers = TABLES[tableName];
    if (!headers) throw new Error(`Onglet inconnu: ${tableName}`);
    const rows = await this.service.readRows(tableName);
    if (rows.length === 0) return [];
    if (rows[0].join("|") !== headers.join("|")) {
      throw new Error(`En-têtes invalides dans l'onglet ${tableName}. Exécutez npm run sheets:init.`);
    }
    return rows.slice(1).filter((row) => row.some((cell) => cell !== "")).map((row) =>
      normalizeRow(tableName, Object.fromEntries(headers.map((header, index) => [header, row[index] ?? ""])))
    );
  }

  async replaceTable(tableName, records) {
    const headers = TABLES[tableName];
    await this.service.writeRows(tableName, [headers, ...records.map((record) => recordToRow(headers, record))]);
  }

  async importRules(seedRules) {
    await this.initialize();
    const existing = await this.getTable("grammar_rules");
    const byId = new Map(existing.map((rule) => [rule.id, rule]));

    for (const seedRule of seedRules) {
      const id = seedRule.id || seedRuleId(seedRule);
      byId.set(id, { ...byId.get(id), ...seedRule, id, is_active: true });
    }

    const rules = [...byId.values()].sort((left, right) =>
      String(left.level).localeCompare(String(right.level)) || Number(left.order_index) - Number(right.order_index)
    );
    await this.replaceTable("grammar_rules", rules);
    return { imported: seedRules.length, total: rules.length };
  }

  async getLevels() {
    const rules = await this.getTable("grammar_rules");
    return [...new Set(rules.filter((rule) => rule.is_active).map((rule) => rule.level))].sort();
  }

  async getRules(level) {
    const rules = await this.getTable("grammar_rules");
    return rules
      .filter((rule) => rule.is_active && (!level || rule.level === level))
      .sort((left, right) => String(left.level).localeCompare(String(right.level)) || left.order_index - right.order_index)
      .map(({ id, title, level: ruleLevel, category, short_description, order_index }) => ({ id, title, level: ruleLevel, category, short_description, order_index }));
  }

  async getRuleDetail(ruleId) {
    const [rules, lessons, exercises, questions] = await Promise.all([
      this.getTable("grammar_rules"), this.getTable("grammar_lessons"), this.getTable("exercises"), this.getTable("exercise_questions"),
    ]);
    const rule = rules.find((item) => item.id === ruleId && item.is_active);
    if (!rule) return null;

    const ruleLessons = lessons.filter((lesson) => lesson.rule_id === ruleId && lesson.is_active).sort((a, b) => a.lesson_order - b.lesson_order);
    for (const lesson of ruleLessons) {
      lesson.exercises = exercises
        .filter((exercise) => exercise.lesson_id === lesson.id && exercise.is_active)
        .sort((a, b) => a.exercise_order - b.exercise_order);
      for (const exercise of lesson.exercises) {
        exercise.questions = questions
          .filter((question) => question.exercise_id === exercise.id && question.is_active)
          .sort((a, b) => a.question_order - b.question_order);
      }
    }
    return { rule, lessons: ruleLessons };
  }

  async getStatistics() {
    const [rules, lessons, exercises, questions] = await Promise.all(Object.keys(TABLES).map((table) => this.getTable(table)));
    return {
      rules: rules.filter((item) => item.is_active).length,
      lessons: lessons.filter((item) => item.is_active).length,
      exercises: exercises.filter((item) => item.is_active).length,
      questions: questions.filter((item) => item.is_active).length,
    };
  }
}

export default new GrammarRepository();
