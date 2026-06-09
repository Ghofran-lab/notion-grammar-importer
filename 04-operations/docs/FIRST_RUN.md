# 🚀 Premier démarrage et démarrages futurs

## ✅ Première fois (DÉJÀ COMPLÉTÉ!)

Si vous lisez ceci, les étapes suivantes ont déjà été faites:

```bash
✅ docker-compose up -d              # PostgreSQL démarré
✅ npm run db:init:grammar           # Tables créées
✅ npm run seed:grammar              # 41 règles insérées
✅ npm run db:check:grammar          # Données vérifiées
```

**Félicitations! Tout fonctionne!** 🎉

---

## 📅 Pour les démarrages futurs

### Avant de travailler (chaque nouvelle session)

1. **Démarrer PostgreSQL** (si nécessaire)
   ```bash
   docker-compose up -d
   ```

2. **Vérifier que PostgreSQL est prêt** (optionnel)
   ```bash
   docker-compose ps
   ```

### Après avoir fini de travailler

1. **Arrêter PostgreSQL** (optionnel, les données persistent)
   ```bash
   docker-compose down
   ```

---

## 💻 Commandes utiles au quotidien

### Vérifier l'état
```bash
docker-compose ps                           # Voir le statut
npm run db:check:grammar                    # Voir les règles
```

### Consulter les données
```bash
# Voir toutes les règles A1
docker-compose exec postgres psql -U postgres -d grammar_app \
  -c "SELECT title FROM grammar_rules WHERE level = 'A1' ORDER BY order_index;"

# Voir toutes les catégories
docker-compose exec postgres psql -U postgres -d grammar_app \
  -c "SELECT DISTINCT category, COUNT(*) FROM grammar_rules GROUP BY category;"

# Voir une règle spécifique
docker-compose exec postgres psql -U postgres -d grammar_app \
  -c "SELECT * FROM grammar_rules WHERE title LIKE '%articles%';"
```

### Développement
```bash
npm run dev                                 # Mode développement
npm run check:syntax                        # Vérifier le code
node examples/grammar-usage.js              # Exécuter les exemples
```

---

## 🔧 Troubleshooting

### PostgreSQL ne démarre pas
```bash
# Vérifier les logs
docker-compose logs postgres

# Redémarrer
docker-compose restart postgres

# Ou redémarrer complètement
docker-compose down
docker-compose up -d
```

### "Port 5432 already in use"
```bash
# Arrêter tous les conteneurs
docker-compose down
```

### "Permission denied"
```bash
# Ajouter votre utilisateur au groupe docker
sudo usermod -aG docker $USER
```

---

## 📊 Structure actuelle

```
Base de données: ✅ grammar_app
   ├── Niveau A1:  8 règles
   ├── Niveau A2:  8 règles
   ├── Niveau B1:  7 règles
   ├── Niveau B2:  7 règles
   └── Niveau C1: 11 règles

Total: 41 règles prêtes à être utilisées
```

---

## 🎯 Exemple d'utilisation

```javascript
import { Pool } from 'pg';
import { getGrammarRulesByLevel } from './src/db/queries/grammar.js';

const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'grammar_app'
});

const client = await pool.connect();

// Récupérer les règles A1
const result = await getGrammarRulesByLevel(client, 'A1');

// Afficher les résultats
result.rows.forEach(rule => {
  console.log(`${rule.title} - ${rule.category}`);
});

client.release();
await pool.end();
```

---

## 📚 Documentation

- [POSTGRES_SETUP.md](./POSTGRES_SETUP.md) - Configuration PostgreSQL
- [README_GRAMMAR.md](./README_GRAMMAR.md) - Aperçu du module
- [GRAMMAR.md](./GRAMMAR.md) - Documentation technique
- [QUICKSTART.md](./QUICKSTART.md) - Guide rapide

---

## ✨ Résumé

| Tâche | Commande | Fréquence |
|-------|----------|-----------|
| Démarrer PostgreSQL | `docker-compose up -d` | Chaque session |
| Vérifier les données | `npm run db:check:grammar` | Au besoin |
| Arrêter PostgreSQL | `docker-compose down` | En fin de session |
| Consulter règles | `npm run db:check:grammar` | Au besoin |
| Mode développement | `npm run dev` | Pendant la programmation |

---

**C'est tout!** Vous pouvez maintenant développer votre application d'apprentissage! 🚀
