// ═══════════════════════════════════════════════════════════════
// AUTHENTIFICATION PAR MOT DE PASSE
// ═══════════════════════════════════════════════════════════════

// ⚠️ CHANGEZ CE MOT DE PASSE CHAQUE MOIS
const VALID_PASSWORD = 'Academie2025';

// Clé de stockage local (le navigateur se souvient pendant 30 jours)
const SESSION_KEY = 'academia_session';
const SESSION_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 jours en millisecondes

// Vérifier si l'utilisateur est déjà connecté
function checkAuthentication() {
  const session = localStorage.getItem(SESSION_KEY);
  
  if (session) {
    const sessionData = JSON.parse(session);
    const now = Date.now();
    
    // Si la session n'a pas expiré, masquer la modal
    if (now - sessionData.timestamp < SESSION_DURATION) {
      hideLoginModal();
      initializeApp();
      return;
    } else {
      // Session expirée
      localStorage.removeItem(SESSION_KEY);
    }
  }
  
  // Afficher la modal de connexion
  showLoginModal();
}

function showLoginModal() {
  const overlay = document.getElementById('loginOverlay');
  overlay.classList.remove('hidden');
}

function hideLoginModal() {
  const overlay = document.getElementById('loginOverlay');
  overlay.classList.add('hidden');
}

// Gérer la soumission du formulaire
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const passwordInput = document.getElementById('passwordInput');
  const errorDiv = document.getElementById('loginError');
  
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const password = passwordInput.value;
      
      if (password === VALID_PASSWORD) {
        // Mot de passe correct
        localStorage.setItem(SESSION_KEY, JSON.stringify({
          timestamp: Date.now(),
          login: true
        }));
        
        errorDiv.classList.remove('show');
        hideLoginModal();
        initializeApp();
      } else {
        // Mot de passe incorrect
        errorDiv.textContent = '❌ Mot de passe incorrect. Veuillez réessayer.';
        errorDiv.classList.add('show');
        passwordInput.value = '';
        passwordInput.focus();
      }
    });
  }
  
  // Vérifier l'authentification au chargement
  checkAuthentication();
});

// ═══════════════════════════════════════════════════════════════
// APPLICATION PÉDAGOGIQUE
// ═══════════════════════════════════════════════════════════════

console.log('Application pédagogique chargée');

// Simulation de données pour la démo
const mockData = {
  modules: [
    {
      id: 1,
      title: 'Prononciation',
      description: 'Les sons du français',
      rules: [
        { id: 101, title: 'Les lettres finales muettes', level: 'A2', category: 'Prononciation' },
        { id: 102, title: 'Les liaisons', level: 'B1', category: 'Prononciation' }
      ]
    },
    {
      id: 2,
      title: 'Grammaire essentielle',
      description: 'Bases grammaticales',
      rules: [
        { id: 201, title: 'Les verbes réguliers', level: 'A1', category: 'Grammaire' },
        { id: 202, title: 'Les prépositions', level: 'A2', category: 'Grammaire' }
      ]
    }
  ]
};

// Initialiser la navigation
function initializeApp() {
  const modulesList = document.getElementById('modulesList');
  
  if (!modulesList) return;
  
  modulesList.innerHTML = ''; // Vider avant de remplir
  
  mockData.modules.forEach(module => {
    const groupDiv = document.createElement('div');
    groupDiv.className = 'module-group';
    
    const headerDiv = document.createElement('div');
    headerDiv.className = 'module-header';
    
    const dot = document.createElement('div');
    dot.className = 'module-dot';
    
    const title = document.createElement('div');
    title.className = 'module-title';
    title.textContent = module.title;
    
    headerDiv.appendChild(dot);
    headerDiv.appendChild(title);
    
    const descDiv = document.createElement('div');
    descDiv.className = 'module-description';
    descDiv.textContent = module.description;
    
    groupDiv.appendChild(headerDiv);
    groupDiv.appendChild(descDiv);
    
    module.rules.forEach(rule => {
      const btn = document.createElement('button');
      btn.className = 'rule-btn';
      btn.innerHTML = `
        ${rule.title}
        <span class="rule-btn-meta">${rule.level} · ${rule.category}</span>
      `;
      btn.onclick = () => loadCourse(rule);
      groupDiv.appendChild(btn);
    });
    
    modulesList.appendChild(groupDiv);
  });
}

// Charger un cours (simulation)
function loadCourse(rule) {
  const contentSection = document.getElementById('content');
  
  if (!contentSection) return;
  
  contentSection.innerHTML = `
    <div class="course-header">
      <div class="course-eyebrow">
        <span class="level-badge">${rule.level}</span>
        <span class="cat-badge">${rule.category}</span>
      </div>
      <h2 class="course-title">${rule.title}</h2>
      <p class="course-objective">Maîtrisez cette règle pas à pas avec des exemples concrets et des exercices pratiques.</p>
    </div>
    
    <div class="course-body">
      <div class="section-block section-block--navy">
        <div class="section-block-header">
          <span class="section-icon">📚</span>
          <div class="section-label">Leçon</div>
          <div class="section-title-text">Comprendre la règle</div>
        </div>
        <div class="section-block-body">
          <p class="lesson-lead">Cette section explique la règle grammaticale ou phonétique de manière progressive et accessible.</p>
          <p>Les contenus détaillés seront chargés depuis la base de données quand l'API sera complète.</p>
          <p><em>Vous êtes maintenant connecté(e) à la plateforme ! 🎉</em></p>
        </div>
      </div>
      
      <div class="section-block section-block--blue">
        <div class="section-block-header">
          <span class="section-icon">✏️</span>
          <div class="section-label">Exemples</div>
          <div class="section-title-text">Voir en contexte</div>
        </div>
        <div class="section-block-body">
          <p>Des exemples authentiques et variés pour bien comprendre quand et comment appliquer la règle.</p>
        </div>
      </div>
    </div>
  `;
}
