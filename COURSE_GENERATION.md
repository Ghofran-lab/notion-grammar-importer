# Générer et publier un cours pédagogique

## Principe

PostgreSQL est la source utilisée par l'application, mais les nouveaux cours sont d'abord préparés dans `seed-courses.json`. Cette étape intermédiaire permet de relire, versionner et valider les contenus produits avec l'aide de l'IA avant de les publier.

```text
Consigne pédagogique
  → génération IA au format JSON
  → seed-courses.json
  → validation automatique
  → relecture pédagogique
  → import PostgreSQL
  → affichage dans l'application
```

## Structure d'un cours

Le fichier JSON contient des modules. Chaque module contient des règles ou sujets pédagogiques. Chaque règle possède :

- un identifiant interne stable ;
- un niveau CECRL ;
- un objectif d'apprentissage ;
- des sections ordonnées ;
- au moins un exercice avec ses questions.

Les types de sections acceptés sont :

| Type | Usage |
| --- | --- |
| `lesson` | Paragraphes d'explication |
| `examples_table` | Tableau d'exemples |
| `warning` | Point d'attention mis en évidence |
| `common_mistakes` | Erreurs fréquentes structurées |
| `comparison_table` | Tableau comparatif |

Le prototype disponible dans `seed-courses.json` contient le module **Prononciation** et le cours **Les lettres finales muettes**.

## Première installation dans Google Cloud Shell

```bash
cd ~/notion-grammar-importer
npm install
npm run db:start
npm run db:init:grammar
npm run courses:validate
npm run courses:import
npm run serve
```

Dans **Aperçu Web** (*Web Preview*) :

- saisir le port `3000` pour consulter l'application pédagogique ;
- saisir le port `8080` pour consulter les tables avec Adminer.

## Publication après la modification d'un cours

Modifier ou générer `seed-courses.json`, puis exécuter :

```bash
npm run courses:validate
npm run courses:import
```

L'import peut être relancé : les modules et règles déjà présents sont mis à jour. Les sections, exercices et questions des règles importées sont remplacés par la nouvelle version validée du fichier JSON.

## Relecture pédagogique

La validation automatique contrôle la structure, mais elle ne remplace pas la relecture humaine. Vérifier particulièrement :

- l'exactitude des règles ;
- la difficulté adaptée au niveau CECRL ;
- les transcriptions de prononciation ;
- les difficultés propres aux italophones ;
- les consignes et réponses des exercices.

## Dépannage de l'aperçu Web sur le port 3000

Après une mise à jour du dépôt, arrêter l'ancienne instance de l'application avant de relancer le serveur :

```bash
npm run serve:stop
npm run serve
```

L'application sert les fichiers présents dans `src/public`. Si l'ancienne page affiche une erreur mentionnant un fichier inexistant comme `public/index.html`, un ancien processus Node.js est encore actif sur le port `3000`. La commande `npm run serve:stop` libère ce port ; `npm run serve` redémarre ensuite la version à jour.

Le message `EADDRINUSE: address already in use :::3000` a la même cause : une instance écoute déjà sur le port `3000`.
