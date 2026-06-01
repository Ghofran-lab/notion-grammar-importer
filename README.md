# Notion Grammar Importer

## Focus actuel

Ce projet génère une base PostgreSQL et importe les données de grammaire. PostgreSQL reste la source de vérité. Une interface web **Adminer** est incluse dans Docker Compose pour consulter facilement les tables depuis un navigateur, y compris sur tablette.

> Les parties Notion sont conservées dans le schéma pour compatibilité future, mais la synchronisation Notion est reportée à une prochaine étape.

## Prérequis

- Node.js 18+
- Docker avec Docker Compose

## Démarrage rapide avec Docker

```bash
cp .env.example .env.local
npm install
npm run db:start
npm run db:init:grammar
npm run seed:grammar
npm run db:check:grammar
```

## Visualiser les données avec Adminer

La commande `npm run db:start` démarre PostgreSQL et Adminer. Ouvrir <http://localhost:8080>, puis utiliser :

| Champ | Valeur |
| --- | --- |
| Système | `PostgreSQL` |
| Serveur | `postgres` |
| Utilisateur | `postgres` |
| Mot de passe | `postgres` |
| Base de données | `grammar_app` |

Dans Adminer, ouvrir la table `grammar_rules`, puis choisir **Sélectionner les données** pour parcourir les règles.

### Depuis Google Cloud Shell

Après `npm run db:start`, utiliser **Aperçu Web** (*Web Preview*) dans la barre Cloud Shell, sélectionner **Changer de port**, puis saisir `8080`.

## Commandes utiles

| Commande | Description |
| --- | --- |
| `npm run db:start` | Démarre PostgreSQL et Adminer |
| `npm run db:stop` | Arrête les conteneurs sans supprimer les données |
| `npm run db:logs` | Affiche les logs PostgreSQL |
| `npm run db:adminer` | Démarre Adminer si nécessaire |
| `npm run db:init:grammar` | Crée les tables du module grammaire |
| `npm run seed:grammar` | Importe les règles de grammaire |
| `npm run db:check:grammar` | Vérifie les données importées |
| `npm run db:init` | Crée les tables, vues et index génériques |
| `npm run seed:validate` | Valide le format de `seed-data.json` |
| `npm run seed:import` | Importe le JSON générique en base |
| `npm run db:check` | Vérifie les comptes et orphelins |
| `npm run info` | Affiche des statistiques rapides |

Consulter [POSTGRES_SETUP.md](./POSTGRES_SETUP.md) pour les instructions détaillées et le dépannage.

## Prototype de cours générés par IA

Le fichier `seed-courses.json` est la source relisible et versionnée des cours enrichis avant leur import dans PostgreSQL. Le prototype contient le module **Prononciation** et le cours **Les lettres finales muettes** avec ses sections, tableaux, erreurs fréquentes et exercice.

Après le démarrage de PostgreSQL, initialiser le schéma, valider le JSON puis importer le cours :

```bash
npm run db:start
npm run db:init:grammar
npm run courses:validate
npm run courses:import
npm run serve
```

Dans Google Cloud Shell, ouvrir **Aperçu Web**, choisir **Changer de port**, puis saisir `3000` pour afficher l'application pédagogique. Le port `8080` reste réservé à Adminer.

Le flux de travail recommandé pour les futurs contenus générés est :

```text
Génération IA → seed-courses.json → courses:validate → relecture pédagogique → courses:import → application web
```

### Si le port 3000 est déjà occupé

Après une mise à jour du dépôt, une ancienne instance Node.js peut encore servir l'ancienne interface. Redémarrer l'application avec :

```bash
npm run serve:stop
npm run serve
```

La nouvelle interface est servie depuis `src/public`. Si l'aperçu Web mentionne par erreur `public/index.html` ou affiche `EADDRINUSE`, arrêter l'ancien processus avec `npm run serve:stop` avant de relancer le serveur.

### Générer un brouillon avec OpenAI

Le prompt de génération est versionné dans `prompts/course-generation-prompt.md`. Chaque fiche située dans `course-requests/` décrit un cours à produire. Après avoir ajouté `OPENAI_API_KEY` dans `.env.local`, générer un brouillon avec :

```bash
npm run courses:generate -- --request course-requests/R-A1-PRON-001.json
```

Le brouillon est enregistré dans `generated/` et n'est jamais importé automatiquement. Relire le contenu, copier explicitement la version approuvée dans `seed-courses.json`, puis exécuter `npm run courses:validate` et `npm run courses:import`.


### Publics linguistiques pris en charge

Les cours générés s'adressent aux apprenants italophones et anglophones. Les erreurs fréquentes peuvent être communes à tous les apprenants ou ciblées par langue maternelle grâce au champ `audience`.
