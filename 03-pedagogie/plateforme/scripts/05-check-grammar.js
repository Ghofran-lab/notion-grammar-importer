#!/usr/bin/env node

/**
 * Script de vérification des données de grammaire
 * Affiche les règles par niveau et des statistiques
 */

import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'grammar_app',
});

/**
 * Affiche les règles par niveau
 */
async function checkGrammarData() {
  const client = await pool.connect();

  try {
    console.log('\n📚 === VÉRIFICATION DES DONNÉES DE GRAMMAIRE ===\n');

    // 1. Vérifier les tables
    const tablesQuery = `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND (table_name LIKE 'grammar_%' OR table_name LIKE 'exercise%')
      ORDER BY table_name;
    `;

    const tablesResult = await client.query(tablesQuery);
    
    console.log('📋 Tables disponibles:');
    if (tablesResult.rows.length > 0) {
      tablesResult.rows.forEach(row => {
        console.log(`   ✓ ${row.table_name}`);
      });
    } else {
      console.log('   ⚠️  Aucune table trouvée. Exécutez d\'abord: npm run db:init:grammar');
    }

    console.log('');

    // 2. Compter les règles par niveau
    const rulesCountQuery = `
      SELECT level, COUNT(*) as count, COUNT(*) FILTER (WHERE is_active) as active
      FROM grammar_rules
      GROUP BY level
      ORDER BY level;
    `;

    const rulesResult = await client.query(rulesCountQuery);

    console.log('📊 Résumé par niveau:');
    console.log('─'.repeat(50));
    
    if (rulesResult.rows.length > 0) {
      let totalRules = 0;
      let totalActive = 0;

      rulesResult.rows.forEach(row => {
        console.log(`   ${row.level}: ${row.count} règles (${row.active} actives)`);
        totalRules += row.count;
        totalActive += row.active;
      });

      console.log('─'.repeat(50));
      console.log(`   TOTAL: ${totalRules} règles (${totalActive} actives)\n`);
    } else {
      console.log('   ⚠️  Aucune règle trouvée. Exécutez d\'abord: npm run seed:grammar\n');
    }

    // 3. Afficher les catégories
    const categoriesQuery = `
      SELECT category, COUNT(*) as count
      FROM grammar_rules
      WHERE is_active = TRUE
      GROUP BY category
      ORDER BY count DESC;
    `;

    const categoriesResult = await client.query(categoriesQuery);

    console.log('🏷️  Catégories:');
    console.log('─'.repeat(50));
    if (categoriesResult.rows.length > 0) {
      categoriesResult.rows.forEach(row => {
        console.log(`   ${row.category}: ${row.count} règles`);
      });
    }
    console.log('');

    // 4. Afficher les règles par niveau (extrait)
    console.log('\n📖 Aperçu des règles par niveau:\n');

    for (const level of ['A1', 'A2', 'B1', 'B2', 'C1']) {
      const levelQuery = `
        SELECT id, title, category
        FROM grammar_rules
        WHERE level = $1 AND is_active = TRUE
        ORDER BY order_index;
      `;

      const levelResult = await client.query(levelQuery, [level]);

      if (levelResult.rows.length > 0) {
        console.log(`${level} (${levelResult.rows.length} règles)`);
        console.log('─'.repeat(50));
        levelResult.rows.forEach(row => {
          console.log(`   • ${row.title}`);
          console.log(`     └─ ${row.category}`);
        });
        console.log('');
      }
    }

    // 5. Afficher les statistiques de leçons et exercices
    const statsQuery = `
      SELECT 
        (SELECT COUNT(*) FROM grammar_rules WHERE is_active) as rules_count,
        (SELECT COUNT(*) FROM grammar_lessons WHERE is_active) as lessons_count,
        (SELECT COUNT(*) FROM exercises WHERE is_active) as exercises_count,
        (SELECT COUNT(*) FROM exercise_questions WHERE is_active) as questions_count;
    `;

    const statsResult = await client.query(statsQuery);
    const stats = statsResult.rows[0];

    console.log('\n📈 Statistiques globales:');
    console.log('─'.repeat(50));
    console.log(`   Règles: ${stats.rules_count}`);
    console.log(`   Leçons: ${stats.lessons_count}`);
    console.log(`   Exercices: ${stats.exercises_count}`);
    console.log(`   Questions: ${stats.questions_count}`);
    console.log('');

  } catch (error) {
    console.error('❌ Erreur lors de la vérification:', error);
    throw error;
  } finally {
    await client.end();
  }
}

// Exécution
checkGrammarData()
  .then(() => {
    console.log('✅ Vérification complétée!\n');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n❌ La vérification a échoué:\n', error);
    process.exit(1);
  });
