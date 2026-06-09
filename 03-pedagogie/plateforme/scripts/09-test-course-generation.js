import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { generateCourseDraft } from '../src/services/courseGenerationService.js';

const previousApiKey = process.env.OPENAI_API_KEY;
const outputDirectory = await fs.mkdtemp(path.join(os.tmpdir(), 'notion-grammar-generation-'));
const seed = JSON.parse(await fs.readFile('05-donnees/seeds/seed-courses.json', 'utf-8'));
const draft = JSON.stringify({
  modules: seed.modules
    .filter((module) => module.internal_id === 'MOD-PRON-A1')
    .map((module) => ({
      ...module,
      rules: module.rules.filter((rule) => rule.internal_id === 'R-A1-PRON-001'),
    })),
});
let capturedPayload;

try {
  process.env.OPENAI_API_KEY = 'test-only';
  const mockFetch = async (_url, options) => {
    capturedPayload = JSON.parse(options.body);
    return {
      ok: true,
      status: 200,
      json: async () => ({ output: [{ type: 'message', content: [{ type: 'output_text', text: draft }] }] }),
    };
  };
  const result = await generateCourseDraft({ requestPath: '05-donnees/generation/requests/R-A1-PRON-001.json', outputDirectory, fetchImplementation: mockFetch });
  if (capturedPayload.text.format.type !== 'json_schema' || capturedPayload.text.format.strict !== true) throw new Error('Structured Output strict absent.');
  await fs.access(result.outputPath);

  delete process.env.OPENAI_API_KEY;
  try {
    await generateCourseDraft({ requestPath: '05-donnees/generation/requests/R-A1-PRON-001.json' });
    throw new Error('La clé API aurait dû être obligatoire.');
  } catch (error) {
    if (!error.message.includes('OPENAI_API_KEY est absente')) throw error;
  }
  console.log('✅ Génération OpenAI simulée : payload strict, réponse REST, validation et clé API vérifiés.');
} finally {
  if (previousApiKey) process.env.OPENAI_API_KEY = previousApiKey;
  else delete process.env.OPENAI_API_KEY;
  await fs.rm(outputDirectory, { recursive: true, force: true });
}
