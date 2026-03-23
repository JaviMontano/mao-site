/**
 * Program catalog editor — bilingual side-by-side layout with stale indicators.
 * @module admin/js/program-editor
 */
import { AdminAPI } from '../../js/cms/admin-api.js';

const BILINGUAL_FIELDS = ['title', 'tagline', 'description', 'transformation'];

export const ProgramEditor = {
  renderProgramList(programs) {
    return programs.map((p) => ({
      id: p.id,
      title_es: p.title_es,
      title_en: p.title_en,
    }));
  },

  validateBilingual(data, fieldBase) {
    const es = data[`${fieldBase}_es`];
    const en = data[`${fieldBase}_en`];
    return !!(es && en);
  },

  async saveProgram(programId, fields) {
    await AdminAPI.updateProgram(programId, fields);
  },

  render(container, programs) {
    container.innerHTML = '';
    const dirtyFields = new Map();

    for (const program of programs) {
      const card = document.createElement('div');
      card.className = 'bg-slate-800 rounded-xl p-6 mb-4';

      const fieldsHTML = BILINGUAL_FIELDS.map((field) => `
        <div class="grid grid-cols-2 gap-4 mb-3">
          <div>
            <label class="block text-sm text-slate-400 mb-1">${field} (ES)</label>
            ${field === 'description' || field === 'transformation'
    ? `<textarea data-field="${field}_es" data-lang="es" data-base="${field}" rows="3"
                class="w-full bg-slate-700 text-white rounded px-3 py-2 text-sm">${program[`${field}_es`] || ''}</textarea>`
    : `<input type="text" data-field="${field}_es" data-lang="es" data-base="${field}" value="${program[`${field}_es`] || ''}"
                class="w-full bg-slate-700 text-white rounded px-3 py-2 text-sm" />`}
          </div>
          <div class="relative">
            <label class="block text-sm text-slate-400 mb-1">
              ${field} (EN)
              <span class="stale-indicator text-amber-400 text-xs ml-1 hidden" data-stale="${field}">⚠ translation needed</span>
            </label>
            ${field === 'description' || field === 'transformation'
    ? `<textarea data-field="${field}_en" data-lang="en" data-base="${field}" rows="3"
                class="w-full bg-slate-700 text-white rounded px-3 py-2 text-sm">${program[`${field}_en`] || ''}</textarea>`
    : `<input type="text" data-field="${field}_en" data-lang="en" data-base="${field}" value="${program[`${field}_en`] || ''}"
                class="w-full bg-slate-700 text-white rounded px-3 py-2 text-sm" />`}
          </div>
        </div>
      `).join('');

      card.innerHTML = `
        <h3 class="text-lg font-bold text-white mb-4">${program.title_es} / ${program.title_en}</h3>
        ${fieldsHTML}
        <div class="flex items-center gap-2 mt-4">
          <button data-save="${program.id}"
            class="px-4 py-2 bg-brand-gold text-slate-900 rounded font-semibold text-sm hover:bg-brand-gold/90">
            Guardar / Save
          </button>
          <span data-status="${program.id}" class="text-sm text-slate-500"></span>
          <span data-dirty="${program.id}" class="text-sm text-amber-400 hidden">● Unsaved changes</span>
        </div>
      `;
      container.appendChild(card);

      // Track dirty state and stale indicators
      card.querySelectorAll('[data-field]').forEach((input) => {
        const origValue = input.value || input.textContent;
        input.addEventListener('input', () => {
          const key = `${program.id}_${input.dataset.field}`;
          dirtyFields.set(key, input.value !== origValue);
          card.querySelector(`[data-dirty="${program.id}"]`).classList.toggle(
            'hidden',
            ![...dirtyFields.entries()].some(([k, v]) => k.startsWith(program.id) && v),
          );

          // Mark EN as stale when ES is edited
          if (input.dataset.lang === 'es') {
            const staleEl = card.querySelector(`[data-stale="${input.dataset.base}"]`);
            if (staleEl) staleEl.classList.remove('hidden');
          }
          // Clear stale when EN is edited
          if (input.dataset.lang === 'en') {
            const staleEl = card.querySelector(`[data-stale="${input.dataset.base}"]`);
            if (staleEl) staleEl.classList.add('hidden');
          }
        });
      });

      // Save handler
      card.querySelector(`[data-save="${program.id}"]`).addEventListener('click', async () => {
        const fields = {};
        card.querySelectorAll('[data-field]').forEach((input) => {
          fields[input.getAttribute('data-field')] = input.value;
        });

        const statusEl = card.querySelector(`[data-status="${program.id}"]`);
        try {
          await this.saveProgram(program.id, fields);
          statusEl.textContent = '✓ Guardado';
          statusEl.className = 'text-sm text-green-400';
          card.querySelector(`[data-dirty="${program.id}"]`).classList.add('hidden');
          // Clear all dirty flags for this program
          [...dirtyFields.keys()]
            .filter((k) => k.startsWith(program.id))
            .forEach((k) => dirtyFields.delete(k));
        } catch (err) {
          statusEl.textContent = `✗ ${err.message}`;
          statusEl.className = 'text-sm text-red-400';
        }
      });
    }

    // Navigation guard for unsaved changes
    window.addEventListener('beforeunload', (e) => {
      if ([...dirtyFields.values()].some((v) => v)) {
        e.preventDefault();
        e.returnValue = '';
      }
    });
  },
};
