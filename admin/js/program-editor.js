/**
 * Program catalog editor component.
 * @module admin/js/program-editor
 */
import { AdminAPI } from '../../js/cms/admin-api.js';

export const ProgramEditor = {
  /**
   * Create list items for program display.
   * @param {Object[]} programs
   * @returns {Object[]} list item data
   */
  renderProgramList(programs) {
    return programs.map((p) => ({
      id: p.id,
      title_es: p.title_es,
      title_en: p.title_en,
    }));
  },

  /**
   * Validate that both language variants are present.
   * @param {Object} data
   * @param {string} fieldBase - e.g., 'title'
   * @returns {boolean}
   */
  validateBilingual(data, fieldBase) {
    const es = data[`${fieldBase}_es`];
    const en = data[`${fieldBase}_en`];
    return !!(es && en);
  },

  /**
   * Save program data via AdminAPI.
   * @param {string} programId
   * @param {Object} fields
   */
  async saveProgram(programId, fields) {
    await AdminAPI.updateProgram(programId, fields);
  },

  /**
   * Render the editor UI into a container.
   * @param {HTMLElement} container
   * @param {Object[]} programs
   */
  render(container, programs) {
    container.innerHTML = '';

    for (const program of programs) {
      const card = document.createElement('div');
      card.className = 'bg-slate-800 rounded-xl p-6 mb-4';
      card.innerHTML = `
        <h3 class="text-lg font-bold text-white mb-4">${program.title_es} / ${program.title_en}</h3>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm text-slate-400 mb-1">Título (ES)</label>
            <input type="text" data-field="title_es" data-lang="es" value="${program.title_es || ''}"
              class="w-full bg-slate-700 text-white rounded px-3 py-2 text-sm" />
          </div>
          <div>
            <label class="block text-sm text-slate-400 mb-1">Title (EN)</label>
            <input type="text" data-field="title_en" data-lang="en" value="${program.title_en || ''}"
              class="w-full bg-slate-700 text-white rounded px-3 py-2 text-sm" />
          </div>
          <div>
            <label class="block text-sm text-slate-400 mb-1">Descripción (ES)</label>
            <textarea data-field="description_es" data-lang="es" rows="3"
              class="w-full bg-slate-700 text-white rounded px-3 py-2 text-sm">${program.description_es || ''}</textarea>
          </div>
          <div>
            <label class="block text-sm text-slate-400 mb-1">Description (EN)</label>
            <textarea data-field="description_en" data-lang="en" rows="3"
              class="w-full bg-slate-700 text-white rounded px-3 py-2 text-sm">${program.description_en || ''}</textarea>
          </div>
        </div>
        <button data-save="${program.id}"
          class="mt-4 px-4 py-2 bg-brand-gold text-slate-900 rounded font-semibold text-sm hover:bg-brand-gold/90">
          Guardar / Save
        </button>
        <span data-status="${program.id}" class="ml-2 text-sm text-slate-500"></span>
      `;
      container.appendChild(card);

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
          statusEl.className = 'ml-2 text-sm text-green-400';
        } catch (err) {
          statusEl.textContent = `✗ ${err.message}`;
          statusEl.className = 'ml-2 text-sm text-red-400';
        }
      });
    }
  },
};
