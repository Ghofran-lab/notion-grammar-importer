/**
 * Script principal d'importation dans Notion
 *
 * Usage:
 *   npm run import
 *
 * Étapes:
 * 1. Charge les données du seed-data.json
 * 2. Crée les deux bases de données Notion
 * 3. Import les règles de grammaire
 * 4. Import les exercices liés aux règles
 */

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import {
  setupDatabases,
  createGrammarRulesDatabase,
  createExercisesDatabase,
  linkDatabases,
} from "./createDatabases.js";
import { importAllRules } from "./importRules.js";
import { importAllExercises } from "./importExercises.js";
import { notion } from "./notion.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SEED_DATA_PATH = path.join(__dirname, "..", "seed-data.json");

/**
 * Charge les données du fichier seed-data.json
 * @returns {Promise<Object>} Les données {rules, exercises}
 */
async function loadSeedData() {
  try {
    const data = await fs.readFile(SEED_DATA_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`❌ Erreur lors du chargement de seed-data.json:`);
    console.error(`   ${error.message}`);
    process.exit(1);
  }
}

/**
 * Valide les données du seed
 * @param {Object} data - Les données chargées
 * @returns {boolean} True si valide
 */
function validateSeedData(data) {
  if (!data.rules || !Array.isArray(data.rules)) {
    console.error(`❌ seed-data.json: 'rules' doit être un tableau`);
    return false;
  }

  if (!data.exercises || !Array.isArray(data.exercises)) {
    console.error(`❌ seed-data.json: 'exercises' doit être un tableau`);
    return false;
  }

  if (data.rules.length === 0) {
    console.error(`❌ seed-data.json: au moins une règle est requise`);
    return false;
  }

  // Vérifier que tous les exercices ont une règle associée
  const ruleIds = new Set(data.rules.map((r) => r.id));
  for (const exercise of data.exercises) {
    if (!ruleIds.has(exercise.rule_id)) {
      console.warn(
        `⚠️  Exercice '${exercise.id}': règle '${exercise.rule_id}' non trouvée`
      );
    }
  }

  return true;
}

/**
 * Fonction principale
 */
async function main() {
  console.clear();
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║     📚 Notion Grammar Importer - Importation Notion     ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");

  try {
    // Charger les données
    console.log("📂 Chargement des données...");
    const seedData = await loadSeedData();
    console.log(`✅ ${seedData.rules.length} règles chargées`);
    console.log(`✅ ${seedData.exercises.length} exercices chargés\n`);

    // Valider les données
    console.log("🔍 Validation des données...");
    if (!validateSeedData(seedData)) {
      process.exit(1);
    }
    console.log("✅ Données valides\n");

    // Vérifier la connexion Notion
    console.log("🔗 Vérification de la connexion Notion...");
    await notion.users.me();
    console.log("✅ Connexion établie\n");

    // Créer les bases
    console.log("═════════════════════════════════════════════════════════════");
    const { rulesDbId, exercisesDbId } = await setupDatabases();

    // Importer les règles
    console.log("═════════════════════════════════════════════════════════════");
    const rulesMap = await importAllRules(rulesDbId, seedData.rules);

    // Importer les exercices
    console.log("═════════════════════════════════════════════════════════════");
    const exercisesCount = await importAllExercises(
      exercisesDbId,
      seedData.exercises,
      rulesMap
    );

    // Résumé final
    console.log("═════════════════════════════════════════════════════════════");
    console.log("\n✨ SUCCÈS! Importation terminée avec succès!\n");
    console.log("📊 Résumé:");
    console.log(`   • ${seedData.rules.length} règles de grammaire créées`);
    console.log(`   • ${exercisesCount} exercices créés`);
    console.log(
      `   • ${seedData.rules.length} pages reliées aux exercices\n`
    );

    console.log("🎯 Prochaines étapes:");
    console.log(
      `   1. Ouvrez Notion et naviguez à votre page parente`
    );
    console.log(
      `   2. Vous verrez deux nouvelles bases : "Règles de Grammaire" et "Exercices"`
    );
    console.log(
      `   3. Cliquez sur une règle pour voir ses exercices associés\n`
    );

    console.log("📚 Conseils:");
    console.log(`   • Vous pouvez ajouter plus de données dans seed-data.json`);
    console.log(`   • Réexécutez 'npm run import' pour ajouter plus de contenu`);
    console.log(`   • Créez des vues personnalisées dans Notion\n`);

    console.log("═════════════════════════════════════════════════════════════\n");
  } catch (error) {
    console.error(`\n❌ Erreur lors de l'importation:`);
    console.error(`   ${error.message}\n`);

    if (error.code === "invalid_grant") {
      console.error("💡 Conseil: Vérifiez votre NOTION_TOKEN dans .env\n");
    } else if (error.code === "unauthorized") {
      console.error(
        "💡 Conseil: Assurez-vous que l'intégration a accès à votre page parente\n"
      );
    } else if (error.code === "not_found") {
      console.error(
        "💡 Conseil: Vérifiez votre NOTION_PARENT_PAGE_ID dans .env\n"
      );
    }

    process.exit(1);
  }
}

// Exécuter
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
