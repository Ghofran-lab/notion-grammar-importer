# Academy OS — Base de connaissances de l'académie

Ce dépôt est organisé comme un **système d'exploitation d'entreprise** : il centralise la stratégie, la pédagogie, les sites de commercialisation, les opérations et les données.

## Architecture principale

| Pilier | Rôle | Contenu clé |
| --- | --- | --- |
| [`01-strategie/`](./01-strategie/) | Vision, décisions et direction de l'entreprise | vision, objectifs, roadmap, journal entrepreneur |
| [`02-marketing-et-vente/`](./02-marketing-et-vente/) | Acquisition, pages de vente et contenus commerciaux | sites, offres, scripts d'appel, contenus, emails |
| [`03-pedagogie/`](./03-pedagogie/) | Plateforme pédagogique et contenus d'apprentissage | application Node.js, cours, grammaire, prompts pédagogiques |
| [`04-operations/`](./04-operations/) | Processus, setup technique et documentation d'exploitation | guides d'installation, procédures, checklists |
| [`05-donnees/`](./05-donnees/) | Sources structurées, schémas et exports | schémas SQL, seeds JSON, demandes de génération IA |
| [`99-archives/`](./99-archives/) | Historique et éléments obsolètes | anciens contenus, projets fermés, documents à conserver |

## Où se trouve l'application pédagogique ?

La plateforme est maintenant rangée dans [`03-pedagogie/plateforme/`](./03-pedagogie/plateforme/) :

- code serveur et interface : [`03-pedagogie/plateforme/src/`](./03-pedagogie/plateforme/src/)
- scripts d'import et de validation : [`03-pedagogie/plateforme/scripts/`](./03-pedagogie/plateforme/scripts/)
- exemples techniques : [`03-pedagogie/plateforme/examples/`](./03-pedagogie/plateforme/examples/)
- données utilisées par la plateforme : [`05-donnees/seeds/`](./05-donnees/seeds/)
- schémas SQL : [`05-donnees/schemas/`](./05-donnees/schemas/)

## Commandes utiles

Les commandes `npm` restent lancées depuis la racine du dépôt.

```bash
npm install
npm run check:syntax
npm run seed:validate
npm run courses:validate
npm run courses:test-generation
npm run serve
```

## Démarrage rapide avec Docker

```bash
cp .env.example .env.local
npm install
npm run db:start
npm run db:init:grammar
npm run seed:grammar
npm run db:check:grammar
```

Adminer reste accessible sur <http://localhost:8080>. L'application pédagogique est servie sur <http://localhost:3000> avec `npm run serve`.

## Sites de commercialisation

Les pages publiques et commerciales sont regroupées dans [`02-marketing-et-vente/sites/`](./02-marketing-et-vente/sites/) :

- page d'accueil historique : [`02-marketing-et-vente/sites/accueil.html`](./02-marketing-et-vente/sites/accueil.html)
- page de vente : [`02-marketing-et-vente/sites/sales/`](./02-marketing-et-vente/sites/sales/)
- pages statiques additionnelles : [`02-marketing-et-vente/sites/pages/`](./02-marketing-et-vente/sites/pages/)

Un portail minimal [`index.html`](./index.html) reste à la racine pour faciliter la navigation dans le dépôt depuis GitHub Pages.

## Génération de cours avec IA

Le flux de travail devient :

```text
05-donnees/generation/requests → prompt → 05-donnees/generation/generated → relecture → 05-donnees/seeds/seed-courses.json → import
```

Exemple :

```bash
npm run courses:generate -- --request 05-donnees/generation/requests/R-A1-PRON-001.json
```

Le brouillon généré n'est jamais importé automatiquement : il doit être relu, validé, puis copié explicitement dans `05-donnees/seeds/seed-courses.json`.
