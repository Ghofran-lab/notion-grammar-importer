# 05 — Données

Ce dossier contient les sources structurées qui permettent de mesurer, analyser, générer et importer les contenus.

## Structure actuelle

- `schemas/` : schémas SQL PostgreSQL.
- `seeds/` : fichiers JSON importés en base.
- `generation/requests/` : fiches de demande pour générer des cours.
- `generation/prompts/` : prompts utilisés pour la génération IA.
- `generation/generated/` : brouillons générés à relire avant import.

## Principe

Les scripts de la plateforme lisent ces fichiers depuis la racine du dépôt. Les commandes `npm` du `package.json` conservent donc une entrée unique tout en gardant les données séparées du code.
