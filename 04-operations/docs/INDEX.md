# 🗂️ Index du Module GRAMMAIRE

## Commençons par où?

### Pour **démarrer rapidement** (5 minutes)
→ Lire [QUICKSTART.md](./QUICKSTART.md)
```bash
npm run db:init:grammar
npm run seed:grammar
npm run db:check:grammar
```

### Pour **comprendre la structure**
→ Lire [GRAMMAR.md](./GRAMMAR.md)
- Architecture des 4 tables
- Schéma SQL détaillé
- API de requêtes disponibles

### Pour **voir des exemples**
→ Exécuter [examples/grammar-usage.js](./examples/grammar-usage.js)
```bash
node examples/grammar-usage.js
```

### Pour **l'état du projet**
→ Lire [PROJECT_STATUS.md](./PROJECT_STATUS.md)
- Tâches accomplies
- Métriques
- Prochaines étapes

---

## 📁 Guide des fichiers

### Configuration et données

| Fichier | Description |
|---------|-------------|
| [seed-grammar.json](./seed-grammar.json) | 41 règles de grammaire par niveau |
| [.env.example](./.env.example) | Configuration de base de données |
| [package.json](./package.json) | Scripts npm et dépendances |

### Schéma et base de données

| Fichier | Description |
|---------|-------------|
| [database/schema-grammar.sql](./database/schema-grammar.sql) | Schéma SQL complet (4 tables) |
| [scripts/00-init-grammar-db.js](./scripts/00-init-grammar-db.js) | Crée les tables |
| [scripts/04-seed-grammar.js](./scripts/04-seed-grammar.js) | Insère les 41 règles |
| [scripts/05-check-grammar.js](./scripts/05-check-grammar.js) | Vérifie les données |

### Code applicatif

| Fichier | Description |
|---------|-------------|
| [src/db/queries/grammar.js](./src/db/queries/grammar.js) | 15+ fonctions réutilisables |
| [examples/grammar-usage.js](./examples/grammar-usage.js) | 5 exemples d'utilisation |

### Documentation

| Fichier | Description | Lecture |
|---------|-------------|---------|
| [QUICKSTART.md](./QUICKSTART.md) | Guide de démarrage | **5 min** ⭐ |
| [GRAMMAR.md](./GRAMMAR.md) | Documentation technique | **20 min** |
| [PROJECT_STATUS.md](./PROJECT_STATUS.md) | État et métriques | **10 min** |
| [GRAMMAR_CREATED.md](./GRAMMAR_CREATED.md) | Synthèse de création | **5 min** |
| [SETUP_GUIDE.txt](./SETUP_GUIDE.txt) | Guide d'installation | **3 min** |

---

## 🎯 Parcours d'apprentissage recommandé

### 1️⃣ Première lecture (15 minutes)
1. Lire [SETUP_GUIDE.txt](./SETUP_GUIDE.txt) pour vue d'ensemble
2. Exécuter les 3 commandes d'initialisation
3. Lancer `npm run db:check:grammar`

### 2️⃣ Comprendre la structure (20 minutes)
1. Lire [QUICKSTART.md](./QUICKSTART.md)
2. Jeter un oeil au [database/schema-grammar.sql](./database/schema-grammar.sql)
3. Lire la section "Structure de la base de données" dans [GRAMMAR.md](./GRAMMAR.md)

### 3️⃣ Voir des exemples (10 minutes)
1. Exécuter `node examples/grammar-usage.js`
2. Parcourir le code dans [examples/grammar-usage.js](./examples/grammar-usage.js)
3. Essayer les autres exemples

### 4️⃣ Utiliser l'API (15 minutes)
1. Importer les fonctions de [src/db/queries/grammar.js](./src/db/queries/grammar.js)
2. Consulter la documentation dans [GRAMMAR.md](./GRAMMAR.md)
3. Adapter les exemples à votre cas d'usage

### 5️⃣ Développer votre application
1. Créer de nouvelles leçons et exercices
2. Étendre le module pour d'autres contenus
3. Intégrer une API REST ou interface Web

---

## 🚀 Commandes rapides

```bash
# Initialisation (une seule fois)
npm run db:init:grammar
npm run seed:grammar

# Utilisation quotidienne
npm run db:check:grammar        # Voir l'état des données
npm run check:syntax            # Vérifier la syntaxe JS

# Développement
npm run dev                      # Mode développement
npm run start                    # Démarrer l'app
```

---

## 📚 Contenu disponible

### Règles par niveau

**A1** (Débutant) - 8 règles
- Les articles définis et indéfinis
- Le présent des verbes réguliers
- Être et avoir
- Les pronoms sujets
- La négation simple
- Les questions simples
- Les adjectifs qualificatifs
- Les déterminants démonstratifs

**A2** (Faux débutant) - 8 règles
- Le passé composé
- L'accord des adjectifs
- Les pronoms COD/COI
- Le futur proche
- Les comparatifs
- Les prépositions de lieu
- Les déterminants possessifs

**B1** (Intermédiaire) - 7 règles
- L'imparfait
- Le futur simple
- Le conditionnel présent
- Le subjonctif présent
- Les connecteurs logiques
- Les pronoms relatifs simples
- Le discours indirect au présent

**B2** (Intermédiaire supérieur) - 7 règles
- Le subjonctif avancé
- La voix passive
- Les nuances de temps
- Le discours indirect au passé
- Les structures complexes
- Les connecteurs argumentatifs
- La concordance des temps

**C1** (Avancé) - 11 règles
- Le subjonctif imparfait et plus-que-parfait
- La concordance avancée
- Le discours indirect avancé
- Les connecteurs avancés
- Les structures complexes
- La mise en relief
- Les inversions stylistiques
- La double négation
- La voix passive avancée
- La nominalisation
- Le registre de langue

---

## 💡 Questions fréquentes

### "Par où commencer?"
→ [QUICKSTART.md](./QUICKSTART.md) en 5 minutes

### "Comment ajouter des leçons?"
→ Voir "Créer une nouvelle règle avec leçons" dans [examples/grammar-usage.js](./examples/grammar-usage.js)

### "Quel est le schéma SQL?"
→ [database/schema-grammar.sql](./database/schema-grammar.sql) + [GRAMMAR.md](./GRAMMAR.md)

### "Comment utiliser l'API?"
→ [src/db/queries/grammar.js](./src/db/queries/grammar.js) + [GRAMMAR.md](./GRAMMAR.md)

### "Où sont les données?"
→ [seed-grammar.json](./seed-grammar.json)

### "Quelles sont les 41 règles?"
→ [PROJECT_STATUS.md](./PROJECT_STATUS.md#contenu-créé)

---

## 🎓 Roadmap

```
Phase 1: ✅ Module GRAMMAIRE
├── 41 règles créées
├── Schéma SQL
├── Scripts d'initialisation
├── API de requêtes
└── Documentation complète

Phase 2: ⬜ Leçons (optionnel)
├── Ajouter des leçons détaillées
├── Ajouter des explications
└── Ajouter des exemples

Phase 3: ⬜ Exercices (optionnel)
├── Créer des QCM
├── Ajouter des exercices de remplissage
└── Créer des exercices de traduction

Phase 4: ⬜ API REST (optionnel)
└── Exposer les données via HTTP

Phase 5: ⬜ Interface Web (optionnel)
└── Créer une interface utilisateur
```

---

## 📞 Support

Pour toute question:
1. Consulter la [FAQ](#questions-fréquentes) ci-dessus
2. Lire la documentation pertinente (voir [index ci-dessus](#guide-des-fichiers))
3. Examiner les [exemples](./examples/grammar-usage.js)
4. Vérifier le [schéma SQL](./database/schema-grammar.sql)

---

**✅ Tout est prêt! Commencez par [QUICKSTART.md](./QUICKSTART.md) →**
