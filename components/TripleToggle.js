/**
 * TripleToggle Web Component
 * Fixed bottom-left pill with theme / locale / audience toggles.
 * FR-245..FR-249
 */

import { getTheme, toggleTheme } from '../js/theme/toggle.js';
import { getAudience, setAudience } from '../js/audience/state.js';

class TripleToggle extends HTMLElement {
  connectedCallback() {
    this._render();
    this._syncState();
  }

  disconnectedCallback() {
    // cleanup if needed
  }

  /** Build the light-DOM structure */
  _render() {
    // Theme toggle
    const themeBtn = document.createElement('button');
    themeBtn.setAttribute('role', 'switch');
    themeBtn.setAttribute('aria-checked', 'false');
    themeBtn.setAttribute('data-toggle-type', 'theme');
    themeBtn.setAttribute('tabindex', '0');
    themeBtn.textContent = '🌓';
    themeBtn.addEventListener('click', (e) => this._handleToggle('theme', e));
    themeBtn.addEventListener('keydown', (e) => this._handleKeydown('theme', e));
    this.appendChild(themeBtn);

    // Locale toggle
    const localeBtn = document.createElement('button');
    localeBtn.setAttribute('role', 'switch');
    localeBtn.setAttribute('aria-checked', 'false');
    localeBtn.setAttribute('data-toggle-type', 'locale');
    localeBtn.setAttribute('tabindex', '0');
    localeBtn.textContent = '🌐';
    localeBtn.addEventListener('click', (e) => this._handleToggle('locale', e));
    localeBtn.addEventListener('keydown', (e) => this._handleKeydown('locale', e));
    this.appendChild(localeBtn);

    // Audience toggle
    const audienceBtn = document.createElement('button');
    audienceBtn.setAttribute('role', 'switch');
    audienceBtn.setAttribute('aria-checked', 'false');
    audienceBtn.setAttribute('data-toggle-type', 'audience');
    audienceBtn.setAttribute('tabindex', '0');
    audienceBtn.textContent = '👤';
    audienceBtn.addEventListener('click', (e) => this._handleToggle('audience', e));
    audienceBtn.addEventListener('keydown', (e) => this._handleKeydown('audience', e));
    this.appendChild(audienceBtn);

    // Aria-live announcer region
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('class', 'sr-only');
    announcer.textContent = '';
    this.appendChild(announcer);

    this._announcer = announcer;
  }

  /** Sync toggle states from current module values */
  _syncState() {
    const themeBtn = this.querySelector('[data-toggle-type="theme"]');
    const localeBtn = this.querySelector('[data-toggle-type="locale"]');
    const audienceBtn = this.querySelector('[data-toggle-type="audience"]');

    // Theme: dark = checked
    const currentTheme = getTheme();
    themeBtn.setAttribute('aria-checked', currentTheme === 'dark' ? 'true' : 'false');

    // Locale: en = checked
    const currentLocale = document.documentElement.lang || 'es';
    localeBtn.setAttribute('aria-checked', currentLocale === 'en' ? 'true' : 'false');

    // Audience: empresa = checked
    const currentAudience = getAudience();
    audienceBtn.setAttribute('aria-checked', currentAudience === 'empresa' ? 'true' : 'false');
  }

  /** Handle keyboard activation — Space and Enter only */
  _handleKeydown(type, event) {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this._handleToggle(type, event);
    }
  }

  /** Core toggle logic for all three types */
  _handleToggle(type, event) {
    let newValue;

    switch (type) {
      case 'theme': {
        toggleTheme();
        newValue = getTheme();
        const btn = this.querySelector('[data-toggle-type="theme"]');
        btn.setAttribute('aria-checked', newValue === 'dark' ? 'true' : 'false');
        break;
      }

      case 'locale': {
        const currentLang = document.documentElement.lang || 'es';
        newValue = currentLang === 'es' ? 'en' : 'es';
        document.documentElement.lang = newValue;
        localStorage.setItem('mdg_locale', newValue);
        window.dispatchEvent(new CustomEvent('langchange', { detail: { locale: newValue } }));
        const btn = this.querySelector('[data-toggle-type="locale"]');
        btn.setAttribute('aria-checked', newValue === 'en' ? 'true' : 'false');
        break;
      }

      case 'audience': {
        const btn = this.querySelector('[data-toggle-type="audience"]');
        const wasChecked = btn.getAttribute('aria-checked') === 'true';
        // Toggle: if was empresa (checked), switch to persona; otherwise empresa
        newValue = wasChecked ? 'persona' : 'empresa';
        setAudience(newValue, 'toggle');
        // Re-read in case setAudience transforms the value
        newValue = getAudience();
        document.documentElement.dataset.audience = newValue;
        btn.setAttribute('aria-checked', newValue === 'empresa' ? 'true' : 'false');
        break;
      }
    }

    // Update announcer
    if (this._announcer) {
      this._announcer.textContent = `${type} changed to ${newValue}`;
    }

    // Emit state-changed event
    this.dispatchEvent(
      new CustomEvent('mdg:state-changed', {
        detail: { type, value: newValue },
        bubbles: true,
      })
    );
  }
}

customElements.define('triple-toggle', TripleToggle);

export { TripleToggle };
