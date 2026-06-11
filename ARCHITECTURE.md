# Architecture Academy OS

Date de révision : 09/06/2026

Cette architecture transforme le dépôt en base de connaissances complète pour piloter une académie de langues. Elle reprend cinq piliers actifs et une zone d'archives.

## 1. Principes de classement

1. **Une idée = un emplacement naturel** : chaque fichier doit appartenir au pilier qui décrit son usage principal.
2. **Le code et les données sont séparés** : la plateforme vit dans `03-pedagogie/plateforme/`, tandis que les sources versionnées vivent dans `05-donnees/`.
3. **Les commandes restent centralisées** : `package.json` reste à la racine pour continuer à lancer `npm run ...` sans se déplacer.
4. **Un fichier ne doit pas exister en double sans raison** : la source unique des sites commerciaux est `02-marketing-et-vente/sites/`.
5. **La racine reste légère** : elle garde seulement les fichiers transversaux utiles à tout le dépôt (`README.md`, `ARCHITECTURE.md`, `package.json`, `docker-compose.yml`, `index.html`).
6. **Les documents obsolètes ne disparaissent pas** : ils sont déplacés dans `99-archives/` quand ils ne sont plus actifs.

## 2. Arborescence cible

```text
.
├── 00-systeme/
├── 01-strategie/
├── 02-marketing-et-vente/
│   └── sites/
├── 03-pedagogie/
│   ├── contenus/
│   ├── docs/
│   ├── examples/
│   └── plateforme/
│       ├── app/
│       ├── examples/
│       ├── scripts/
│       └── src/
├── 04-operations/
│   └── docs/
├── 05-donnees/
│   ├── generation/
│   │   ├── generated/
│   │   ├── prompts/
│   │   └── requests/
│   ├── schemas/
│   └── seeds/
├── 99-archives/
├── docker-compose.yml
├── index.html          # portail Academy OS
├── package.json
└── README.md
```

## 3. Règle de décision rapide

| Si tu ajoutes... | Range-le dans... |
| --- | --- |
| un agent, une règle de gouvernance du système agentique, un workflow | `00-systeme/` |
| une vision, un objectif, une décision | `01-strategie/` |
| une page de vente, un email, un script d'appel | `02-marketing-et-vente/` |
| un cours, une méthode, un exercice, un golden example ou du code pédagogique | `03-pedagogie/` |
| une procédure, un guide de setup, une checklist | `04-operations/` |
| un schéma, un seed, une demande IA, un export | `05-donnees/` |
| un ancien document à conserver | `99-archives/` |

> `03-pedagogie/examples/` (golden examples pédagogiques, lus par tous les agents de
> production de contenu) est distinct de `03-pedagogie/plateforme/examples/` (exemples
> techniques d'utilisation du code, lus par les développeurs).

## 4. Flux opérationnels clés

### Plateforme pédagogique

```text
03-pedagogie/plateforme/src
        ↓
05-donnees/seeds + 05-donnees/schemas
        ↓
PostgreSQL + interface pédagogique
```

### Génération IA de cours

```text
05-donnees/generation/requests
        ↓
05-donnees/generation/prompts
        ↓
05-donnees/generation/generated
        ↓ relecture humaine
05-donnees/seeds/seed-courses.json
        ↓
npm run courses:import
```

### Sites commerciaux

```text
02-marketing-et-vente/sites
        ↓
accueil, pages de vente, pages statiques et futurs tunnels
```

## 5. Prochaines extensions recommandées

- Ajouter `02-marketing-et-vente/offres/` pour documenter les offres.
- Ajouter `03-pedagogie/contenus/parcours/` pour structurer les parcours élèves.
- Ajouter `03-pedagogie/langues/{fr,it,en}/` lorsque des contenus phonétiques et grammaticaux
  spécifiques à chaque langue cible devront être déclinés (voir
  `01-strategie/strategie_multilingue.md`).
- Ajouter `04-operations/checklists/` pour les routines de publication et d'import.
- Ajouter `05-donnees/indicateurs/` quand les premiers tableaux de bord seront versionnés.
- Ajouter `01-strategie/personas_apprenants.md` pour détailler les profils d'apprenants au-delà
  de `mission.md` (objectifs, blocages, contextes d'usage réels de la langue).
