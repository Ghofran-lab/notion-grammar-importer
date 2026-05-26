/**
 * Point d'entrée principal - CLI et affichage d'aide
 *
 * Usage:
 *   node src/index.js
 *   npm run dev
 *
 * Affiche les commandes disponibles et la documentation
 */

console.log(`
╔════════════════════════════════════════════════════════════╗
║    📚 Notion Grammar Importer - Architecture PostgreSQL   ║
╚════════════════════════════════════════════════════════════╝

🎯 COMMANDES DISPONIBLES:

╔══ 🐳 BASE DE DONNÉES ══════════════════════════════════════╗
║                                                            ║
║  npm run db:start         Démarre PostgreSQL (Docker)     ║
║  npm run db:stop          Arrête PostgreSQL               ║
║  npm run db:reset         Réinitialise (DEV ONLY)         ║
║  npm run db:init          Crée les tables                 ║
║  npm run db:check         Vérifie l'intégrité             ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝

╔══ 📥 IMPORT DONNÉES ══════════════════════════════════════╗
║                                                            ║
║  npm run seed:import      JSON → PostgreSQL               ║
║  npm run seed:validate    Valide seed-data.json           ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝

╔══ 📤 EXPORT NOTION ═══════════════════════════════════════╗
║                                                            ║
║  npm run notion:export    PostgreSQL → Notion             ║
║  npm run notion:sync      Synchronisation bidirectionnelle║
║                                                            ║
╚════════════════════════════════════════════════════════════╝

╔══ 📊 INFORMATIONS ════════════════════════════════════════╗
║                                                            ║
║  npm run info             Statistiques de la base          ║
║  npm run dev              Mode watch                       ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝

╔══ 🚀 DÉMARRAGE RAPIDE ════════════════════════════════════╗
║                                                            ║
║  ./start.sh               Tous les étapes automatiquement  ║
║                                                            ║
║  OU manuellement:                                          ║
║  1. npm install                                            ║
║  2. npm run db:start                                       ║
║  3. npm run db:init                                        ║
║  4. npm run seed:import                                    ║
║  5. npm run info                                           ║
║  6. npm run notion:export  (optionnel)                     ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝

📖 DOCUMENTATION COMPLÈTE: Voir README.md

════════════════════════════════════════════════════════════

🏗️  ARCHITECTURE:

  seed-data.json
        ↓
  PostgreSQL (Source of Truth)
  ├── tables
  ├── views
  └── indexes
        ↓
  Notion (optionnel)

════════════════════════════════════════════════════════════

💾 BASE DE DONNÉES:

  Tables:
  • rules              - Règles de grammaire
  • rule_examples      - Exemples des règles
  • rule_mistakes      - Erreurs fréquentes
  • exercises          - Exercices d'entraînement
  • sync_log          - Log de synchronisation Notion
  • audit_log         - Audit complet

  Vues:
  • exercises_with_rules   - Exercices + infos règles
  • rules_statistics       - Stats par règle

════════════════════════════════════════════════════════════

🔧 PRÉREQUIS:

  • Node.js 16+
  • Docker & Docker Compose
  • Compte Notion (optionnel)

════════════════════════════════════════════════════════════

📝 CONFIGURATION:

  1. Copier .env.example vers .env.local
  2. Configurer DATABASE_URL (PostgreSQL local)
  3. (Optionnel) Configurer NOTION_TOKEN et NOTION_PARENT_PAGE_ID

════════════════════════════════════════════════════════════

💡 CONSEILS:

  • Commencez par: npm run db:start && npm run db:init
  • Puis: npm run seed:import pour charger les données
  • Utilisez: npm run db:check pour vérifier l'intégrité
  • Visualisez: npm run info pour les statistiques

════════════════════════════════════════════════════════════

🚀 MIGRATION VERS LE CLOUD:

  1. Créer une base PostgreSQL cloud (Render, Railway, etc.)
  2. Récupérer la DATABASE_URL
  3. Changer DATABASE_URL dans .env
  4. npm run db:init  (crée les tables sur le cloud)
  5. npm run seed:import  (importe les données)
  
  C'est tout! Même code, juste une connexion différente.

════════════════════════════════════════════════════════════
`);

export default true;
