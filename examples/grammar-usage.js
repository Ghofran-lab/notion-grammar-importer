/**
 * Exemple d'utilisation du module GRAMMAIRE
 * 
 * Cet exemple montre comment :
 * - Connexion à la base de données
 * - Récupérer les règles par niveau
 * - Naviguer dans la hiérarchie (règle -> leçon -> exercice -> question)
 * - Créer de nouvelles entités
 */

import { Pool } from 'pg';
import {
  getGrammarRulesByLevel,
  getLessonsByRule,
  getExercisesByLesson,
  getQuestionsByExercise,
  getGrammarStatistics,
  getLearningPathByLevel,
  createGrammarRule,
  createLesson,
  createExercise,
  createQuestion
} from './src/db/queries/grammar.js';

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'grammar_app',
});

/**
 * Exemple 1: Afficher toutes les règles d'un niveau
 */
async function example1_displayRulesByLevel() {
  console.log('\n📖 === EXEMPLE 1: Règles par niveau ===\n');

  const client = await pool.connect();
  try {
    const result = await getGrammarRulesByLevel(client, 'A1');
    const rules = result.rows;

    console.log(`Niveau A1 (${rules.length} règles):`);
    rules.forEach(rule => {
      console.log(`  • ${rule.title}`);
      console.log(`    └─ ${rule.short_description}`);
      console.log(`    └─ Catégorie: ${rule.category}\n`);
    });
  } finally {
    client.release();
  }
}

/**
 * Exemple 2: Naviguer dans la hiérarchie complète
 */
async function example2_fullHierarchy() {
  console.log('\n📚 === EXEMPLE 2: Hiérarchie complète ===\n');

  const client = await pool.connect();
  try {
    // Récupérer une règle A1
    const rulesResult = await getGrammarRulesByLevel(client, 'A1');
    if (rulesResult.rows.length === 0) {
      console.log('Aucune règle A1 trouvée.');
      return;
    }

    const rule = rulesResult.rows[0];
    console.log(`Règle: ${rule.title}`);
    console.log(`Objectif: ${rule.learning_objective}\n`);

    // Récupérer les leçons
    const lessonsResult = await getLessonsByRule(client, rule.id);
    const lessons = lessonsResult.rows;

    if (lessons.length === 0) {
      console.log('  ⚠️ Aucune leçon créée pour cette règle.');
      console.log('  (Les leçons peuvent être ajoutées ultérieurement)\n');
      return;
    }

    console.log(`  📖 Leçons (${lessons.length}):`);

    for (const lesson of lessons) {
      console.log(`    • ${lesson.title}`);

      // Récupérer les exercices
      const exercisesResult = await getExercisesByLesson(client, lesson.id);
      const exercises = exercisesResult.rows;

      if (exercises.length === 0) {
        console.log(`      └─ Aucun exercice`);
      } else {
        console.log(`      └─ Exercices (${exercises.length}):`);

        for (const exercise of exercises) {
          console.log(`         • ${exercise.title} (${exercise.exercise_type})`);

          // Récupérer les questions
          const questionsResult = await getQuestionsByExercise(client, exercise.id);
          const questions = questionsResult.rows;

          if (questions.length > 0) {
            console.log(`            └─ ${questions.length} questions`);
          }
        }
      }
    }
  } finally {
    client.release();
  }
}

/**
 * Exemple 3: Afficher les statistiques
 */
async function example3_statistics() {
  console.log('\n📊 === EXEMPLE 3: Statistiques ===\n');

  const client = await pool.connect();
  try {
    const result = await getGrammarStatistics(client);
    const stats = result.rows[0];

    console.log('Contenu du module GRAMMAIRE:');
    console.log(`  • ${stats.active_rules} règles`);
    console.log(`  • ${stats.active_lessons} leçons`);
    console.log(`  • ${stats.active_exercises} exercices`);
    console.log(`  • ${stats.active_questions} questions`);
  } finally {
    client.release();
  }
}

/**
 * Exemple 4: Créer une nouvelle règle avec leçons
 */
async function example4_createRuleWithLesson() {
  console.log('\n✨ === EXEMPLE 4: Créer une nouvelle règle ===\n');

  const client = await pool.connect();
  try {
    // Créer une règle
    const ruleResult = await createGrammarRule(client, {
      title: 'Les adverbes de manière',
      level: 'A2',
      category: 'Adverbes',
      learning_objective: 'Utiliser les adverbes pour modifier le verbe',
      short_description: 'Les adverbes en -ment et autres adverbes courants',
      order_index: 99
    });

    const rule = ruleResult.rows[0];
    console.log(`✓ Règle créée: ${rule.title} (ID: ${rule.id})`);

    // Créer une leçon
    const lessonResult = await createLesson(client, rule.id, {
      title: 'Formation des adverbes en -ment',
      content: 'Les adverbes se forment généralement en ajoutant -ment au féminin de l\'adjectif.',
      lesson_order: 1
    });

    const lesson = lessonResult.rows[0];
    console.log(`✓ Leçon créée: ${lesson.title} (ID: ${lesson.id})`);

    // Créer un exercice
    const exerciseResult = await createExercise(client, lesson.id, {
      title: 'Transformer les adjectifs en adverbes',
      exercise_type: 'fill_blank',
      instructions: 'Complétez les phrases avec l\'adverbe correspondant.',
      exercise_order: 1
    });

    const exercise = exerciseResult.rows[0];
    console.log(`✓ Exercice créé: ${exercise.title} (ID: ${exercise.id})`);

    // Créer une question
    const questionResult = await createQuestion(client, exercise.id, {
      question_text: 'Il parle _____ (rapide)',
      question_order: 1
    });

    const question = questionResult.rows[0];
    console.log(`✓ Question créée (ID: ${question.id})`);

    console.log('\n✅ Structure complète créée avec succès!');
  } finally {
    client.release();
  }
}

/**
 * Exemple 5: Afficher le parcours d'apprentissage pour un niveau
 */
async function example5_learningPath() {
  console.log('\n🎯 === EXEMPLE 5: Parcours d\'apprentissage ===\n');

  const client = await pool.connect();
  try {
    const result = await getLearningPathByLevel(client, 'A1');
    const path = result.rows;

    if (path.length === 0) {
      console.log('Aucun parcours disponible pour le niveau A1.');
      return;
    }

    console.log(`Parcours A1 (${path.length} règles):\n`);

    path.forEach(rule => {
      console.log(`${rule.order_index}. ${rule.rule_title}`);
      console.log(`   Catégorie: ${rule.category}`);
      console.log(`   Objectif: ${rule.learning_objective}`);
      console.log(`   Leçons: ${rule.lesson_count}, Exercices: ${rule.exercise_count}\n`);
    });
  } finally {
    client.release();
  }
}

/**
 * Exécute tous les exemples
 */
async function runExamples() {
  console.log('╔════════════════════════════════════════════╗');
  console.log('║   EXEMPLES D\'UTILISATION - Module GRAMMAIRE║');
  console.log('╚════════════════════════════════════════════╝');

  try {
    // Exemples en lecture seule
    await example1_displayRulesByLevel();
    await example3_statistics();
    await example5_learningPath();
    await example2_fullHierarchy();

    // Exemple avec création (décommentez pour exécuter)
    // await example4_createRuleWithLesson();

    console.log('\n✅ Tous les exemples complétés!\n');
  } catch (error) {
    console.error('❌ Erreur lors de l\'exécution des exemples:', error);
  } finally {
    await pool.end();
  }
}

// Exécution
runExamples();
