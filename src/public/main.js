const levelSelect = document.getElementById('levelSelect');
const modulesList = document.getElementById('modulesList');
const content = document.getElementById('content');
let activeRuleId;

const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]);

async function fetchJSON(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error((await response.json()).error || 'Requête impossible');
  return response.json();
}

function showError(target, error) {
  target.innerHTML = `<p class="error">Erreur : ${escapeHtml(error.message)}</p>`;
}

async function loadLevels() {
  try {
    const levels = await fetchJSON('/api/levels');
    levelSelect.innerHTML = '<option value="">Tous les niveaux</option>' + levels.map(level => `<option value="${escapeHtml(level)}">${escapeHtml(level)}</option>`).join('');
    levelSelect.addEventListener('change', loadModules);
    await loadModules();
  } catch (error) { showError(content, error); }
}

async function loadModules() {
  modulesList.innerHTML = '<p class="empty">Chargement…</p>';
  try {
    const suffix = levelSelect.value ? `?level=${encodeURIComponent(levelSelect.value)}` : '';
    const modules = await fetchJSON(`/api/modules${suffix}`);
    if (!modules.length) return modulesList.innerHTML = '<p class="empty">Aucun cours disponible.</p>';
    modulesList.innerHTML = modules.map(module => `
      <section class="module">
        <strong class="module-title">${escapeHtml(module.title)}</strong>
        <p class="module-description">${escapeHtml(module.description)}</p>
        ${module.rules.map(rule => `<button class="rule-button${String(rule.id) === String(activeRuleId) ? ' active' : ''}" data-rule-id="${rule.id}">${escapeHtml(rule.title)}<span class="rule-level">${escapeHtml(rule.level)} · ${escapeHtml(rule.category)}</span></button>`).join('')}
      </section>`).join('');
    document.querySelectorAll('.rule-button').forEach(button => button.addEventListener('click', () => showRule(button.dataset.ruleId)));
  } catch (error) { showError(modulesList, error); }
}

function renderTable(section) {
  return `${section.introduction ? `<p>${escapeHtml(section.introduction)}</p>` : ''}<table><thead><tr>${section.columns.map(column => `<th>${escapeHtml(column)}</th>`).join('')}</tr></thead><tbody>${section.rows.map(row => `<tr>${row.map(cell => `<td>${escapeHtml(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
}

function renderSection(section) {
  const data = section.content;
  if (section.type === 'lesson') return data.content.map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join('');
  if (section.type === 'warning') return `<div class="warning">${data.content.map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join('')}</div>`;
  if (section.type === 'examples_table' || section.type === 'comparison_table') return renderTable(data);
  if (section.type === 'common_mistakes') return data.items.map((item, index) => `<article class="mistake"><strong>Exemple ${index + 1}</strong><p><b>Français écrit :</b> ${escapeHtml(item.written_form)}</p><p><b>Prononciation correcte :</b> ${escapeHtml(item.correct_pronunciation)}</p><p><b>Erreur fréquente :</b> ${escapeHtml(item.common_mistake)}</p></article>`).join('');
  return '<p class="empty">Section non prise en charge.</p>';
}

function renderExercises(exercises) {
  if (!exercises.length) return '<p class="empty">Aucun exercice disponible.</p>';
  return exercises.map(exercise => `<article class="exercise"><h2>${escapeHtml(exercise.title)}</h2><p>${escapeHtml(exercise.instructions)}</p>${exercise.questions.map(question => `<div class="question">${question.question_order}. ${escapeHtml(question.question_text)}</div>`).join('')}</article>`).join('');
}

async function showRule(ruleId) {
  activeRuleId = ruleId;
  content.className = 'course';
  content.innerHTML = '<p class="empty">Chargement…</p>';
  await loadModules();
  try {
    const { rule, sections, exercises } = await fetchJSON(`/api/rules/${ruleId}`);
    const tabs = sections.map((section, index) => ({ id: `section-${index}`, label: section.title, html: renderSection(section) }));
    tabs.push({ id: 'exercises', label: 'Exercices', html: renderExercises(exercises) });
    content.innerHTML = `<span class="eyebrow">${escapeHtml(rule.module_title)} · ${escapeHtml(rule.level)}</span><h1>${escapeHtml(rule.title)}</h1><p class="objective">${escapeHtml(rule.learning_objective)}</p><div class="tabs" role="tablist">${tabs.map((tab, index) => `<button class="tab${index === 0 ? ' active' : ''}" data-tab="${tab.id}" role="tab">${escapeHtml(tab.label)}</button>`).join('')}</div>${tabs.map((tab, index) => `<section class="panel" data-panel="${tab.id}"${index ? ' hidden' : ''}>${tab.html}</section>`).join('')}`;
    document.querySelectorAll('.tab').forEach(button => button.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(tab => tab.classList.toggle('active', tab === button));
      document.querySelectorAll('.panel').forEach(panel => { panel.hidden = panel.dataset.panel !== button.dataset.tab; });
    }));
  } catch (error) { showError(content, error); }
}

loadLevels();
