# Activer Google Sheets avec Google Cloud Shell

Ce guide utilise un **fichier JSON de compte de service**. C'est plus simple que de copier une clé privée multilignes dans `.env.local`. Pour écrire dans un Google Sheet privé, il ne faut pas créer une simple *API key* : l'application utilise ce fichier JSON et l'accès accordé au compte de service.

## 1. Ouvrir Google Cloud Shell

Ouvrir <https://shell.cloud.google.com/> puis coller le bloc suivant après avoir remplacé `mon-projet-google-cloud` par l'identifiant du projet :

```bash
export PROJECT_ID="mon-projet-google-cloud"
export SERVICE_ACCOUNT_NAME="grammar-sheets-writer"
export SERVICE_ACCOUNT_EMAIL="${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"

gcloud config set project "$PROJECT_ID"
gcloud services enable sheets.googleapis.com iam.googleapis.com

gcloud iam service-accounts create "$SERVICE_ACCOUNT_NAME" \
  --display-name="Grammar Sheets Writer"

gcloud iam service-accounts keys create google-service-account.json \
  --iam-account="$SERVICE_ACCOUNT_EMAIL"

echo "Compte de service à ajouter comme éditeur du Google Sheet :"
echo "$SERVICE_ACCOUNT_EMAIL"
echo "Clé JSON générée : $PWD/google-service-account.json"
```

Si la commande de création du compte indique qu'il existe déjà, ce n'est pas bloquant : exécuter simplement la commande `gcloud iam service-accounts keys create` suivante.

## 2. Télécharger et ranger la clé JSON

Télécharger `google-service-account.json` depuis Google Cloud Shell : ouvrir le menu **Plus** de Cloud Shell, choisir **Télécharger**, puis saisir le chemin affiché à la fin du bloc précédent. Ranger ensuite le fichier dans le projet :

```bash
mkdir -p credentials
mv ~/Downloads/google-service-account.json credentials/google-service-account.json
cp .env.example .env.local
```

Sous Windows, déplacer manuellement le fichier téléchargé dans le dossier `credentials` du projet.

Le fichier `.env.local` doit contenir l'identifiant du tableur et le chemin de la clé :

```env
GOOGLE_SHEETS_SPREADSHEET_ID=identifiant-dans-url-du-tableur
GOOGLE_SERVICE_ACCOUNT_KEY_FILE=./credentials/google-service-account.json
```

L'identifiant du tableur est la partie située entre `/d/` et `/edit` dans son URL :

```text
https://docs.google.com/spreadsheets/d/IDENTIFIANT_DU_TABLEUR/edit
```

## 3. Partager le Google Sheet

Dans le bouton **Partager** du Google Sheet, ajouter l'adresse affichée par Cloud Shell :

```text
grammar-sheets-writer@mon-projet-google-cloud.iam.gserviceaccount.com
```

Donner à cette adresse le rôle **Éditeur**. Cette étape est obligatoire : activer l'API ne donne pas automatiquement accès à un tableur existant.

## 4. Initialiser les onglets

Depuis le terminal du projet :

```bash
npm install
npm run sheets:init
npm run seed:grammar
npm run sheets:check
npm start
```

## Dépannage

### `PERMISSION_DENIED` pendant la création de la clé

Le compte connecté doit être autorisé à créer des clés de comptes de service. Une politique d'organisation peut aussi interdire leur création. Dans ce cas, demander à l'administrateur Google Cloud d'autoriser cette opération ou de créer le fichier JSON.

### `Google Sheets API: The caller does not have permission`

Partager le Google Sheet avec l'adresse du compte de service en tant qu'éditeur, puis réessayer.

### `Variable d'environnement manquante: GOOGLE_SHEETS_SPREADSHEET_ID`

Ajouter l'identifiant du tableur à `.env.local`.

### `Impossible de lire GOOGLE_SERVICE_ACCOUNT_KEY_FILE`

Vérifier que le fichier JSON se trouve bien dans `credentials/google-service-account.json` et que `.env.local` indique le même chemin.
