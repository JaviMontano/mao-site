/**
 * Pricing editor — B2C base, B2B multipliers, premium pricing with save.
 * @module admin/js/price-editor
 */
import { AdminAPI } from '../../js/cms/admin-api.js';

export const PriceEditor = {
  validateNumeric(value) {
    return typeof value === 'number' && !isNaN(value) && value >= 0;
  },

  async savePricing(category, data) {
    await AdminAPI.updatePricing(category, data);
  },

  render(container, b2cData, b2bData, premiumData) {
    const b2c = b2cData || {};
    const b2b = b2bData || {};
    const premium = premiumData || {};
    let dirty = false;

    container.innerHTML = `
      <div class="space-y-6">
        <div class="bg-slate-800 rounded-xl p-6">
          <h3 class="text-lg font-bold text-white mb-4">B2C Base Prices</h3>
          <div id="b2c-fields" class="space-y-3">
            ${this._renderPriceFields(b2c.programs || {}, 'b2c')}
          </div>
          <div class="flex items-center gap-2 mt-4">
            <button id="save-b2c" class="px-4 py-2 bg-brand-gold text-slate-900 rounded font-semibold text-sm">Save B2C</button>
            <span id="status-b2c" class="text-sm"></span>
          </div>
        </div>
        <div class="bg-slate-800 rounded-xl p-6">
          <h3 class="text-lg font-bold text-white mb-4">B2B Multipliers</h3>
          <div id="b2b-fields" class="space-y-3">
            ${this._renderMultiplierFields(b2b)}
          </div>
          <div class="flex items-center gap-2 mt-4">
            <button id="save-b2b" class="px-4 py-2 bg-brand-gold text-slate-900 rounded font-semibold text-sm">Save B2B</button>
            <span id="status-b2b" class="text-sm"></span>
          </div>
        </div>
        <div class="bg-slate-800 rounded-xl p-6">
          <h3 class="text-lg font-bold text-white mb-4">Premium Pricing</h3>
          <div id="premium-fields" class="space-y-3">
            ${this._renderPriceFields(premium.skus || {}, 'premium')}
          </div>
          <div class="flex items-center gap-2 mt-4">
            <button id="save-premium" class="px-4 py-2 bg-brand-gold text-slate-900 rounded font-semibold text-sm">Save Premium</button>
            <span id="status-premium" class="text-sm"></span>
          </div>
        </div>
        <span id="price-dirty" class="text-sm text-amber-400 hidden">● Unsaved changes</span>
      </div>
    `;

    // Track dirty state
    container.querySelectorAll('input[type="number"]').forEach((input) => {
      input.addEventListener('input', () => {
        dirty = true;
        container.querySelector('#price-dirty').classList.remove('hidden');
      });
    });

    // Save handlers
    container.querySelector('#save-b2c').addEventListener('click', () =>
      this._saveCategoryFromDOM(container, 'b2c', 'b2c_base'));
    container.querySelector('#save-b2b').addEventListener('click', () =>
      this._saveCategoryFromDOM(container, 'b2b', 'b2b_multipliers'));
    container.querySelector('#save-premium').addEventListener('click', () =>
      this._saveCategoryFromDOM(container, 'premium', 'premium'));

    // Navigation guard
    window.addEventListener('beforeunload', (e) => {
      if (dirty) { e.preventDefault(); e.returnValue = ''; }
    });
  },

  _renderPriceFields(data, prefix) {
    if (!data || Object.keys(data).length === 0) {
      return '<p class="text-slate-500 text-sm">No pricing data. Add entries to get started.</p>';
    }
    return Object.entries(data).map(([key, val]) => `
      <div class="flex items-center gap-3">
        <label class="text-sm text-slate-400 w-48">${key}</label>
        <input type="number" data-category="${prefix}" data-key="${key}" value="${val}"
          class="bg-slate-700 text-white rounded px-3 py-2 text-sm w-32" min="0" step="0.01" />
      </div>
    `).join('');
  },

  _renderMultiplierFields(data) {
    const skip = ['updated_at', 'updated_by'];
    const entries = Object.entries(data).filter(([k]) => !skip.includes(k));
    if (entries.length === 0) {
      return '<p class="text-slate-500 text-sm">No multiplier data.</p>';
    }
    return entries.map(([key, val]) => `
      <div class="flex items-center gap-3">
        <label class="text-sm text-slate-400 w-48">${key}</label>
        <input type="number" data-category="b2b" data-key="${key}" value="${val}"
          class="bg-slate-700 text-white rounded px-3 py-2 text-sm w-32" min="0" step="0.01" />
      </div>
    `).join('');
  },

  async _saveCategoryFromDOM(container, prefix, category) {
    const statusEl = container.querySelector(`#status-${prefix}`);
    const inputs = container.querySelectorAll(`input[data-category="${prefix}"]`);
    const data = {};
    inputs.forEach((input) => {
      const val = parseFloat(input.value);
      if (!isNaN(val)) data[input.dataset.key] = val;
    });

    try {
      await this.savePricing(category, prefix === 'b2c' ? { programs: data } : prefix === 'premium' ? { skus: data } : data);
      statusEl.textContent = '✓ Saved';
      statusEl.className = 'text-sm text-green-400';
    } catch (err) {
      statusEl.textContent = `✗ ${err.message}`;
      statusEl.className = 'text-sm text-red-400';
    }
  },
};
