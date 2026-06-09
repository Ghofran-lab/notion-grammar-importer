// Application pédagogique - Placeholder pour GitHub Pages
// Cette interface se connecterait normalement à une API backend

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
      
      <div class="section-block section-block--exercise">
        <div class="section-block-header">
          <span class="section-icon">🎯</span>
          <div class="section-label">Exercices</div>
          <div class="section-title-text">Pratiquer</div>
        </div>
        <div class="section-block-body">
          <div class="exercise-card">
            <div class="exercise-header">
              <div class="exercise-num">1</div>
              <div>
                <div class="exercise-title">Exercice de compréhension</div>
                <div class="exercise-instructions">Complétez les phrases en appliquant la règle.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Initialiser au chargement
document.addEventListener('DOMContentLoaded', initializeApp);
