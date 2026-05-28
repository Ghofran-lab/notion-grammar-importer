# Notion Grammar Importer

## Focus actuel
Ce projet est actuellement focalisé sur **la génération de la base PostgreSQL** et l'import des données seed.

> Les parties Notion sont conservées dans le schéma pour compatibilité future, mais la synchro Notion est reportée à une prochaine étape.

## Prérequis
- Node.js 18+
- PostgreSQL accessible via `DATABASE_URL`

## Configuration
1. Copier `.env.example` vers `.env.local`
2. Ajuster `DATABASE_URL`

## Commandes
- `npm run db:init` : crée tables/vues/index depuis `database/schema.sql`
- `npm run seed:validate` : valide le format de `seed-data.json`
- `npm run seed:import` : importe le JSON en base
- `npm run db:check` : vérifie les comptes et orphelins
- `npm run info` : affiche des stats rapides

## Exécution rapide
```bash
npm install
npm run db:init
npm run seed:validate
npm run seed:import
npm run db:check
npm run info
```
