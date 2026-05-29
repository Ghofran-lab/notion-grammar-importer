#!/usr/bin/env node

/**
 * Script d'initialisation de la base de données pour le module GRAMMAIRE
 * Exécute le schéma SQL pour créer les tables
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
 * Exécute le fichier SQL
 */
async function initializeDatabase() {
  const client = await pool.connect();

  try {
    console.log('🚀 Initialisation de la base de données...\n');

    // Lire le fichier schema-grammar.sql
    const schemaPath = path.join(__dirname, '../database/schema-grammar.sql');
    
    if (!fs.existsSync(schemaPath)) {
      throw new Error(`Fichier schema-grammar.sql non trouvé: ${schemaPath}`);
    }

    const schema = fs.readFileSync(schemaPath, 'utf-8');

    // Exécuter le schéma
    console.log('📋 Exécution du schéma SQL...\n');
    await client.query(schema);

    console.log('✅ Schéma exécuté avec succès!\n');

    // Vérifier les tables créées
    const tablesQuery = `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name LIKE 'grammar_%' OR table_name = 'exercises' OR table_name = 'exercise_questions'
      ORDER BY table_name;
    `;

    const result = await client.query(tablesQuery);

    if (result.rows.length > 0) {
      console.log('📊 Tables créées:');
      result.rows.forEach(row => {
        console.log(`   ✓ ${row.table_name}`);
      });
    }

    console.log('\n✅ Initialisation complétée avec succès!\n');

  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation:', error);
    throw error;
  } finally {
    await client.end();
  }
}

// Exécution
initializeDatabase()
  .then(() => {
    console.log('🎉 Base de données initialisée!\n');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n❌ L\'initialisation a échoué:\n', error);
    process.exit(1);
  });
