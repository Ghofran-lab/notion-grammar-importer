import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';
import { validateCourseSeedData } from './courseSeedService.js';
import { COURSE_GENERATION_SCHEMA } from './courseGenerationSchema.js';

dotenv.config({ path: process.env.DOTENV_CONFIG_PATH || '.env.local' });
dotenv.config();

const DEFAULT_MODEL = 'gpt-5.5';
const DEFAULT_PROMPT_PATH = '05-donnees/generation/prompts/course-generation-prompt.md';
const DEFAULT_OUTPUT_DIRECTORY = '05-donnees/generation/generated';

export async function loadCourseRequest(requestPath) {
  return JSON.parse(await fs.readFile(requestPath, 'utf-8'));
}

export async function buildCourseGenerationInput(requestPath, promptPath = DEFAULT_PROMPT_PATH) {
  const [prompt, request] = await Promise.all([
    fs.readFile(promptPath, 'utf-8'),
    loadCourseRequest(requestPath),
  ]);
  return {
    model: process.env.OPENAI_MODEL || DEFAULT_MODEL,
    input: [
      { role: 'developer', content: prompt },
      { role: 'user', content: `Fiche de demande à respecter strictement :\n${JSON.stringify(request, null, 2)}` },
    ],
    text: {
      format: {
        type: 'json_schema',
        name: 'generated_course',
        strict: true,
        schema: COURSE_GENERATION_SCHEMA,
      },
    },
  };
}

export function validateGeneratedCourseMatchesRequest(draft, request) {
  const module = draft.modules[0];
  const rule = module?.rules[0];
  if (draft.modules.length !== 1 || module.internal_id !== request.module.internal_id) throw new Error('Le brouillon généré ne correspond pas au module demandé.');
  if (module.rules.length !== 1 || rule.internal_id !== request.rule.internal_id) throw new Error('Le brouillon généré ne correspond pas à la règle demandée.');
  for (const field of ['title', 'level', 'category', 'order_index']) {
    if (rule[field] !== request.rule[field]) throw new Error(`Le brouillon généré modifie rule.${field}.`);
  }
  if (!rule.exercises.some((exercise) => exercise.internal_id === request.exercise_internal_id)) {
    throw new Error('Le brouillon généré ne contient pas l’identifiant d’exercice demandé.');
  }
}

export function extractResponseText(body) {
  if (body.output_text) return body.output_text;
  const content = (body.output || []).flatMap((item) => item.content || []);
  const refusal = content.find((item) => item.type === 'refusal');
  if (refusal) throw new Error(`OpenAI API : génération refusée (${refusal.refusal}).`);
  return content.filter((item) => item.type === 'output_text').map((item) => item.text).join('');
}

export async function generateCourseDraft({ requestPath, outputDirectory = DEFAULT_OUTPUT_DIRECTORY, fetchImplementation = fetch }) {
  if (!process.env.OPENAI_API_KEY) throw new Error('OPENAI_API_KEY est absente. Ajoutez-la dans .env.local avant la génération.');
  const request = await loadCourseRequest(requestPath);
  const payload = await buildCourseGenerationInput(requestPath);
  const response = await fetchImplementation('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const body = await response.json();
  if (!response.ok) throw new Error(`OpenAI API (${response.status}) : ${body.error?.message || 'erreur inconnue'}`);
  const outputText = extractResponseText(body);
  if (!outputText) throw new Error('OpenAI API : aucune sortie textuelle reçue.');

  const draft = JSON.parse(outputText);
  validateCourseSeedData(draft);
  validateGeneratedCourseMatchesRequest(draft, request);
  const outputPath = path.join(outputDirectory, `${request.rule.internal_id}.json`);
  await fs.mkdir(outputDirectory, { recursive: true });
  await fs.writeFile(outputPath, `${JSON.stringify(draft, null, 2)}\n`);
  return { outputPath, model: payload.model };
}
