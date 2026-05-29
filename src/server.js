import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './db/connection.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// API: niveaux disponibles
app.get('/api/levels', async (req, res) => {
  try {
    const result = await pool.query('SELECT DISTINCT level FROM grammar_rules WHERE is_active = TRUE ORDER BY level');
    res.json(result.rows.map(r => r.level));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// API: règles (optionnel: ?level=A1)
app.get('/api/rules', async (req, res) => {
  try {
    const { level } = req.query;
    if (level) {
      const result = await pool.query('SELECT id, title, level, category, short_description, order_index FROM grammar_rules WHERE level = $1 AND is_active = TRUE ORDER BY order_index', [level]);
      return res.json(result.rows);
    }
    const result = await pool.query('SELECT id, title, level, category, short_description, order_index FROM grammar_rules WHERE is_active = TRUE ORDER BY level, order_index');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// API: détail d'une règle avec leçons/exercices/questions
app.get('/api/rules/:id', async (req, res) => {
  try {
    const ruleId = req.params.id;
    const ruleRes = await pool.query('SELECT * FROM grammar_rules WHERE id = $1', [ruleId]);
    if (ruleRes.rowCount === 0) return res.status(404).json({ error: 'Règle non trouvée' });
    const rule = ruleRes.rows[0];

    const lessonsRes = await pool.query('SELECT id, title, content, lesson_order FROM grammar_lessons WHERE rule_id = $1 AND is_active = TRUE ORDER BY lesson_order', [ruleId]);
    const lessons = lessonsRes.rows;

    // For each lesson, fetch exercises and their questions
    for (const lesson of lessons) {
      const exRes = await pool.query('SELECT id, title, exercise_type, instructions, exercise_order FROM exercises WHERE lesson_id = $1 AND is_active = TRUE ORDER BY exercise_order', [lesson.id]);
      const exercises = exRes.rows;
      for (const ex of exercises) {
        const qRes = await pool.query('SELECT id, question_text, question_order FROM exercise_questions WHERE exercise_id = $1 AND is_active = TRUE ORDER BY question_order', [ex.id]);
        ex.questions = qRes.rows;
      }
      lesson.exercises = exercises;
    }

    res.json({ rule, lessons });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Fallback: serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`🚀 Server started on http://localhost:${port}`);
});
