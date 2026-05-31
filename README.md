# Grammar Importer vers Google Sheets

Cette application importe les règles de grammaire françaises dans un Google Sheet puis utilise ce tableur comme source de données pour l'API et l'interface web. PostgreSQL n'est plus nécessaire.

## Configuration rapide

Le chemin recommandé évite de copier manuellement une clé privée multilignes :

1. Suivre le guide [Activer Google Sheets avec Google Cloud Shell](./GOOGLE_SHEETS_SETUP.md).
2. Télécharger la clé JSON du compte de service dans `credentials/google-service-account.json`.
3. Partager le Google Sheet avec l’adresse e-mail du compte de service en lui donnant le rôle **Éditeur**.
4. Copier `.env.example` vers `.env.local` et renseigner l’identifiant du tableur :

```env
GOOGLE_SHEETS_SPREADSHEET_ID=identifiant-dans-url-du-tableur
GOOGLE_SERVICE_ACCOUNT_KEY_FILE=./credentials/google-service-account.json
```

Le fichier JSON et `.env.local` sont ignorés par Git. Ne jamais committer la clé. Pour un hébergeur qui ne permet pas d’ajouter un fichier secret, les anciennes variables `GOOGLE_SERVICE_ACCOUNT_EMAIL` et `GOOGLE_PRIVATE_KEY` restent disponibles comme alternative.

## Prérequis

- Node.js 18+
- Un projet Google Cloud avec l'API **Google Sheets API** activée
- Un compte de service Google Cloud
- Un Google Sheet partagé avec l'adresse e-mail du compte de service en tant qu'éditeur

## Configuration

1. Créer un Google Sheet vide.
2. Partager le tableur avec l'adresse e-mail du compte de service en lui donnant le rôle **Éditeur**.
3. Copier `.env.example` vers `.env.local`.
4. Renseigner les variables suivantes :

```env
GOOGLE_SHEETS_SPREADSHEET_ID=identifiant-dans-url-du-tableur
GOOGLE_SERVICE_ACCOUNT_EMAIL=compte-de-service@projet.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

La clé privée peut rester sur une ligne avec les caractères `\n` : l'application les convertit avant l'authentification.

## Initialiser et alimenter le tableur

```bash
npm install
npm run sheets:init
npm run seed:validate
npm run seed:grammar
npm run sheets:check
```

La commande `sheets:init` crée, si nécessaire, les quatre onglets suivants avec leurs en-têtes :

- `grammar_rules`
- `grammar_lessons`
- `exercises`
- `exercise_questions`

La commande `seed:grammar` ajoute ou met à jour les règles de `seed-grammar.json` en conservant les lignes éventuellement ajoutées manuellement. Elle peut donc être relancée sans dupliquer les règles importées.

## Lancer l'application

```bash
npm start
```

```

La commande `sheets:init` crée, si nécessaire, les quatre onglets suivants avec leurs en-têtes :

- `grammar_rules`
- `grammar_lessons`
- `exercises`
- `exercise_questions`

La commande `seed:grammar` ajoute ou met à jour les règles de `seed-grammar.json` en conservant les lignes éventuellement ajoutées manuellement. Elle peut donc être relancée sans dupliquer les règles importées.

## Lancer l'application

```bash
npm start
```

Puis ouvrir <http://localhost:3000>.

## Commandes disponibles

| Commande | Description |
| --- | --- |
| `npm run sheets:init` | Crée les onglets manquants et vérifie les en-têtes |
| `npm run seed:validate` | Valide `seed-grammar.json` localement |
| `npm run seed:grammar` | Importe ou met à jour les règles dans Google Sheets |
| `npm run sheets:check` | Vérifie l'accès au tableur et affiche les compteurs |
| `npm run info` | Affiche les statistiques du tableur |
| `npm test` | Exécute les tests automatisés sans contacter Google |
| `npm run check:syntax` | Vérifie la syntaxe JavaScript |
