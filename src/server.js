import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './db/connection.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = Number(process.env.PORT) || 3000;
const publicDirectory = path.join(__dirname, 'public');
const indexFile = path.join(publicDirectory, 'index.html');

if (!fs.existsSync(indexFile)) {
  throw new Error(`Interface web introuvable : ${indexFile}`);
}

app.use(express.json());
app.use(express.static(publicDirectory));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/levels', async (_req, res) => {
  try {
    const result = await pool.query('SELECT DISTINCT level FROM grammar_rules WHERE is_active = TRUE ORDER BY level');
    res.json(result.rows.map(({ level }) => level));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.get('/api/modules', async (req, res) => {
  try {
    const params = [];
    const levelFilter = req.query.level ? 'AND gr.level = $1' : '';
    if (req.query.level) params.push(req.query.level);
    const result = await pool.query(`
      SELECT gm.id, gm.internal_id, gm.title, gm.description, gm.order_index,
        COALESCE(json_agg(json_build_object(
          'id', gr.id, 'title', gr.title, 'level', gr.level, 'category', gr.category,
          'short_description', gr.short_description, 'order_index', gr.order_index
        ) ORDER BY gr.order_index) FILTER (WHERE gr.id IS NOT NULL), '[]') AS rules
      FROM grammar_modules gm
      LEFT JOIN grammar_rules gr ON gr.module_id = gm.id AND gr.is_active = TRUE ${levelFilter}
      WHERE gm.is_active = TRUE
      GROUP BY gm.id
      HAVING COUNT(gr.id) > 0
      ORDER BY gm.order_index, gm.title`, params);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.get('/api/rules/:id', async (req, res) => {
  try {
    const ruleResult = await pool.query(`
      SELECT gr.*, gm.title AS module_title
      FROM grammar_rules gr
      LEFT JOIN grammar_modules gm ON gm.id = gr.module_id
      WHERE gr.id = $1 AND gr.is_active = TRUE`, [req.params.id]);
    if (ruleResult.rowCount === 0) return res.status(404).json({ error: 'Règle non trouvée' });

    const sectionsResult = await pool.query(`
      SELECT id, section_type AS type, title, content, section_order
      FROM grammar_sections WHERE rule_id = $1 AND is_active = TRUE ORDER BY section_order`, [req.params.id]);
    const exercisesResult = await pool.query(`
      SELECT id, internal_id, title, exercise_type AS type, instructions, exercise_order
      FROM grammar_exercises WHERE rule_id = $1 AND is_active = TRUE ORDER BY exercise_order`, [req.params.id]);
    for (const exercise of exercisesResult.rows) {
      const questionsResult = await pool.query(`
        SELECT id, question_text, question_order FROM grammar_exercise_questions
        WHERE exercise_id = $1 AND is_active = TRUE ORDER BY question_order`, [exercise.id]);
      exercise.questions = questionsResult.rows;
    }
    res.json({ rule: ruleResult.rows[0], sections: sectionsResult.rows, exercises: exercisesResult.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.get('*', (_req, res) => res.sendFile(indexFile));

const server = app.listen(port, () => {
  console.log(`🚀 Application disponible sur http://localhost:${port}`);
  console.log(`📁 Interface web servie depuis ${publicDirectory}`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Le port ${port} est déjà utilisé par une autre instance.`);
    console.error('   Exécutez « npm run serve:stop », puis relancez « npm run serve ».');
    process.exit(1);
  }
  throw error;
});
app.get('*', (_req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(port, () => console.log(`🚀 Application disponible sur http://localhost:${port}`));
