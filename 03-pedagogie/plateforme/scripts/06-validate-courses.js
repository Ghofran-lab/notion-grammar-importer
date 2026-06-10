import { loadCourseSeedFile, validateCourseSeedData } from '../src/services/courseSeedService.js';

const data = await loadCourseSeedFile();
validateCourseSeedData(data);
console.log('✅ 05-donnees/seeds/seed-courses.json est valide.');
