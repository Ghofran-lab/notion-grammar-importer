# ⚙️ PostgreSQL Setup Guide

## Option 1: Avec Docker (Recommandé)

### 1. Démarrer PostgreSQL avec Docker

```bash
docker-compose up -d
```

**Vérifier que PostgreSQL démarre:**
```bash
docker-compose logs -f postgres
```

Attendez que vous voyez: `"database system is ready to accept connections"`

### 2. Vérifier la connexion

```bash
docker-compose exec postgres psql -U postgres -d grammar_app -c "SELECT 1;"
```

### 3. Exécuter l'initialisation

```bash
npm run db:init:grammar
npm run seed:grammar
npm run db:check:grammar
```

### 4. Arrêter PostgreSQL (quand terminé)

```bash
docker-compose down
```

Pour supprimer aussi les données:
```bash
docker-compose down -v
```

---

## Option 2: Installation locale de PostgreSQL

### Sur Ubuntu/Debian

```bash
sudo apt update
sudo apt install -y postgresql postgresql-contrib
sudo service postgresql start
sudo -u postgres psql -c "CREATE DATABASE grammar_app;"
```

### Sur macOS (avec Homebrew)

```bash
brew install postgresql
brew services start postgresql
createdb grammar_app
```

### Ensuite

```bash
npm run db:init:grammar
npm run seed:grammar
npm run db:check:grammar
```

---

## Dépannage

### Erreur: "ECONNREFUSED"
→ PostgreSQL n'est pas en cours d'exécution
```bash
# Vérifier le statut avec Docker
docker-compose logs postgres

# Ou relancer
docker-compose down
docker-compose up -d
```

### Erreur: "Port 5432 already in use"
```bash
# Arrêter le conteneur existant
docker-compose down

# Ou changer le port dans docker-compose.yml
# Port changé de "5432:5432" à "5433:5432"
```

### Erreur: "Database grammar_app does not exist"
```bash
# Créer la base
docker-compose exec postgres createdb -U postgres grammar_app

# Puis réessayer
npm run db:init:grammar
```

---

## Variables d'environnement (.env)

```env
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=grammar_app
```

Assurez-vous que `.env` contient ces valeurs.

---

## Commandes utiles

```bash
# Démarrer PostgreSQL
docker-compose up -d

# Voir les logs
docker-compose logs -f postgres

# Accéder à psql
docker-compose exec postgres psql -U postgres -d grammar_app

# Arrêter
docker-compose down

# Arrêter et nettoyer les données
docker-compose down -v

# Vérifier l'état
docker-compose ps
```

---

## Prochaines étapes

1. **Démarrer PostgreSQL** (voir Option 1 ou 2 ci-dessus)
2. **Vérifier la connexion**
3. **Exécuter:**
   ```bash
   npm run db:init:grammar
   npm run seed:grammar
   npm run db:check:grammar
   ```

C'est tout! 🎉
