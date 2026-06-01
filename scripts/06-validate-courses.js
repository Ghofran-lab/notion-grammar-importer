import { loadCourseSeedFile, validateCourseSeedData } from '../src/services/courseSeedService.js';

const data = await loadCourseSeedFile();
validateCourseSeedData(data);
console.log('✅ seed-courses.json est valide.');
