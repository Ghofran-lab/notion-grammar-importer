-- ============================================================================
-- SCHÉMA: Module GRAMMAIRE
-- ============================================================================
-- Description: Structure PostgreSQL pour les règles de grammaire françaises
-- destinées à des apprenants italophones
-- Niveaux: A1, A2, B1, B2, C1
-- ============================================================================

-- ============================================================================
-- TABLE: grammar_rules
-- ============================================================================
CREATE TABLE IF NOT EXISTS grammar_rules (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  level VARCHAR(10) NOT NULL,                 -- A1, A2, B1, B2, C1
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

CREATE INDEX idx_grammar_rules_level ON grammar_rules(level);
CREATE INDEX idx_grammar_rules_category ON grammar_rules(category);
CREATE INDEX idx_grammar_rules_is_active ON grammar_rules(is_active);
CREATE INDEX idx_grammar_rules_level_order ON grammar_rules(level, order_index);

-- ============================================================================
-- TABLE: grammar_lessons
-- ============================================================================
CREATE TABLE IF NOT EXISTS grammar_lessons (
  id SERIAL PRIMARY KEY,
  rule_id INT NOT NULL REFERENCES grammar_rules(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  lesson_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT grammar_lessons_unique UNIQUE (rule_id, lesson_order)
);

CREATE INDEX idx_grammar_lessons_rule_id ON grammar_lessons(rule_id);
CREATE INDEX idx_grammar_lessons_is_active ON grammar_lessons(is_active);

-- ============================================================================
-- TABLE: exercises
-- ============================================================================
CREATE TABLE IF NOT EXISTS exercises (
  id SERIAL PRIMARY KEY,
  lesson_id INT NOT NULL REFERENCES grammar_lessons(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  exercise_type VARCHAR(50) NOT NULL,        -- 'multiple_choice', 'fill_blank', 'translation', etc.
  instructions TEXT,
  difficulty_level VARCHAR(20) DEFAULT 'intermediate',
  exercise_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT exercises_unique UNIQUE (lesson_id, exercise_order)
);

CREATE INDEX idx_exercises_lesson_id ON exercises(lesson_id);
CREATE INDEX idx_exercises_exercise_type ON exercises(exercise_type);
CREATE INDEX idx_exercises_is_active ON exercises(is_active);

-- ============================================================================
-- TABLE: exercise_questions
-- ============================================================================
CREATE TABLE IF NOT EXISTS exercise_questions (
  id SERIAL PRIMARY KEY,
  exercise_id INT NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT exercise_questions_unique UNIQUE (exercise_id, question_order)
);

CREATE INDEX idx_exercise_questions_exercise_id ON exercise_questions(exercise_id);
CREATE INDEX idx_exercise_questions_is_active ON exercise_questions(is_active);

-- ============================================================================
-- VIEW: Grammar Learning Path (Pour parcourir la progression)
-- ============================================================================
CREATE OR REPLACE VIEW vw_grammar_learning_path AS
  SELECT 
    gr.id as rule_id,
    gr.level,
    gr.order_index,
    gr.title as rule_title,
    gr.category,
    gr.learning_objective,
    COUNT(DISTINCT gl.id) as lesson_count,
    COUNT(DISTINCT ex.id) as exercise_count
  FROM grammar_rules gr
  LEFT JOIN grammar_lessons gl ON gr.id = gl.rule_id AND gl.is_active = TRUE
  LEFT JOIN exercises ex ON gl.id = ex.lesson_id AND ex.is_active = TRUE
  WHERE gr.is_active = TRUE
  GROUP BY gr.id, gr.level, gr.order_index, gr.title, gr.category, gr.learning_objective
  ORDER BY gr.level, gr.order_index;
