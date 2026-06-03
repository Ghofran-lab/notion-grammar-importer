const levelSelect = document.getElementById('levelSelect');
const modulesList = document.getElementById('modulesList');
const content     = document.getElementById('content');
let activeRuleId;

const esc = (v = '') => String(v).replace(/[&<>'"]/g, c =>
  ({ '&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;' })[c]);

async function fetchJSON(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error((await r.json()).error || 'Requête impossible');
  return r.json();
}

/* ── Sidebar ──────────────────────────────────────────────── */

async function loadLevels() {
  try {
    const levels = await fetchJSON('/api/levels');
    levelSelect.innerHTML = '<option value="">Tous les niveaux</option>' +
      levels.map(l => `<option value="${esc(l)}">${esc(l)}</option>`).join('');
    levelSelect.addEventListener('change', loadModules);
    await loadModules();
  } catch (e) { showError(content, e); }
}

async function loadModules() {
  modulesList.innerHTML = '<div class="loading-state">Chargement…</div>';
  try {
    const qs = levelSelect.value ? `?level=${encodeURIComponent(levelSelect.value)}` : '';
    const modules = await fetchJSON(`/api/modules${qs}`);
    if (!modules.length) {
      modulesList.innerHTML = '<div class="empty-state">Aucun cours disponible.</div>';
      return;
    }
    modulesList.innerHTML = modules.map(m => `
      <div class="module-group">
        <div class="module-header">
          <div class="module-dot"></div>
          <span class="module-title">${esc(m.title)}</span>
        </div>
        ${m.description ? `<p class="module-description">${esc(m.description)}</p>` : ''}
        ${m.rules.map(r => {
          const isPron = r.category === 'Prononciation';
          const isActive = String(r.id) === String(activeRuleId);
          return `<button class="rule-btn${isActive ? ' active' : ''}" data-rule-id="${r.id}">
            ${esc(r.title)}
            <span class="rule-btn-meta">
              <span class="badge ${isPron ? 'badge-pron' : 'badge-gram'}">${isPron ? 'PRON' : 'GRAM'}</span>${esc(r.level)} · ${esc(r.category)}
            </span>
          </button>`;
        }).join('')}
      </div>`).join('');
    document.querySelectorAll('.rule-btn').forEach(btn =>
      btn.addEventListener('click', () => showRule(btn.dataset.ruleId)));
  } catch (e) { showError(modulesList, e); }
}

/* ── Section renderers ────────────────────────────────────── */

const SECTION_META = {
  analogy:          { icon: '💡', label: 'En image',          color: 'analogy' },
  story:            { icon: '🎭', label: 'Scène',             color: 'story'   },
  lesson:           { icon: '📖', label: 'Leçon',             color: 'navy'    },
  examples_table:   { icon: '📋', label: 'Exemples',          color: 'blue'    },
  comparison_table: { icon: '⚖️',  label: 'Comparaison',      color: 'blue'    },
  warning:          { icon: '⚠️',  label: 'Attention',        color: 'gold'    },
  common_mistakes:  { icon: '🔍', label: 'Erreurs fréquentes', color: 'red'    },
};

function renderTable(data) {
  const intro = data.introduction
    ? `<p class="table-intro">${esc(data.introduction)}</p>` : '';
  const head = data.columns.map(c => `<th>${esc(c)}</th>`).join('');
  const body = data.rows.map(row =>
    `<tr>${row.map(cell => `<td>${esc(cell)}</td>`).join('')}</tr>`
  ).join('');
  return `${intro}<div class="table-wrap"><table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>`;
}

function renderSectionBody(section) {
  const d = section.content;
  switch (section.type) {
    case 'analogy': {
      const split = d.left && d.right ? `
        <div class="analogy-split">
          <div class="analogy-side">
            <div class="analogy-icon">${esc(d.left.icon)}</div>
            <div class="analogy-side-label">${esc(d.left.label)}</div>
            <div class="analogy-side-desc">${esc(d.left.description)}</div>
          </div>
          <div class="analogy-vs">↔</div>
          <div class="analogy-side">
            <div class="analogy-icon">${esc(d.right.icon)}</div>
            <div class="analogy-side-label">${esc(d.right.label)}</div>
            <div class="analogy-side-desc">${esc(d.right.description)}</div>
          </div>
        </div>` : '';
      return `<p class="analogy-metaphor">${esc(d.metaphor)}</p>${split}`;
    }

    case 'story': {
      const COLORS = ['#132440','#1e5c8a','#7a3b20','#1a5c32','#5c1a6e'];
      return `
        <p class="story-scenario">${esc(d.scenario)}</p>
        <div class="story-scene">
          ${d.characters.map((c, i) => {
            const color = COLORS[i % COLORS.length];
            const initial = c.name.charAt(0).toUpperCase();
            return `
            <div class="story-row">
              <div class="story-avatar" style="background:${color}">${initial}</div>
              <div class="story-bubble">
                <div class="story-name">${esc(c.name)}</div>
                <div class="story-says">${esc(c.says)}</div>
                <div class="story-label">${esc(c.label)}</div>
              </div>
            </div>`;
          }).join('')}
        </div>`;
    }

    case 'lesson':
      return d.content.map((p, i) =>
        i === 0
          ? `<p class="lesson-lead">${esc(p)}</p>`
          : `<p>${esc(p)}</p>`
      ).join('');

    case 'warning':
      return `<div class="warning-body">${d.content.map(p => `<p>${esc(p)}</p>`).join('')}</div>`;

    case 'examples_table':
    case 'comparison_table':
      return renderTable(d);

    case 'common_mistakes':
      return d.items.map(item => `
        <div class="mistake-card">
          <div class="mistake-audience">${esc(item.audience)}</div>
          <div class="mistake-row">
            <div class="mistake-field mistake-field--written">
              <div class="mistake-field-label">✍️ Français écrit</div>
              <div class="mistake-field-value">${esc(item.written_form)}</div>
            </div>
            <div class="mistake-field mistake-field--ok">
              <div class="mistake-field-label">✅ Prononciation correcte</div>
              <div class="mistake-field-value">${esc(item.correct_pronunciation)}</div>
            </div>
          </div>
          <div class="mistake-error">
            <span class="mistake-error-label">❌ Erreur fréquente</span>
            ${esc(item.common_mistake)}
          </div>
        </div>`).join('');

    default:
      return '<p class="empty-state">Section non prise en charge.</p>';
  }
}

function renderSection(section) {
  const meta = SECTION_META[section.type] || { icon: '📄', label: section.title, color: 'navy' };
  return `
    <div class="section-block section-block--${meta.color}">
      <div class="section-block-header">
        <span class="section-icon">${meta.icon}</span>
        <span class="section-label">${esc(meta.label)}</span>
        <span class="section-title-text">${esc(section.title)}</span>
      </div>
      <div class="section-block-body">
        ${renderSectionBody(section)}
      </div>
    </div>`;
}

function renderExercises(exercises) {
  if (!exercises.length)
    return '<div class="empty-state">Aucun exercice disponible.</div>';

  return `<div class="section-block section-block--exercise">
    <div class="section-block-header">
      <span class="section-icon">✏️</span>
      <span class="section-label">Exercices</span>
      <span class="section-title-text">Mise en pratique</span>
    </div>
    <div class="section-block-body">
      ${exercises.map((ex, i) => `
        <div class="exercise-card">
          <div class="exercise-header">
            <div class="exercise-num">${i + 1}</div>
            <div>
              <div class="exercise-title">${esc(ex.title)}</div>
              <div class="exercise-instructions">${esc(ex.instructions)}</div>
            </div>
          </div>
          <div class="exercise-questions">
            ${ex.questions.map((q, qi) => `
              <div class="question-item">
                <span class="question-num">${qi + 1}</span>
                <span>${esc(q.question_text)}</span>
              </div>`).join('')}
          </div>
        </div>`).join('')}
    </div>
  </div>`;
}

/* ── Show a rule ──────────────────────────────────────────── */

async function showRule(ruleId) {
  activeRuleId = ruleId;
  content.innerHTML = '<div class="loading-state" style="padding:60px;text-align:center;">Chargement…</div>';
  await loadModules();
  try {
    const { rule, sections, exercises } = await fetchJSON(`/api/rules/${ruleId}`);

    const sectionsHtml = sections.map(renderSection).join('');
    const exercisesHtml = renderExercises(exercises);

    content.innerHTML = `
      <div class="course-header">
        <div class="course-eyebrow">
          <span class="level-badge">${esc(rule.level)}</span>
          <span class="cat-badge">${esc(rule.category)}</span>
          ${rule.module_title ? `<span class="module-path">${esc(rule.module_title)}</span>` : ''}
        </div>
        <h1 class="course-title">${esc(rule.title)}</h1>
        <p class="course-objective">${esc(rule.learning_objective)}</p>
      </div>
      <div class="course-body">
        ${sectionsHtml}
        ${exercisesHtml}
      </div>`;

    // Scroll to top
    content.parentElement.scrollTop = 0;
  } catch (e) { showError(content, e); }
}

function showError(target, err) {
  target.innerHTML = `<div class="error-state">Erreur : ${esc(err.message)}</div>`;
}

loadLevels();
