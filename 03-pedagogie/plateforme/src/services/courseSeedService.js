import fs from 'fs/promises';
import { transaction } from '../db/connection.js';

const LEVELS = new Set(['A1', 'A2', 'B1', 'B2', 'C1']);
const SECTION_TYPES = new Set(['lesson', 'examples_table', 'warning', 'common_mistakes', 'comparison_table', 'story', 'analogy']);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function requireString(value, path) {
  assert(typeof value === 'string' && value.trim(), `${path} doit être une chaîne non vide.`);
}

function requirePositiveInteger(value, path) {
  assert(Number.isInteger(value) && value > 0, `${path} doit être un entier positif.`);
}

function validateTable(section, path) {
  assert(Array.isArray(section.columns) && section.columns.length > 0, `${path}.columns doit contenir au moins une colonne.`);
  section.columns.forEach((column, index) => requireString(column, `${path}.columns[${index}]`));
  assert(Array.isArray(section.rows) && section.rows.length > 0, `${path}.rows doit contenir au moins une ligne.`);
  section.rows.forEach((row, index) => {
    assert(Array.isArray(row) && row.length === section.columns.length, `${path}.rows[${index}] doit contenir ${section.columns.length} cellules.`);
    row.forEach((cell, cellIndex) => requireString(cell, `${path}.rows[${index}][${cellIndex}]`));
  });
}

function validateSection(section, path) {
  assert(section && typeof section === 'object', `${path} doit être un objet.`);
  assert(SECTION_TYPES.has(section.type), `${path}.type n'est pas pris en charge.`);
  requireString(section.title, `${path}.title`);
  requirePositiveInteger(section.order_index, `${path}.order_index`);

  if (section.type === 'lesson' || section.type === 'warning') {
    assert(Array.isArray(section.content) && section.content.length > 0, `${path}.content doit contenir au moins un paragraphe.`);
    section.content.forEach((paragraph, index) => requireString(paragraph, `${path}.content[${index}]`));
  }
  if (section.type === 'examples_table' || section.type === 'comparison_table') validateTable(section, path);
  if (section.type === 'common_mistakes') {
    assert(Array.isArray(section.items) && section.items.length > 0, `${path}.items doit contenir au moins une erreur fréquente.`);
    section.items.forEach((item, index) => {
      requireString(item.audience, `${path}.items[${index}].audience`);
      requireString(item.written_form, `${path}.items[${index}].written_form`);
      requireString(item.correct_pronunciation, `${path}.items[${index}].correct_pronunciation`);
      requireString(item.common_mistake, `${path}.items[${index}].common_mistake`);
    });
  }
  if (section.type === 'story') {
    requireString(section.scenario, `${path}.scenario`);
    assert(Array.isArray(section.characters) && section.characters.length > 0, `${path}.characters doit contenir au moins un personnage.`);
    section.characters.forEach((c, i) => {
      requireString(c.name,  `${path}.characters[${i}].name`);
      requireString(c.says,  `${path}.characters[${i}].says`);
      requireString(c.label, `${path}.characters[${i}].label`);
    });
  }
  if (section.type === 'analogy') {
    requireString(section.metaphor, `${path}.metaphor`);
  }
}

export async function loadCourseSeedFile(path = '05-donnees/seeds/seed-courses.json') {
  return JSON.parse(await fs.readFile(path, 'utf-8'));
}

export function validateCourseSeedData(data) {
  assert(data && Array.isArray(data.modules) && data.modules.length > 0, 'Format invalide : { modules: [] } attendu.');
  const ids = new Set();
  const registerId = (id, path) => {
    requireString(id, path);
    assert(!ids.has(id), `${path} contient un identifiant dupliqué : ${id}.`);
    ids.add(id);
  };

  data.modules.forEach((module, moduleIndex) => {
    const modulePath = `modules[${moduleIndex}]`;
    registerId(module.internal_id, `${modulePath}.internal_id`);
    requireString(module.title, `${modulePath}.title`);
    requireString(module.description, `${modulePath}.description`);
    requirePositiveInteger(module.order_index, `${modulePath}.order_index`);
    assert(Array.isArray(module.rules) && module.rules.length > 0, `${modulePath}.rules doit contenir au moins une règle.`);

    module.rules.forEach((rule, ruleIndex) => {
      const rulePath = `${modulePath}.rules[${ruleIndex}]`;
      registerId(rule.internal_id, `${rulePath}.internal_id`);
      assert(LEVELS.has(rule.level), `${rulePath}.level doit être un niveau CECRL pris en charge.`);
      requireString(rule.title, `${rulePath}.title`);
      requireString(rule.category, `${rulePath}.category`);
      requireString(rule.learning_objective, `${rulePath}.learning_objective`);
      requireString(rule.short_description, `${rulePath}.short_description`);
      requirePositiveInteger(rule.order_index, `${rulePath}.order_index`);
      assert(Array.isArray(rule.sections) && rule.sections.length > 0, `${rulePath}.sections doit contenir au moins une section.`);
      rule.sections.forEach((section, sectionIndex) => validateSection(section, `${rulePath}.sections[${sectionIndex}]`));
      assert(Array.isArray(rule.exercises) && rule.exercises.length > 0, `${rulePath}.exercises doit contenir au moins un exercice.`);

      rule.exercises.forEach((exercise, exerciseIndex) => {
        const exercisePath = `${rulePath}.exercises[${exerciseIndex}]`;
        registerId(exercise.internal_id, `${exercisePath}.internal_id`);
        requireString(exercise.title, `${exercisePath}.title`);
        requireString(exercise.type, `${exercisePath}.type`);
        requireString(exercise.instructions, `${exercisePath}.instructions`);
        requirePositiveInteger(exercise.order_index, `${exercisePath}.order_index`);
        assert(Array.isArray(exercise.questions) && exercise.questions.length > 0, `${exercisePath}.questions doit contenir au moins une question.`);
        exercise.questions.forEach((question, index) => requireString(question, `${exercisePath}.questions[${index}]`));
      });
    });
  });
}

export async function importCourseSeedData(data) {
  validateCourseSeedData(data);
  return transaction(async (client) => {
    let rules = 0;
    let sections = 0;
    let exercises = 0;
    let questions = 0;

    for (const module of data.modules) {
      const moduleResult = await client.query(`
        INSERT INTO grammar_modules (internal_id, title, description, order_index)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (internal_id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description,
          order_index = EXCLUDED.order_index, is_active = TRUE, updated_at = NOW()
        RETURNING id`, [module.internal_id, module.title, module.description, module.order_index]);
      const moduleId = moduleResult.rows[0].id;

      for (const rule of module.rules) {
        const existingRule = await client.query(
          'SELECT id FROM grammar_rules WHERE internal_id = $1 OR (title = $2 AND level = $3) LIMIT 1',
          [rule.internal_id, rule.title, rule.level]
        );
        const ruleValues = [rule.internal_id, moduleId, rule.title, rule.level, rule.category, rule.learning_objective, rule.short_description, rule.order_index];
        const ruleResult = existingRule.rowCount
          ? await client.query(`
              UPDATE grammar_rules SET internal_id = $1, module_id = $2, title = $3, level = $4, category = $5,
                learning_objective = $6, short_description = $7, order_index = $8, is_active = TRUE, updated_at = NOW()
              WHERE id = $9 RETURNING id`, [...ruleValues, existingRule.rows[0].id])
          : await client.query(`
              INSERT INTO grammar_rules (internal_id, module_id, title, level, category, learning_objective, short_description, order_index)
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`, ruleValues);
        const ruleId = ruleResult.rows[0].id;
        rules += 1;
        await client.query('DELETE FROM grammar_sections WHERE rule_id = $1', [ruleId]);
        await client.query('DELETE FROM grammar_exercises WHERE rule_id = $1', [ruleId]);

        for (const section of rule.sections) {
          const { type, title, order_index, ...content } = section;
          await client.query('INSERT INTO grammar_sections (rule_id, section_type, title, content, section_order) VALUES ($1, $2, $3, $4, $5)', [ruleId, type, title, content, order_index]);
          sections += 1;
        }
        for (const exercise of rule.exercises) {
          const exerciseResult = await client.query(`
            INSERT INTO grammar_exercises (internal_id, rule_id, title, exercise_type, instructions, exercise_order)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`, [exercise.internal_id, ruleId, exercise.title, exercise.type, exercise.instructions, exercise.order_index]);
          exercises += 1;
          for (const [index, question] of exercise.questions.entries()) {
            await client.query('INSERT INTO grammar_exercise_questions (exercise_id, question_text, question_order) VALUES ($1, $2, $3)', [exerciseResult.rows[0].id, question, index + 1]);
            questions += 1;
          }
        }
      }
    }
    return { modules: data.modules.length, rules, sections, exercises, questions };
  });
}
