/**
 * SiteHeader — Global site navigation bar
 *
 * Layout: hamburger(mobile) | logo + brand | nav links(desktop) | CTA
 * Nav: Visión, Recursos, Programas, Contacto
 * CTA: "Conversemos"
 *
 * @license Copyleft
 * @copyright MetodologIA
 */

const LOGO_SVG = `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="MetodologIA">
  <defs><linearGradient id="hdrGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0A122A"/><stop offset="100%" stop-color="#1e293b"/></linearGradient></defs>
  <rect width="36" height="36" rx="10" fill="url(#hdrGrad)"/>
  <path d="M10 12h3v12h-3V12zm6 0h3v8h-3v-8zm0 10h3v2h-3v-2zm6-10h3v6h-3v-6zm0 8h3v4h-3v-4z" fill="white"/>
  <circle cx="18" cy="8" r="2" fill="#FFD700"/>
</svg>`;

const I18N = {
  es: {
    cta: 'Conversemos', ctaShort: 'Conversemos',
    nav_metodo: 'Método', nav_recursos: 'Recursos',
    nav_programas: 'Programas', nav_campus: 'Campus',
    nav_contacto: 'Contacto',
    tagline: 'Aceleremos su Estrateg<span style="color:var(--brand-gold);font-weight:900">IA</span>',
    nav_label: 'Navegación principal',
    menu_label: 'Abrir navegación',
  },
  en: {
    cta: "Let's Talk", ctaShort: "Let's Talk",
    nav_metodo: 'Method', nav_recursos: 'Resources',
    nav_programas: 'Programs', nav_campus: 'Campus',
    nav_contacto: 'Contact',
    tagline: "Let's Accelerate your Strateg<span style=\"color:var(--brand-gold);font-weight:900\">yIA</span>",
    nav_label: 'Main navigation',
    menu_label: 'Open navigation',
  },
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
    const path = window.location.pathname;

    const isActive = (href) => {
      if (href === '/') return path === '/' || path === '/index.html';
      return path.startsWith(href);
    };

    const navLink = (href, label) => {
      const active = isActive(href) ? ' site-header__nav-link--active' : '';
      return `<a class="site-header__nav-link${active}" href="${href}">${label}</a>`;
    };

    this.innerHTML = `
      <button class="menu-toggle" id="menuToggle" type="button"
              aria-expanded="false" aria-controls="sidebar" aria-label="${t.menu_label}">
        <span></span><span></span><span></span>
      </button>

      <a href="/" class="site-header__brand" aria-label="MetodologIA — Inicio">
        <span class="site-header__logo-wrap" aria-hidden="true">${LOGO_SVG}</span>
        <span class="site-header__text">
          <span class="site-header__name">Metodolog<span style="color:var(--brand-gold)">IA</span></span>
          <span class="site-header__role">${t.tagline}</span>
        </span>
      </a>

      <nav class="site-header__nav" aria-label="${t.nav_label}">
        ${navLink('/metodo/', t.nav_metodo)}
        ${navLink('/recursos/', t.nav_recursos)}
        ${navLink('/programas/', t.nav_programas)}
        <a class="site-header__nav-link" href="https://campus.metodologia.info" target="_blank" rel="noopener noreferrer">${t.nav_campus}</a>
        ${navLink('/contacto/', t.nav_contacto)}
      </nav>

      <a class="site-header__cta" href="/contacto/">
        ${t.cta} →
      </a>
    `;
  }

  _setupEvents() {
    const menuBtn = this.querySelector('.menu-toggle');
    if (menuBtn) {
      menuBtn.addEventListener('click', () => {
        const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
        menuBtn.setAttribute('aria-expanded', String(!expanded));
        this.dispatchEvent(new CustomEvent('mdg:sidebar-toggle', { bubbles: true, composed: true }));
      });
    }

    // Re-render on language change
    document.addEventListener('langchange', () => {
      this._render();
      this._setupEvents();
    });
  }
}

if (!customElements.get('site-header')) {
  customElements.define('site-header', SiteHeader);
}
