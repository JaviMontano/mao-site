/**
 * SiteHeader — Canonical NeoSwiss header matching Montano_Javier_Canonical.html
 * Uses exact class names from neoswiss-system.css:
 *   .site-header, .menu-toggle, .site-header__brand, .site-header__logo-wrap,
 *   .site-header__text, .site-header__name, .site-header__role,
 *   .theme-toggle, .site-header__cta
 *
 * @license Copyleft
 * @copyright MetodologIA
 */

import { getTheme, toggleTheme } from '../js/theme/toggle.js';

const LOGO_SVG = `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="MetodologIA">
  <defs><linearGradient id="hdrGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0A122A"/><stop offset="100%" stop-color="#1e293b"/></linearGradient></defs>
  <rect width="36" height="36" rx="10" fill="url(#hdrGrad)"/>
  <path d="M10 12h3v12h-3V12zm6 0h3v8h-3v-8zm0 10h3v2h-3v-2zm6-10h3v6h-3v-6zm0 8h3v4h-3v-4z" fill="white"/>
  <circle cx="18" cy="8" r="2" fill="#FFD700"/>
</svg>`;

const SUN_SVG = `<svg class="theme-toggle__sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;

const MOON_SVG = `<svg class="theme-toggle__moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

const I18N = {
  es: { cta: 'Primera Conversación', ctaShort: 'Contacto', role: 'Success', roleBrand: '· as a Service' },
  en: { cta: 'First Conversation', ctaShort: 'Contact', role: 'Success', roleBrand: '· as a Service' },
};

class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.classList.add('site-header');
    this.setAttribute('role', 'banner');
    this._render();
    this._setupEvents();
  }

  get lang() {
    const l = (document.documentElement.lang || 'es').slice(0, 2).toLowerCase();
    return I18N[l] ? l : 'es';
  }

  _render() {
    const t = I18N[this.lang];
    this.innerHTML = `
      <button class="menu-toggle" id="menuToggle" type="button"
              aria-expanded="false" aria-controls="sidebar" aria-label="Abrir navegación">
        <span></span><span></span><span></span>
      </button>

      <a href="/" class="site-header__brand" aria-label="MetodologIA — Inicio">
        <span class="site-header__logo-wrap" aria-hidden="true">${LOGO_SVG}</span>
        <span class="site-header__text">
          <span class="site-header__name">MetodologIA</span>
          <span class="site-header__role">${t.role} <span class="site-header__role-brand">${t.roleBrand}</span></span>
        </span>
      </a>

      <button class="theme-toggle" type="button" aria-label="Cambiar tema">
        ${MOON_SVG}${SUN_SVG}
      </button>

      <a class="site-header__cta" href="/diagnostico/">
        <span class="site-header__cta-long">${t.cta}</span>
        <span class="site-header__cta-short">${t.ctaShort}</span>
      </a>
    `;
  }

  _setupEvents() {
    // Menu toggle → sidebar
    const menuBtn = this.querySelector('.menu-toggle');
    if (menuBtn) {
      menuBtn.addEventListener('click', () => {
        const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
        menuBtn.setAttribute('aria-expanded', String(!expanded));
        this.dispatchEvent(new CustomEvent('mdg:sidebar-toggle', { bubbles: true, composed: true }));
      });
    }

    // Theme toggle
    const themeBtn = this.querySelector('.theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        toggleTheme();
      });
    }
  }
}

if (!customElements.get('site-header')) {
  customElements.define('site-header', SiteHeader);
}
