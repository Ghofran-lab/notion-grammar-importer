# PostgreSQL et Adminer avec Docker

## Démarrage recommandé

Docker Compose démarre deux services :

- `postgres` : la base PostgreSQL persistante ;
- `adminer` : l'interface web permettant de parcourir les tables depuis un navigateur.

```bash
cp .env.example .env.local
npm install
npm run db:start
npm run db:init:grammar
npm run seed:grammar
npm run db:check:grammar
```

Attendre que PostgreSQL soit prêt si l'initialisation est lancée immédiatement après le premier démarrage. Pour suivre ses logs :

```bash
npm run db:logs
```

## Visualiser les données dans Adminer

Ouvrir <http://localhost:8080>, puis saisir :

| Champ | Valeur |
| --- | --- |
| Système | `PostgreSQL` |
| Serveur | `postgres` |
| Utilisateur | `postgres` |
| Mot de passe | `postgres` |
| Base de données | `grammar_app` |

Après la connexion, ouvrir `grammar_rules`, puis choisir **Sélectionner les données**.

### Depuis Google Cloud Shell

1. Exécuter `npm run db:start`.
2. Ouvrir **Aperçu Web** (*Web Preview*) dans la barre Cloud Shell.
3. Choisir **Changer de port**.
4. Saisir `8080`.

## Vérifier PostgreSQL dans le terminal

```bash
docker compose exec postgres psql -U postgres -d grammar_app -c "SELECT 1;"
```

## Arrêter les conteneurs

Conserver les données :

```bash
npm run db:stop
```

Supprimer également les données PostgreSQL locales :

```bash
docker compose down -v
```

## Variables d'environnement

La configuration Docker locale correspond à :

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/grammar_app
```

Les scripts du module grammaire utilisent par défaut les valeurs équivalentes :

```env
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=grammar_app
```

## Dépannage

### `ECONNREFUSED`

PostgreSQL n'est pas encore prêt ou n'est pas démarré :

```bash
npm run db:start
npm run db:logs
```

### Le port `5432` est déjà utilisé

Arrêter l'ancien service ou modifier le port PostgreSQL exposé dans `docker-compose.yml`.

### Le port `8080` est déjà utilisé

Arrêter l'ancien service Adminer ou modifier le port exposé, par exemple de `8080:8080` vers `8081:8080`.

### Adminer ne se connecte pas

Dans Adminer, utiliser `postgres` comme serveur. Ne pas utiliser `localhost` : depuis le conteneur Adminer, PostgreSQL est joignable par le nom du service Docker Compose.
