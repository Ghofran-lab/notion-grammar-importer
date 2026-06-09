import { buildCourseGenerationInput, generateCourseDraft } from '../src/services/courseGenerationService.js';

const args = process.argv.slice(2);
const requestIndex = args.indexOf('--request');
const requestPath = requestIndex >= 0 ? args[requestIndex + 1] : undefined;
const dryRun = args.includes('--dry-run');

if (!requestPath) {
  console.error('Usage : npm run courses:generate -- --request 05-donnees/generation/requests/R-A1-PRON-001.json [--dry-run]');
  process.exit(1);
}

if (dryRun) {
  const payload = await buildCourseGenerationInput(requestPath);
  console.log(`✅ Requête prête pour le modèle ${payload.model}. Aucun appel API effectué.`);
  console.log(`   Fiche : ${requestPath}`);
} else {
  const result = await generateCourseDraft({ requestPath });
  console.log(`✅ Brouillon généré avec ${result.model} : ${result.outputPath}`);
  console.log('🔎 Relisez ce brouillon avant de copier son contenu dans 05-donnees/seeds/seed-courses.json et de lancer courses:import.');
}
