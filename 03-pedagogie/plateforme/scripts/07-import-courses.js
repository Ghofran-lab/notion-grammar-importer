import { closePool } from '../src/db/connection.js';
import { importCourseSeedData, loadCourseSeedFile } from '../src/services/courseSeedService.js';

try {
  const data = await loadCourseSeedFile();
  const result = await importCourseSeedData(data);
  console.log('✅ Cours importés :', result);
} finally {
  await closePool();
}
