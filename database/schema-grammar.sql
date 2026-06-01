-- ============================================================================
-- SCHÉMA: Parcours pédagogiques de français
-- ============================================================================
-- Les tables préfixées grammar_ constituent le modèle canonique de l'app.
-- Le contenu riche est préparé dans seed-courses.json avant son import.

CREATE TABLE IF NOT EXISTS grammar_modules (
  id SERIAL PRIMARY KEY,
  internal_id VARCHAR(100) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS grammar_rules (
  id SERIAL PRIMARY KEY,
  internal_id VARCHAR(100) UNIQUE,
  module_id INT REFERENCES grammar_modules(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  level VARCHAR(10) NOT NULL,
  category VARCHAR(100) NOT NULL,
  learning_objective TEXT NOT NULL,
  short_description TEXT NOT NULL,
  detailed_description TEXT,
  order_index INT NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT grammar_rules_level_check CHECK (level IN ('A1', 'A2', 'B1', 'B2', 'C1')),
  CONSTRAINT grammar_rules_unique UNIQUE (title, level)
);

-- Rend le schéma compatible avec une base créée avant l'ajout des modules.
ALTER TABLE grammar_rules ADD COLUMN IF NOT EXISTS internal_id VARCHAR(100);
ALTER TABLE grammar_rules ADD COLUMN IF NOT EXISTS module_id INT REFERENCES grammar_modules(id) ON DELETE SET NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_grammar_rules_internal_id ON grammar_rules(internal_id) WHERE internal_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_grammar_rules_module_id ON grammar_rules(module_id);
CREATE INDEX IF NOT EXISTS idx_grammar_rules_level ON grammar_rules(level);
CREATE INDEX IF NOT EXISTS idx_grammar_rules_category ON grammar_rules(category);
CREATE INDEX IF NOT EXISTS idx_grammar_rules_level_order ON grammar_rules(level, order_index);

CREATE TABLE IF NOT EXISTS grammar_sections (
  id SERIAL PRIMARY KEY,
  rule_id INT NOT NULL REFERENCES grammar_rules(id) ON DELETE CASCADE,
  section_type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  content JSONB NOT NULL,
  section_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT grammar_sections_unique UNIQUE (rule_id, section_order),
  CONSTRAINT grammar_sections_type_check CHECK (section_type IN ('lesson', 'examples_table', 'warning', 'common_mistakes', 'comparison_table'))
);
CREATE INDEX IF NOT EXISTS idx_grammar_sections_rule_id ON grammar_sections(rule_id);

CREATE TABLE IF NOT EXISTS grammar_exercises (
  id SERIAL PRIMARY KEY,
  internal_id VARCHAR(100) NOT NULL UNIQUE,
  rule_id INT NOT NULL REFERENCES grammar_rules(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  exercise_type VARCHAR(50) NOT NULL,
  instructions TEXT NOT NULL,
  exercise_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_grammar_exercises_rule_id ON grammar_exercises(rule_id);

CREATE TABLE IF NOT EXISTS grammar_exercise_questions (
  id SERIAL PRIMARY KEY,
  exercise_id INT NOT NULL REFERENCES grammar_exercises(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT grammar_exercise_questions_unique UNIQUE (exercise_id, question_order)
);
CREATE INDEX IF NOT EXISTS idx_grammar_exercise_questions_exercise_id ON grammar_exercise_questions(exercise_id);

DROP VIEW IF EXISTS vw_grammar_learning_path;
CREATE VIEW vw_grammar_learning_path AS
  SELECT
    gr.id AS rule_id,
    gm.title AS module_title,
    gr.level,
    gr.order_index,
    gr.title AS rule_title,
    gr.category,
    gr.learning_objective,
    COUNT(DISTINCT gs.id) AS section_count,
    COUNT(DISTINCT ge.id) AS exercise_count
  FROM grammar_rules gr
  LEFT JOIN grammar_modules gm ON gm.id = gr.module_id AND gm.is_active = TRUE
  LEFT JOIN grammar_sections gs ON gs.rule_id = gr.id AND gs.is_active = TRUE
  LEFT JOIN grammar_exercises ge ON ge.rule_id = gr.id AND ge.is_active = TRUE
  WHERE gr.is_active = TRUE
  GROUP BY gr.id, gm.title, gr.level, gr.order_index, gr.title, gr.category, gr.learning_objective
  ORDER BY gr.level, gr.order_index;
