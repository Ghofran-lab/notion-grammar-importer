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
