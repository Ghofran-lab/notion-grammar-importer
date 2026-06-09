# Guide de démarrage - Module GRAMMAIRE 🚀

## Démarrage rapide (5 minutes)

### 1. Configuration de l'environnement

Assurez-vous que vous avez un fichier `.env` avec les bonnes variables :

```env
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=grammar_app
NODE_ENV=development
```

### 2. Initialiser la base de données

```bash
npm run db:init:grammar
```

**Sortie attendue:**
```
🚀 Initialisation de la base de données...

📋 Exécution du schéma SQL...

✅ Schéma exécuté avec succès!

📊 Tables créées:
   ✓ grammar_rules
   ✓ grammar_lessons
   ✓ exercises
   ✓ exercise_questions

✅ Initialisation complétée avec succès!

🎉 Base de données initialisée!
```

### 3. Insérer les données initiales

```bash
npm run seed:grammar
```

**Sortie attendue:**
```
📚 Début du seed des règles de grammaire...

📖 Niveau A1 (8 règles)
─────────────────────────────────────────────────────
  ✓ Les articles définis et indéfinis
  ✓ Le présent des verbes réguliers
  ...

✅ Seed complété: 41 règles de grammaire insérées/mises à jour

📊 Résumé par niveau:
   A1: 8 règles
   A2: 8 règles
   B1: 7 règles
   B2: 7 règles
   C1: 11 règles

🎉 Seed terminé avec succès!
```

### 4. Vérifier les données

```bash
npm run db:check:grammar
```

**Sortie attendue:**
```
📚 === VÉRIFICATION DES DONNÉES DE GRAMMAIRE ===

📋 Tables disponibles:
   ✓ grammar_rules
   ✓ grammar_lessons
   ✓ exercises
   ✓ exercise_questions

📊 Résumé par niveau:
──────────────────────────────────────────────
   A1: 8 règles (8 actives)
   A2: 8 règles (8 actives)
   B1: 7 règles (7 actives)
   B2: 7 règles (7 actives)
   C1: 11 règles (11 actives)
──────────────────────────────────────────────
   TOTAL: 41 règles (41 actives)
```

## Tests utiles

### Consulter les règles A1

```javascript
import { Pool } from 'pg';
import { getGrammarRulesByLevel } from './src/db/queries/grammar.js';

const pool = new Pool({...});
const client = await pool.connect();

const result = await getGrammarRulesByLevel(client, 'A1');
console.log(result.rows);

client.release();
```

### Voir toutes les catégories

```bash
psql -U postgres -d grammar_app -c "
  SELECT DISTINCT category, COUNT(*) as count 
  FROM grammar_rules 
  WHERE is_active = TRUE 
  GROUP BY category 
  ORDER BY count DESC;
"
```

### Voir le parcours A1 complet

```bash
psql -U postgres -d grammar_app -c "
  SELECT id, order_index, title, category 
  FROM grammar_rules 
  WHERE level = 'A1' AND is_active = TRUE 
  ORDER BY order_index;
"
```

## Commandes disponibles

| Commande | Description |
|----------|-------------|
| `npm run db:init:grammar` | Crée les tables |
| `npm run seed:grammar` | Insère les 41 règles de base |
| `npm run db:check:grammar` | Affiche un résumé des données |
| `npm run check:syntax` | Vérifie la syntaxe JS |

## Structure créée

```
Module GRAMMAIRE
├── 41 Règles (A1-C1)
│   ├── A1: 8 règles
│   ├── A2: 8 règles
│   ├── B1: 7 règles
│   ├── B2: 7 règles
│   └── C1: 11 règles
├── 11 Catégories
│   ├── Articles
│   ├── Verbes
│   ├── Pronoms
│   ├── Adjectifs
│   ├── Déterminants
│   ├── Prépositions
│   ├── Structure grammaticale
│   ├── Lexique
│   └── ...
└── Leçons, Exercices, Questions (à ajouter)
```

## Étapes suivantes

1. ✅ **Module GRAMMAIRE créé** - Structure de base + 41 règles
2. ⬜ Ajouter des leçons aux règles
3. ⬜ Créer des exercices et questions
4. ⬜ Créer une API REST
5. ⬜ Implémenter l'authentification

## Exemple de code

### Afficher toutes les règles A1

```javascript
import { getGrammarRulesByLevel } from './src/db/queries/grammar.js';

const result = await getGrammarRulesByLevel(client, 'A1');
result.rows.forEach(rule => {
  console.log(`${rule.title} - ${rule.category}`);
});
```

### Créer une nouvelle règle

```javascript
import { createGrammarRule } from './src/db/queries/grammar.js';

const result = await createGrammarRule(client, {
  title: 'Nouvelle règle',
  level: 'A1',
  category: 'Verbes',
  learning_objective: '...',
  short_description: '...',
  order_index: 9
});
```

## Fichiers importants

- [GRAMMAR.md](./GRAMMAR.md) - Documentation complète
- [database/schema-grammar.sql](./database/schema-grammar.sql) - Schéma SQL
- [seed-grammar.json](./seed-grammar.json) - Données initiales
- [src/db/queries/grammar.js](./src/db/queries/grammar.js) - API de requêtes
- [scripts/00-init-grammar-db.js](./scripts/00-init-grammar-db.js) - Initialisation
- [scripts/04-seed-grammar.js](./scripts/04-seed-grammar.js) - Insertion de données
- [scripts/05-check-grammar.js](./scripts/05-check-grammar.js) - Vérification

## FAQ

### Q: Où se trouvent les données ?

**R:** Les 41 règles de grammaire se trouvent dans `seed-grammar.json`. Elles sont insérées dans la table `grammar_rules` lors du `npm run seed:grammar`.

### Q: Comment ajouter une nouvelle règle ?

**R:** Ajoutez une entrée dans `seed-grammar.json` et réexécutez `npm run seed:grammar`. Ou utilisez la fonction `createGrammarRule()` directement.

### Q: Peuvent-on modifier les données existantes ?

**R:** Oui, utilisez la fonction `updateGrammarRule()` du module `src/db/queries/grammar.js`.

### Q: Pourquoi les leçons/exercices sont vides ?

**R:** C'est voulu! Cette première phase crée les 41 règles de base. Les leçons et exercices seront ajoutés progressivement.

---

**État**: ✅ Prêt à l'emploi - Vous pouvez maintenant ajouter des leçons et exercices!
