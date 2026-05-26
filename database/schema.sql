-- ============================================================================
-- Schéma Base de Données: Académie de Langues
-- ============================================================================
-- Description: Structure complète pour stocker les règles de grammaire
-- et les exercices associés, indépendamment de Notion.
-- ============================================================================

-- ============================================================================
-- TABLE: rules (Règles de grammaire)
-- ============================================================================
CREATE TABLE IF NOT EXISTS rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- ID interne pour traçabilité depuis seed-data.json
  internal_id VARCHAR(255) UNIQUE NOT NULL,
  
  -- Contenu de la règle
  title VARCHAR(255) NOT NULL,
  level_cecrl VARCHAR(10),                    -- "A1", "A2", "B1", etc.
  category VARCHAR(100),                      -- "Articles", "Verbes", etc.
  short_explanation TEXT,                     -- Explication courte pour la liste
  detailed_explanation TEXT,                  -- Explication complète pour la page
  
  -- Métadonnées
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Traçabilité Notion
  exported_to_notion BOOLEAN DEFAULT FALSE,
  notion_page_id VARCHAR(255),                -- UUID de la page Notion
  last_notion_sync TIMESTAMP WITH TIME ZONE,
  
  -- Index pour performance
  CONSTRAINT rules_internal_id_unique UNIQUE (internal_id),
  CONSTRAINT rules_level_cecrl_check CHECK (level_cecrl IN ('A1', 'A2', 'B1', 'B2', 'C1', 'C2'))
);

CREATE INDEX idx_rules_level_cecrl ON rules(level_cecrl);
CREATE INDEX idx_rules_category ON rules(category);
CREATE INDEX idx_rules_exported_to_notion ON rules(exported_to_notion);

-- ============================================================================
-- TABLE: rule_examples (Exemples pour chaque règle)
-- ============================================================================
CREATE TABLE IF NOT EXISTS rule_examples (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rule_id UUID NOT NULL REFERENCES rules(id) ON DELETE CASCADE,
  example TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT rule_examples_order_check CHECK (example != '')
);

CREATE INDEX idx_rule_examples_rule_id ON rule_examples(rule_id);

-- ============================================================================
-- TABLE: rule_mistakes (Erreurs fréquentes pour chaque règle)
-- ============================================================================
CREATE TABLE IF NOT EXISTS rule_mistakes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rule_id UUID NOT NULL REFERENCES rules(id) ON DELETE CASCADE,
  mistake TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT rule_mistakes_content_check CHECK (mistake != '')
);

CREATE INDEX idx_rule_mistakes_rule_id ON rule_mistakes(rule_id);

-- ============================================================================
-- TABLE: exercises (Exercices d'entraînement)
-- ============================================================================
CREATE TABLE IF NOT EXISTS exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- ID interne pour traçabilité depuis seed-data.json
  internal_id VARCHAR(255) UNIQUE NOT NULL,
  
  -- Relation avec la règle
  rule_id UUID NOT NULL REFERENCES rules(id) ON DELETE CASCADE,
  
  -- Contenu de l'exercice
  title VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,                  -- "MCQ", "FILL", "ERROR"
  instruction TEXT,                           -- Consigne
  question TEXT NOT NULL,                     -- La question
  correct_answer TEXT NOT NULL,               -- Réponse correcte
  explanation TEXT,                           -- Explication de la réponse
  
  -- Propriétés de l'exercice
  difficulty VARCHAR(20) NOT NULL,            -- "easy", "medium", "hard"
  estimated_duration VARCHAR(50),             -- "2 minutes", "5-10 minutes", etc.
  
  -- Options pour les QCM (stockées en JSON)
  options JSONB,                              -- ["option1", "option2", ...]
  
  -- Métadonnées
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Traçabilité Notion
  exported_to_notion BOOLEAN DEFAULT FALSE,
  notion_page_id VARCHAR(255),                -- UUID de la page Notion
  last_notion_sync TIMESTAMP WITH TIME ZONE,
  
  -- Constraints
  CONSTRAINT exercises_internal_id_unique UNIQUE (internal_id),
  CONSTRAINT exercises_type_check CHECK (type IN ('MCQ', 'FILL', 'ERROR')),
  CONSTRAINT exercises_difficulty_check CHECK (difficulty IN ('easy', 'medium', 'hard'))
);

CREATE INDEX idx_exercises_rule_id ON exercises(rule_id);
CREATE INDEX idx_exercises_type ON exercises(type);
CREATE INDEX idx_exercises_difficulty ON exercises(difficulty);
CREATE INDEX idx_exercises_exported_to_notion ON exercises(exported_to_notion);

-- ============================================================================
-- TABLE: sync_log (Log de synchronisation avec Notion)
-- ============================================================================
CREATE TABLE IF NOT EXISTS sync_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type VARCHAR(50) NOT NULL,            -- "rule" or "exercise"
  entity_id UUID NOT NULL,
  entity_internal_id VARCHAR(255),
  action VARCHAR(50) NOT NULL,                 -- "created", "updated", "deleted"
  notion_page_id VARCHAR(255),
  status VARCHAR(20) NOT NULL,                 -- "success", "failed", "pending"
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT sync_log_entity_type_check CHECK (entity_type IN ('rule', 'exercise')),
  CONSTRAINT sync_log_status_check CHECK (status IN ('success', 'failed', 'pending'))
);

CREATE INDEX idx_sync_log_entity_type ON sync_log(entity_type);
CREATE INDEX idx_sync_log_entity_id ON sync_log(entity_id);
CREATE INDEX idx_sync_log_status ON sync_log(status);
CREATE INDEX idx_sync_log_created_at ON sync_log(created_at);

-- ============================================================================
-- TABLE: audit_log (Audit complet des modifications)
-- ============================================================================
CREATE TABLE IF NOT EXISTS audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name VARCHAR(50) NOT NULL,
  record_id UUID NOT NULL,
  action VARCHAR(50) NOT NULL,                 -- "INSERT", "UPDATE", "DELETE"
  old_values JSONB,
  new_values JSONB,
  changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT audit_log_action_check CHECK (action IN ('INSERT', 'UPDATE', 'DELETE'))
);

CREATE INDEX idx_audit_log_table_name ON audit_log(table_name);
CREATE INDEX idx_audit_log_record_id ON audit_log(record_id);
CREATE INDEX idx_audit_log_changed_at ON audit_log(changed_at);

-- ============================================================================
-- FONCTION: Mettre à jour updated_at automatiquement
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers pour updated_at
CREATE TRIGGER update_rules_updated_at BEFORE UPDATE ON rules
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_exercises_updated_at BEFORE UPDATE ON exercises
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- VUE: Vue complète des exercices avec règles
-- ============================================================================
CREATE OR REPLACE VIEW exercises_with_rules AS
SELECT
  e.id,
  e.internal_id,
  e.title,
  e.type,
  e.difficulty,
  e.estimated_duration,
  e.created_at,
  r.id as rule_id,
  r.internal_id as rule_internal_id,
  r.title as rule_title,
  r.level_cecrl,
  r.category
FROM exercises e
LEFT JOIN rules r ON e.rule_id = r.id
ORDER BY r.level_cecrl, r.title, e.difficulty;

-- ============================================================================
-- VUE: Statistiques des règles
-- ============================================================================
CREATE OR REPLACE VIEW rules_statistics AS
SELECT
  r.id,
  r.title,
  r.level_cecrl,
  r.category,
  COUNT(e.id) as total_exercises,
  COUNT(CASE WHEN e.difficulty = 'easy' THEN 1 END) as easy_count,
  COUNT(CASE WHEN e.difficulty = 'medium' THEN 1 END) as medium_count,
  COUNT(CASE WHEN e.difficulty = 'hard' THEN 1 END) as hard_count,
  r.exported_to_notion,
  r.notion_page_id
FROM rules r
LEFT JOIN exercises e ON r.id = e.rule_id
GROUP BY r.id, r.title, r.level_cecrl, r.category, r.exported_to_notion, r.notion_page_id
ORDER BY r.level_cecrl, r.title;

-- ============================================================================
-- COMMENTAIRES DE DOCUMENTATION
-- ============================================================================
COMMENT ON TABLE rules IS 'Stocke les règles de grammaire principales';
COMMENT ON TABLE rule_examples IS 'Exemples associés à chaque règle';
COMMENT ON TABLE rule_mistakes IS 'Erreurs fréquentes pour chaque règle';
COMMENT ON TABLE exercises IS 'Exercices d''entraînement reliés aux règles';
COMMENT ON TABLE sync_log IS 'Log de synchronisation avec Notion API';
COMMENT ON TABLE audit_log IS 'Audit complet de toutes les modifications';
COMMENT ON COLUMN rules.internal_id IS 'ID interne depuis seed-data.json pour traçabilité';
COMMENT ON COLUMN rules.notion_page_id IS 'UUID de la page Notion créée, NULL si pas encore exportée';
COMMENT ON COLUMN exercises.options IS 'JSON array des options pour les QCM: ["opt1", "opt2", ...]';
COMMENT ON COLUMN exercises.rule_id IS 'Foreign key vers la règle parent';

-- ============================================================================
-- Fin du schéma
-- ============================================================================
