/**
 * Module de requêtes pour le module GRAMMAIRE
 * Contient les requêtes SQL réutilisables pour interroger les règles de grammaire
 */

/**
 * Récupère toutes les règles de grammaire
 */
export async function getAllGrammarRules(client) {
  return client.query(`
    SELECT id, title, level, category, learning_objective, 
           short_description, order_index, is_active
    FROM grammar_rules
    WHERE is_active = TRUE
    ORDER BY level, order_index;
  `);
}

/**
 * Récupère les règles par niveau
 */
export async function getGrammarRulesByLevel(client, level) {
  return client.query(`
    SELECT id, title, level, category, learning_objective, 
           short_description, order_index, is_active
    FROM grammar_rules
    WHERE level = $1 AND is_active = TRUE
    ORDER BY order_index;
  `, [level]);
}

/**
 * Récupère une règle spécifique par ID
 */
export async function getGrammarRuleById(client, ruleId) {
  return client.query(`
    SELECT id, title, level, category, learning_objective, 
           short_description, detailed_description, order_index, is_active,
           created_at, updated_at
    FROM grammar_rules
    WHERE id = $1 AND is_active = TRUE;
  `, [ruleId]);
}

/**
 * Récupère les leçons pour une règle
 */
export async function getLessonsByRule(client, ruleId) {
  return client.query(`
    SELECT id, rule_id, title, content, lesson_order, is_active,
           created_at, updated_at
    FROM grammar_lessons
    WHERE rule_id = $1 AND is_active = TRUE
    ORDER BY lesson_order;
  `, [ruleId]);
}

/**
 * Récupère les exercices pour une leçon
 */
export async function getExercisesByLesson(client, lessonId) {
  return client.query(`
    SELECT id, lesson_id, title, exercise_type, instructions, 
           difficulty_level, exercise_order, is_active,
           created_at, updated_at
    FROM exercises
    WHERE lesson_id = $1 AND is_active = TRUE
    ORDER BY exercise_order;
  `, [lessonId]);
}

/**
 * Récupère les questions pour un exercice
 */
export async function getQuestionsByExercise(client, exerciseId) {
  return client.query(`
    SELECT id, exercise_id, question_text, question_order, is_active,
           created_at, updated_at
    FROM exercise_questions
    WHERE exercise_id = $1 AND is_active = TRUE
    ORDER BY question_order;
  `, [exerciseId]);
}

/**
 * Récupère les statistiques de grammaire
 */
export async function getGrammarStatistics(client) {
  return client.query(`
    SELECT 
      COUNT(DISTINCT CASE WHEN gr.is_active THEN gr.id END) as active_rules,
      COUNT(DISTINCT CASE WHEN gl.is_active THEN gl.id END) as active_lessons,
      COUNT(DISTINCT CASE WHEN ex.is_active THEN ex.id END) as active_exercises,
      COUNT(DISTINCT CASE WHEN eq.is_active THEN eq.id END) as active_questions
    FROM grammar_rules gr
    LEFT JOIN grammar_lessons gl ON gr.id = gl.rule_id
    LEFT JOIN exercises ex ON gl.id = ex.lesson_id
    LEFT JOIN exercise_questions eq ON ex.id = eq.exercise_id;
  `);
}

/**
 * Récupère le parcours complet pour un niveau
 */
export async function getLearningPathByLevel(client, level) {
  return client.query(`
    SELECT 
      gr.id as rule_id,
      gr.title as rule_title,
      gr.category,
      gr.learning_objective,
      gr.level,
      gr.order_index,
      COUNT(DISTINCT gl.id) as lesson_count,
      COUNT(DISTINCT ex.id) as exercise_count
    FROM grammar_rules gr
    LEFT JOIN grammar_lessons gl ON gr.id = gl.rule_id AND gl.is_active = TRUE
    LEFT JOIN exercises ex ON gl.id = ex.lesson_id AND ex.is_active = TRUE
    WHERE gr.level = $1 AND gr.is_active = TRUE
    GROUP BY gr.id, gr.title, gr.category, gr.learning_objective, gr.level, gr.order_index
    ORDER BY gr.order_index;
  `, [level]);
}

/**
 * Insère une nouvelle règle de grammaire
 */
export async function createGrammarRule(client, ruleData) {
  const { title, level, category, learning_objective, short_description, detailed_description, order_index } = ruleData;

  return client.query(`
    INSERT INTO grammar_rules (
      title, level, category, learning_objective, 
      short_description, detailed_description, order_index, is_active
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, TRUE)
    RETURNING id, title, level, category, learning_objective;
  `, [title, level, category, learning_objective, short_description, detailed_description || null, order_index]);
}

/**
 * Met à jour une règle de grammaire
 */
export async function updateGrammarRule(client, ruleId, ruleData) {
  const fields = [];
  const values = [];
  let paramIndex = 1;

  for (const [key, value] of Object.entries(ruleData)) {
    if (value !== undefined) {
      fields.push(`${key} = $${paramIndex}`);
      values.push(value);
      paramIndex++;
    }
  }

  fields.push(`updated_at = NOW()`);
  values.push(ruleId);

  const query = `
    UPDATE grammar_rules
    SET ${fields.join(', ')}
    WHERE id = $${paramIndex}
    RETURNING id, title, level, category, learning_objective;
  `;

  return client.query(query, values);
}

/**
 * Supprime (marque comme inactive) une règle de grammaire
 */
export async function deleteGrammarRule(client, ruleId) {
  return client.query(`
    UPDATE grammar_rules
    SET is_active = FALSE, updated_at = NOW()
    WHERE id = $1
    RETURNING id, title;
  `, [ruleId]);
}

/**
 * Crée une nouvelle leçon
 */
export async function createLesson(client, ruleId, lessonData) {
  const { title, content, lesson_order } = lessonData;

  return client.query(`
    INSERT INTO grammar_lessons (
      rule_id, title, content, lesson_order, is_active
    ) VALUES ($1, $2, $3, $4, TRUE)
    RETURNING id, rule_id, title;
  `, [ruleId, title, content, lesson_order]);
}

/**
 * Crée un nouvel exercice
 */
export async function createExercise(client, lessonId, exerciseData) {
  const { title, exercise_type, instructions, difficulty_level, exercise_order } = exerciseData;

  return client.query(`
    INSERT INTO exercises (
      lesson_id, title, exercise_type, instructions, 
      difficulty_level, exercise_order, is_active
    ) VALUES ($1, $2, $3, $4, $5, $6, TRUE)
    RETURNING id, lesson_id, title, exercise_type;
  `, [lessonId, title, exercise_type, instructions || null, difficulty_level || 'intermediate', exercise_order]);
}

/**
 * Crée une nouvelle question
 */
export async function createQuestion(client, exerciseId, questionData) {
  const { question_text, question_order } = questionData;

  return client.query(`
    INSERT INTO exercise_questions (
      exercise_id, question_text, question_order, is_active
    ) VALUES ($1, $2, $3, TRUE)
    RETURNING id, exercise_id, question_text;
  `, [exerciseId, question_text, question_order]);
}
