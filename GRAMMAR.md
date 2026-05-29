# Module GRAMMAIRE 📚

## Vue d'ensemble

Le module GRAMMAIRE fournit une structure PostgreSQL propre pour stocker des règles de grammaire françaises destinées à des apprenants italophones, organisées par niveaux CECRL (A1, A2, B1, B2, C1).

## Structure de la base de données

### Tables principales

#### 1. **grammar_rules** - Règles de grammaire
Contient les règles de grammaire de base, regroupées par niveau et catégorie.

```sql
Colonnes:
- id (PRIMARY KEY)
- title (VARCHAR) - Titre de la règle
- level (VARCHAR) - A1, A2, B1, B2, ou C1
- category (VARCHAR) - Catégorie (Articles, Verbes, Pronoms, etc.)
- learning_objective (TEXT) - Objectif pédagogique
- short_description (TEXT) - Description courte
- detailed_description (TEXT) - Description détaillée (optionnel)
- order_index (INT) - Ordre de présentation
- is_active (BOOLEAN) - Pour désactiver les règles obsolètes
- created_at, updated_at (TIMESTAMP)
```

#### 2. **grammar_lessons** - Leçons
Chaque règle peut avoir plusieurs leçons.

```sql
Colonnes:
- id (PRIMARY KEY)
- rule_id (FOREIGN KEY) - Référence à la règle
- title (VARCHAR) - Titre de la leçon
- content (TEXT) - Contenu pédagogique
- lesson_order (INT) - Ordre dans la règle
- is_active (BOOLEAN)
- created_at, updated_at (TIMESTAMP)
```

#### 3. **exercises** - Exercices
Chaque leçon peut avoir plusieurs exercices.

```sql
Colonnes:
- id (PRIMARY KEY)
- lesson_id (FOREIGN KEY) - Référence à la leçon
- title (VARCHAR) - Titre de l'exercice
- exercise_type (VARCHAR) - 'multiple_choice', 'fill_blank', 'translation', etc.
- instructions (TEXT) - Instructions pour l'apprenant
- difficulty_level (VARCHAR) - 'easy', 'intermediate', 'hard'
- exercise_order (INT) - Ordre dans la leçon
- is_active (BOOLEAN)
- created_at, updated_at (TIMESTAMP)
```

#### 4. **exercise_questions** - Questions d'exercice
Chaque exercice peut avoir plusieurs questions.

```sql
Colonnes:
- id (PRIMARY KEY)
- exercise_id (FOREIGN KEY) - Référence à l'exercice
- question_text (TEXT) - Texte de la question
- question_order (INT) - Ordre dans l'exercice
- is_active (BOOLEAN)
- created_at, updated_at (TIMESTAMP)
```

### Vue

**vw_grammar_learning_path** - Vue pour afficher le parcours complet

Affiche toutes les règles avec le nombre de leçons et d'exercices associés.

## Niveaux CECRL et contenu initial

### A1 (Débutant)
- Les articles définis et indéfinis
- Le présent des verbes réguliers
- Être et avoir
- Les pronoms sujets
- La négation simple
- Les questions simples
- Les adjectifs qualificatifs
- Les déterminants démonstratifs

### A2 (Faux débutant)
- Le passé composé
- L'accord des adjectifs
- Les pronoms COD
- Les pronoms COI
- Le futur proche
- Les comparatifs
- Les prépositions de lieu
- Les déterminants possessifs

### B1 (Intermédiaire)
- L'imparfait
- Le futur simple
- Le conditionnel présent
- Le subjonctif présent
- Les connecteurs logiques
- Les pronoms relatifs simples
- Le discours indirect au présent

### B2 (Intermédiaire supérieur)
- Le subjonctif avancé
- La voix passive
- Les nuances de temps
- Le discours indirect au passé
- Les structures complexes
- Les connecteurs argumentatifs
- La concordance des temps

### C1 (Avancé)
- Le subjonctif avancé
- La concordance des temps avancée
- Le discours indirect avancé
- Les connecteurs logiques avancés
- Les structures complexes
- La mise en relief
- Les inversions stylistiques
- La double négation
- La voix passive avancée
- La nominalisation
- Le registre de langue

## Utilisation

### 1. Initialiser la base de données

```bash
npm run db:init:grammar
```

Cela crée toutes les tables du module grammaire.

### 2. Insérer les règles de base

```bash
npm run seed:grammar
```

Insère les 41 règles de grammaire par niveau depuis `seed-grammar.json`.

### 3. Vérifier les données

```bash
npm run db:check:grammar
```

Affiche un résumé de toutes les données insérées.

## API de requêtes

Le module `src/db/queries/grammar.js` fournit des fonctions réutilisables :

### Requêtes de lecture

```javascript
import { 
  getAllGrammarRules,
  getGrammarRulesByLevel,
  getGrammarRuleById,
  getLessonsByRule,
  getExercisesByLesson,
  getQuestionsByExercise,
  getGrammarStatistics,
  getLearningPathByLevel
} from './src/db/queries/grammar.js';
```

### Requêtes de création

```javascript
import { 
  createGrammarRule,
  createLesson,
  createExercise,
  createQuestion
} from './src/db/queries/grammar.js';
```

### Requêtes de modification

```javascript
import { 
  updateGrammarRule,
  deleteGrammarRule // marque comme inactive
} from './src/db/queries/grammar.js';
```

## Exemple d'utilisation

```javascript
import { getConnection } from './src/db/connection.js';
import { getGrammarRulesByLevel, getLessonsByRule } from './src/db/queries/grammar.js';

const client = await getConnection();

try {
  // Récupérer toutes les règles A1
  const result = await getGrammarRulesByLevel(client, 'A1');
  const rules = result.rows;

  // Pour chaque règle, récupérer les leçons
  for (const rule of rules) {
    const lessonsResult = await getLessonsByRule(client, rule.id);
    console.log(`${rule.title} (${lessonsResult.rows.length} leçons)`);
  }
} finally {
  await client.end();
}
```

## Structure évolutive

Cette architecture est conçue pour être extensible. Futures modules (sans les implémenter maintenant) :

- **Module PRONONCIATION** - Fichiers audio et phonétique
- **Module VOCABULAIRE** - Mots et expressions
- **Module STATISTIQUES** - Progression de l'apprenant
- **Module UTILISATEURS** - Gestion des profils et paramètres

## Architecture actuelle

```
notion-grammar-importer/
├── database/
│   └── schema-grammar.sql          # Schéma complet du module grammaire
├── scripts/
│   ├── 00-init-grammar-db.js       # Initialise les tables
│   ├── 04-seed-grammar.js          # Insère les données
│   └── 05-check-grammar.js         # Vérifie les données
├── src/
│   └── db/
│       └── queries/
│           └── grammar.js          # Fonctions de requête réutilisables
├── seed-grammar.json               # Données de base des règles
├── package.json                    # Scripts npm
└── GRAMMAR.md                      # Cette documentation
```

## Prochaines étapes

1. ✅ Créer la structure de base
2. ⬜ Ajouter les leçons pour chaque règle
3. ⬜ Ajouter les exercices et questions
4. ⬜ Créer une API REST pour accéder aux données
5. ⬜ Ajouter l'authentification des utilisateurs
6. ⬜ Implémenter le suivi de la progression

---

**État**: Module de base complété - Prêt pour ajouter des leçons et exercices
