#!/usr/bin/env node

/**
 * Script de Seed pour les Règles de Grammaire
 * Insère les règles de grammaire de base par niveau CECRL
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuration de la base de données
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'grammar_app',
});

/**
 * Charge le fichier seed-grammar.json
 */
function loadGrammarData() {
  const seedPath = path.join(__dirname, '../seed-grammar.json');
  if (!fs.existsSync(seedPath)) {
    throw new Error(`Fichier seed-grammar.json non trouvé: ${seedPath}`);
  }
  return JSON.parse(fs.readFileSync(seedPath, 'utf-8'));
}

/**
 * Insère les règles de grammaire dans la base de données
 */
async function seedGrammarRules() {
  const client = await pool.connect();

  try {
    console.log('📚 Début du seed des règles de grammaire...\n');

    const data = loadGrammarData();
    const rules = data.grammar_rules;

    // Compter les règles par niveau
    const rulesByLevel = {};
    rules.forEach(rule => {
      if (!rulesByLevel[rule.level]) {
        rulesByLevel[rule.level] = [];
      }
      rulesByLevel[rule.level].push(rule);
    });

    let totalInserted = 0;

    // Insérer les règles par niveau
    for (const level of ['A1', 'A2', 'B1', 'B2', 'C1']) {
      const levelRules = rulesByLevel[level] || [];
      
      if (levelRules.length === 0) {
        continue;
      }

      console.log(`\n📖 Niveau ${level} (${levelRules.length} règles)`);
      console.log('─'.repeat(60));

      for (const rule of levelRules) {
        const query = `
          INSERT INTO grammar_rules (
            title, level, category, learning_objective, 
            short_description, order_index, is_active
          ) VALUES ($1, $2, $3, $4, $5, $6, $7)
          ON CONFLICT (title, level) DO UPDATE SET
            category = $3,
            learning_objective = $4,
            short_description = $5,
            order_index = $6,
            updated_at = NOW()
          RETURNING id, title;
        `;

        const values = [
          rule.title,
          rule.level,
          rule.category,
          rule.learning_objective,
          rule.short_description,
          rule.order_index,
          true, // is_active
        ];

        try {
          const result = await client.query(query, values);
          const ruleId = result.rows[0].id;
          console.log(`  ✓ ${rule.title}`);
          totalInserted++;
        } catch (error) {
          console.error(`  ✗ Erreur pour "${rule.title}": ${error.message}`);
        }
      }
    }

    console.log('\n' + '─'.repeat(60));
    console.log(`\n✅ Seed complété: ${totalInserted} règles de grammaire insérées/mises à jour\n`);

    // Afficher un résumé
    const summary = await client.query(`
      SELECT level, COUNT(*) as count FROM grammar_rules
      WHERE is_active = TRUE
      GROUP BY level
      ORDER BY level;
    `);

    console.log('📊 Résumé par niveau:');
    summary.rows.forEach(row => {
      console.log(`   ${row.level}: ${row.count} règles`);
    });

  } catch (error) {
    console.error('❌ Erreur lors du seed:', error);
    throw error;
  } finally {
    await client.end();
  }
}

// Exécution
seedGrammarRules()
  .then(() => {
    console.log('\n🎉 Seed terminé avec succès!\n');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n❌ Le seed a échoué:\n', error);
    process.exit(1);
  });
