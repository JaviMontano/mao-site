/**
 * TripleToggle Web Component
 * Fixed bottom-right pill with theme / locale / audience toggles.
 * Inline Lucide SVG icons — no emojis.
 */

import { getTheme, toggleTheme } from '../js/theme/toggle.js?v=3';
import { getAudience, setAudience } from '../js/audience/state.js';
import { emit } from '../js/state/bus.js';

// Lucide icons inline SVG (18x18, stroke-width 2)
const ICON_SUN = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
const ICON_MOON = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
const ICON_GLOBE = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`;
const ICON_USER = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
const ICON_BUILDING = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>`;

class TripleToggle extends HTMLElement {
  connectedCallback() {
    this._render();
    this._syncState();
  }

  _render() {
    // Theme toggle
    const themeBtn = document.createElement('button');
    themeBtn.setAttribute('role', 'switch');
    themeBtn.setAttribute('aria-checked', 'false');
    themeBtn.setAttribute('aria-label', 'Tema claro/oscuro');
    themeBtn.setAttribute('data-toggle-type', 'theme');
    themeBtn.setAttribute('tabindex', '0');
    themeBtn.classList.add('toggle-btn');
    themeBtn.innerHTML = getTheme() === 'dark' ? ICON_SUN : ICON_MOON;
    themeBtn.addEventListener('click', (e) => this._handleToggle('theme', e));
    themeBtn.addEventListener('keydown', (e) => this._handleKeydown('theme', e));
    this.appendChild(themeBtn);

    // Locale toggle
    const localeBtn = document.createElement('button');
    localeBtn.setAttribute('role', 'switch');
    localeBtn.setAttribute('aria-checked', 'false');
    localeBtn.setAttribute('aria-label', 'Idioma ES/EN');
    localeBtn.setAttribute('data-toggle-type', 'locale');
    localeBtn.setAttribute('tabindex', '0');
    localeBtn.classList.add('toggle-btn');
    localeBtn.innerHTML = ICON_GLOBE;
    localeBtn.addEventListener('click', (e) => this._handleToggle('locale', e));
    localeBtn.addEventListener('keydown', (e) => this._handleKeydown('locale', e));
    this.appendChild(localeBtn);

    // Audience toggle
    const audienceBtn = document.createElement('button');
    audienceBtn.setAttribute('role', 'switch');
    audienceBtn.setAttribute('aria-checked', 'false');
    audienceBtn.setAttribute('aria-label', 'Audiencia persona/empresa');
    audienceBtn.setAttribute('data-toggle-type', 'audience');
    audienceBtn.setAttribute('tabindex', '0');
    audienceBtn.classList.add('toggle-btn');
    audienceBtn.innerHTML = getAudience() === 'empresa' ? ICON_BUILDING : ICON_USER;
    audienceBtn.addEventListener('click', (e) => this._handleToggle('audience', e));
    audienceBtn.addEventListener('keydown', (e) => this._handleKeydown('audience', e));
    this.appendChild(audienceBtn);

    // Aria-live announcer
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('class', 'sr-only');
    this.appendChild(announcer);
    this._announcer = announcer;
  }

  _syncState() {
    const themeBtn = this.querySelector('[data-toggle-type="theme"]');
    const localeBtn = this.querySelector('[data-toggle-type="locale"]');
    const audienceBtn = this.querySelector('[data-toggle-type="audience"]');

    const currentTheme = getTheme();
    themeBtn.setAttribute('aria-checked', currentTheme === 'dark' ? 'true' : 'false');
    themeBtn.innerHTML = currentTheme === 'dark' ? ICON_SUN : ICON_MOON;

    const currentLocale = document.documentElement.lang || 'es';
    localeBtn.setAttribute('aria-checked', currentLocale === 'en' ? 'true' : 'false');

    const currentAudience = getAudience();
    audienceBtn.setAttribute('aria-checked', currentAudience === 'empresa' ? 'true' : 'false');
    audienceBtn.innerHTML = currentAudience === 'empresa' ? ICON_BUILDING : ICON_USER;
  }

  _handleKeydown(type, event) {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this._handleToggle(type, event);
    }
  }

  _handleToggle(type, event) {
    let newValue;

    switch (type) {
      case 'theme': {
        toggleTheme();
        newValue = getTheme();
        const btn = this.querySelector('[data-toggle-type="theme"]');
        btn.setAttribute('aria-checked', newValue === 'dark' ? 'true' : 'false');
        btn.innerHTML = newValue === 'dark' ? ICON_SUN : ICON_MOON;
        break;
      }

      case 'locale': {
        const currentLang = document.documentElement.lang || 'es';
        newValue = currentLang === 'es' ? 'en' : 'es';
        document.documentElement.lang = newValue;
        localStorage.setItem('mdg_locale', newValue);
        emit('langchange', { locale: newValue });
        const btn = this.querySelector('[data-toggle-type="locale"]');
        btn.setAttribute('aria-checked', newValue === 'en' ? 'true' : 'false');
        break;
      }

      case 'audience': {
        const btn = this.querySelector('[data-toggle-type="audience"]');
        const wasChecked = btn.getAttribute('aria-checked') === 'true';
        newValue = wasChecked ? 'persona' : 'empresa';
        setAudience(newValue, 'toggle');
        newValue = getAudience();
        document.documentElement.dataset.audience = newValue;
        btn.setAttribute('aria-checked', newValue === 'empresa' ? 'true' : 'false');
        btn.innerHTML = newValue === 'empresa' ? ICON_BUILDING : ICON_USER;
        break;
      }
    }

    if (this._announcer) {
      this._announcer.textContent = `${type} changed to ${newValue}`;
    }

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
