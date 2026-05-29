async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

const levelSelect = document.getElementById('levelSelect');
const rulesList = document.getElementById('rulesList');
const content = document.getElementById('content');

async function loadLevels() {
  try {
    const levels = await fetchJSON('/api/levels');
    levelSelect.innerHTML = '<option value="">-- Tous niveaux --</option>' + levels.map(l => `<option value="${l}">${l}</option>`).join('');
    levelSelect.addEventListener('change', () => loadRules(levelSelect.value));
    // load all initially
    await loadRules('');
  } catch (err) {
    content.innerHTML = `<p style="color:red">Erreur: ${err.message}</p>`;
  }
}

async function loadRules(level) {
  rulesList.innerHTML = '<p>Chargement...</p>';
  try {
    const url = level ? `/api/rules?level=${encodeURIComponent(level)}` : '/api/rules';
    const rules = await fetchJSON(url);
    if (rules.length === 0) rulesList.innerHTML = '<p>Aucune règle</p>';
    else rulesList.innerHTML = rules.map(r => `<div class="rule" data-id="${r.id}"><strong>${r.title}</strong><div style="font-size:12px;color:#666">${r.category} — ${r.short_description || ''}</div></div>`).join('');
    document.querySelectorAll('.rule').forEach(el => el.addEventListener('click', () => showRule(el.dataset.id)));
  } catch (err) {
    rulesList.innerHTML = `<p style="color:red">Erreur: ${err.message}</p>`;
  }
}

async function showRule(id) {
  content.innerHTML = '<p>Chargement...</p>';
  try {
    const data = await fetchJSON(`/api/rules/${id}`);
    const { rule, lessons } = data;
    let html = `<div><span class="back" onclick="history.back()">← Retour</span><h2>${rule.title}</h2><p><strong>Niveau:</strong> ${rule.level} — <strong>Catégorie:</strong> ${rule.category}</p><p>${rule.learning_objective || ''}</p><p>${rule.short_description || ''}</p></div>`;
    if (lessons.length === 0) html += '<p>Aucune leçon pour cette règle.</p>';
    else {
      for (const lesson of lessons) {
        html += `<div style="margin-top:12px"><h3>${lesson.title}</h3><div>${lesson.content || ''}</div>`;
        if (lesson.exercises && lesson.exercises.length) {
          html += '<ul>';
          for (const ex of lesson.exercises) {
            html += `<li><strong>${ex.title}</strong> (${ex.exercise_type})`;
            if (ex.questions && ex.questions.length) {
              html += '<ul>' + ex.questions.map(q => `<li>${q.question_text}</li>`).join('') + '</ul>';
            }
            html += '</li>';
          }
          html += '</ul>';
        }
        html += '</div>';
      }
    }
    content.innerHTML = html;
  } catch (err) {
    content.innerHTML = `<p style="color:red">Erreur: ${err.message}</p>`;
  }
}

loadLevels();
