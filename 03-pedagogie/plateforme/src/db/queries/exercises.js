/**
 * Requêtes pour la table 'exercises' (Exercices)
 */

import { query } from "../connection.js";

/**
 * Crée un nouvel exercice
 */
export async function createExercise(exerciseData) {
  const {
    internal_id,
    rule_id,
    title,
    type,
    instruction,
    question,
    options,
    correct_answer,
    explanation,
    difficulty,
    estimated_duration,
  } = exerciseData;

  const result = await query(
    `INSERT INTO exercises 
      (internal_id, rule_id, title, type, instruction, question, options, 
       correct_answer, explanation, difficulty, estimated_duration)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
     RETURNING *`,
    [
      internal_id,
      rule_id,
      title,
      type,
      instruction,
      question,
      JSON.stringify(options),
      correct_answer,
      explanation,
      difficulty,
      estimated_duration,
    ]
  );

  return result.rows[0];
}

/**
 * Récupère un exercice par ID interne
 */
export async function getExerciseByInternalId(internal_id) {
  const result = await query(
    "SELECT * FROM exercises WHERE internal_id = $1",
    [internal_id]
  );
  return result.rows[0];
}

/**
 * Récupère un exercice par UUID
 */
export async function getExerciseById(id) {
  const result = await query("SELECT * FROM exercises WHERE id = $1", [id]);
  return result.rows[0];
}

/**
 * Récupère tous les exercices
 */
export async function getAllExercises() {
  const result = await query(
    "SELECT * FROM exercises ORDER BY difficulty, created_at"
  );
  return result.rows;
}

/**
 * Récupère les exercices pour une règle
 */
export async function getExercisesByRuleId(rule_id) {
  const result = await query(
    `SELECT * FROM exercises 
     WHERE rule_id = $1 
     ORDER BY type, difficulty`,
    [rule_id]
  );
  return result.rows;
}

/**
 * Récupère les exercices par type
 */
export async function getExercisesByType(type) {
  const result = await query(
    "SELECT * FROM exercises WHERE type = $1 ORDER BY difficulty, created_at",
    [type]
  );
  return result.rows;
}

/**
 * Récupère les exercices par difficulté
 */
export async function getExercisesByDifficulty(difficulty) {
  const result = await query(
    "SELECT * FROM exercises WHERE difficulty = $1 ORDER BY created_at",
    [difficulty]
  );
  return result.rows;
}

/**
 * Met à jour un exercice
 */
export async function updateExercise(id, updateData) {
  const {
    title,
    type,
    instruction,
    question,
    options,
    correct_answer,
    explanation,
    difficulty,
    estimated_duration,
  } = updateData;

  const result = await query(
    `UPDATE exercises 
     SET title = COALESCE($2, title),
         type = COALESCE($3, type),
         instruction = COALESCE($4, instruction),
         question = COALESCE($5, question),
         options = COALESCE($6, options),
         correct_answer = COALESCE($7, correct_answer),
         explanation = COALESCE($8, explanation),
         difficulty = COALESCE($9, difficulty),
         estimated_duration = COALESCE($10, estimated_duration),
         updated_at = NOW()
     WHERE id = $1
     RETURNING *`,
    [
      id,
      title,
      type,
      instruction,
      question,
      options ? JSON.stringify(options) : null,
      correct_answer,
      explanation,
      difficulty,
      estimated_duration,
    ]
  );

  return result.rows[0];
}

/**
 * Marque un exercice comme exporté vers Notion
 */
export async function markExerciseAsExported(id, notion_page_id) {
  const result = await query(
    `UPDATE exercises 
     SET exported_to_notion = true, 
         notion_page_id = $2,
         last_notion_sync = NOW()
     WHERE id = $1
     RETURNING *`,
    [id, notion_page_id]
  );

  return result.rows[0];
}

/**
 * Récupère les exercices non encore exportés vers Notion
 */
export async function getUnexportedExercises() {
  const result = await query(
    "SELECT * FROM exercises WHERE exported_to_notion = false ORDER BY difficulty, created_at"
  );
  return result.rows;
}

/**
 * Supprime un exercice
 */
export async function deleteExercise(id) {
  const result = await query(
    "DELETE FROM exercises WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
}

/**
 * Récupère les statistiques des exercices
 */
export async function getExercisesStatistics() {
  const result = await query(
    `SELECT 
       type,
       difficulty,
       COUNT(*) as total_exercises,
       COUNT(CASE WHEN exported_to_notion THEN 1 END) as exported_count
     FROM exercises
     GROUP BY type, difficulty
     ORDER BY type, difficulty`
  );
  return result.rows;
}

/**
 * Compte le nombre total d'exercices
 */
export async function countExercises() {
  const result = await query("SELECT COUNT(*) FROM exercises");
  return parseInt(result.rows[0].count, 10);
}

/**
 * Compte les exercices par règle
 */
export async function countExercisesByRule(rule_id) {
  const result = await query(
    "SELECT COUNT(*) FROM exercises WHERE rule_id = $1",
    [rule_id]
  );
  return parseInt(result.rows[0].count, 10);
}

/**
 * Récupère un exercice avec les détails de sa règle
 */
export async function getExerciseWithRule(id) {
  const result = await query(
    `SELECT 
       e.*,
       r.title as rule_title,
       r.level_cecrl,
       r.category
     FROM exercises e
     LEFT JOIN rules r ON e.rule_id = r.id
     WHERE e.id = $1`,
    [id]
  );
  return result.rows[0];
}

/**
 * Récupère tous les exercices avec les détails de leurs règles
 */
export async function getAllExercisesWithRules() {
  const result = await query(
    `SELECT 
       e.*,
       r.title as rule_title,
       r.level_cecrl,
       r.category
     FROM exercises e
     LEFT JOIN rules r ON e.rule_id = r.id
     ORDER BY r.level_cecrl, r.title, e.difficulty`
  );
  return result.rows;
}
