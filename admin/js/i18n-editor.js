/**
 * Translation editor component.
 * @module admin/js/i18n-editor
 */
import { AdminAPI } from '../../js/cms/admin-api.js';

export const I18nEditor = {
  /**
   * Flatten nested translation object to dot-notation keys.
   * @param {Object} obj
   * @param {string} [prefix='']
   * @returns {Object} flat key-value pairs
   */
  flattenKeys(obj, prefix = '') {
    const result = {};
    for (const [key, val] of Object.entries(obj)) {
      const path = prefix ? `${prefix}.${key}` : key;
      if (val && typeof val === 'object' && !Array.isArray(val)) {
        Object.assign(result, this.flattenKeys(val, path));
      } else {
        result[path] = val;
      }
    }
    return result;
  },

  /**
   * Filter flat keys by search query.
   * @param {Object} flatKeys
   * @param {string} query
   * @returns {Object}
   */
  filterKeys(flatKeys, query) {
    if (!query) return { ...flatKeys };
    const lower = query.toLowerCase();
    const result = {};
    for (const [key, val] of Object.entries(flatKeys)) {
      if (key.toLowerCase().includes(lower) || String(val).toLowerCase().includes(lower)) {
        result[key] = val;
      }
    }
    return result;
  },

  /**
   * Save a single translation key.
   * @param {string} lang
   * @param {string} dotKey - e.g., 'nav.home'
   * @param {string} value
   */
  async saveTranslation(lang, dotKey, value) {
    // Rebuild nested object from dot notation
    const parts = dotKey.split('.');
    const update = {};
    let current = update;
    for (let i = 0; i < parts.length - 1; i++) {
      current[parts[i]] = {};
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;

    await AdminAPI.updateTranslations(lang, update);
  },

  /**
   * Render translation editor into container.
   * @param {HTMLElement} container
   * @param {Object} esTranslations
   * @param {Object} enTranslations
   */
  render(container, esTranslations, enTranslations) {
    const esFlat = this.flattenKeys(esTranslations);
    const enFlat = this.flattenKeys(enTranslations);

    container.innerHTML = `
      <div class="mb-4">
        <input type="text" id="i18n-search" placeholder="Search keys..."
          class="w-full bg-slate-700 text-white rounded px-3 py-2 text-sm" />
      </div>
      <div id="i18n-list" class="space-y-2 max-h-[60vh] overflow-y-auto"></div>
    `;

    const renderList = (query = '') => {
      const filtered = this.filterKeys(esFlat, query);
      const listEl = container.querySelector('#i18n-list');
      listEl.innerHTML = Object.entries(filtered).map(([key, esVal]) => `
        <div class="bg-slate-800 rounded p-3 grid grid-cols-3 gap-2 text-sm">
          <div class="text-slate-400 font-mono truncate">${key}</div>
          <input type="text" data-key="${key}" data-lang="es" value="${esVal}"
            class="bg-slate-700 text-white rounded px-2 py-1" />
          <input type="text" data-key="${key}" data-lang="en" value="${enFlat[key] || ''}"
            class="bg-slate-700 text-white rounded px-2 py-1" />
        </div>
      `).join('');
    };

    renderList();
    container.querySelector('#i18n-search').addEventListener('input', (e) => {
      renderList(e.target.value);
    });
  },

  /**
   * Bulk save all changed translation keys in one operation per language.
   * @param {HTMLElement} container
   * @param {Object} originalEs - original ES flat keys
   * @param {Object} originalEn - original EN flat keys
   */
  async bulkSave(container, originalEs, originalEn) {
    const esChanges = {};
    const enChanges = {};

    container.querySelectorAll('input[data-key]').forEach((input) => {
      const key = input.dataset.key;
      const lang = input.dataset.lang;
      const originals = lang === 'es' ? originalEs : originalEn;
      if (input.value !== originals[key]) {
        if (lang === 'es') esChanges[key] = input.value;
        else enChanges[key] = input.value;
      }
    });

    const results = [];
    if (Object.keys(esChanges).length > 0) {
      const esUpdate = this._unflattenKeys(esChanges);
      await AdminAPI.updateTranslations('es', esUpdate);
      results.push(`ES: ${Object.keys(esChanges).length} keys`);
    }
    if (Object.keys(enChanges).length > 0) {
      const enUpdate = this._unflattenKeys(enChanges);
      await AdminAPI.updateTranslations('en', enUpdate);
      results.push(`EN: ${Object.keys(enChanges).length} keys`);
    }

    return results.length > 0 ? results.join(', ') : 'No changes';
  },

  /**
   * Convert flat dot-notation keys back to nested object.
   * @param {Object} flat
   * @returns {Object}
   */
  _unflattenKeys(flat) {
    const result = {};
    for (const [dotKey, value] of Object.entries(flat)) {
      const parts = dotKey.split('.');
      let current = result;
      for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]]) current[parts[i]] = {};
        current = current[parts[i]];
      }
      current[parts[parts.length - 1]] = value;
    }
    return result;
  },
};
