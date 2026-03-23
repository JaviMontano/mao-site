/**
 * Pricing editor component.
 * @module admin/js/price-editor
 */
import { AdminAPI } from '../../js/cms/admin-api.js';

export const PriceEditor = {
  /**
   * Validate that a value is a non-negative number.
   * @param {any} value
   * @returns {boolean}
   */
  validateNumeric(value) {
    return typeof value === 'number' && !isNaN(value) && value >= 0;
  },

  /**
   * Save pricing data via AdminAPI.
   * @param {string} category
   * @param {Object} data
   */
  async savePricing(category, data) {
    await AdminAPI.updatePricing(category, data);
  },

  /**
   * Render pricing editor into container.
   * @param {HTMLElement} container
   * @param {Object} b2cData
   * @param {Object} b2bData
   * @param {Object} premiumData
   */
  render(container, b2cData, b2bData, premiumData) {
    container.innerHTML = `
      <div class="space-y-6">
        <div class="bg-slate-800 rounded-xl p-6">
          <h3 class="text-lg font-bold text-white mb-4">B2C Prices</h3>
          <div id="b2c-fields" class="space-y-2"></div>
          <button id="save-b2c" class="mt-4 px-4 py-2 bg-brand-gold text-slate-900 rounded font-semibold text-sm">
            Save B2C
          </button>
        </div>
        <div class="bg-slate-800 rounded-xl p-6">
          <h3 class="text-lg font-bold text-white mb-4">B2B Multipliers</h3>
          <div id="b2b-fields" class="space-y-2"></div>
          <button id="save-b2b" class="mt-4 px-4 py-2 bg-brand-gold text-slate-900 rounded font-semibold text-sm">
            Save B2B
          </button>
        </div>
      </div>
    `;
  },
};
