# 03 — Pédagogie

Ce dossier contient la transformation promise aux élèves : plateforme, méthodologie, contenus, grammaire, exercices et ressources.

## Structure actuelle

- `plateforme/` : application Node.js, interface pédagogique, scripts et exemples.
- `docs/` : documentation historique sur la grammaire, la génération de cours et les contenus pédagogiques.
- `contenus/` : espace de classement futur pour cours, parcours, vocabulaire, prononciation et exercices.

## Liens avec les données

Les contenus structurés consommés par la plateforme sont rangés dans `../05-donnees/` afin de séparer clairement :

- la logique applicative (`03-pedagogie/plateforme/`) ;
- les sources de vérité versionnées (`05-donnees/seeds/`, `05-donnees/schemas/`).
