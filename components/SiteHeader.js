/**
 * SiteHeader — Simplified NeoSwiss header (T035)
 * Logo + 3 nav items (Ruta gold CTA, Servicios, Contacto) + hamburger (mobile)
 * No toggles, no floating nav, no segment switcher.
 * Styles: estilos/blueprint.css (.site-header)
 * i18n: data-i18n attributes, reads document.documentElement.lang
 *
 * @license Copyleft
 * @copyright MetodologIA
 */

const HEADER_I18N = {
  es: { ruta: 'Ruta', servicios: 'Servicios', contacto: 'Contacto' },
  en: { ruta: 'Path', servicios: 'Services', contacto: 'Contact' }
};

class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setupHamburger();
  }

  /** Resolve current language from <html lang="..."> or default to 'es' */
  get lang() {
    const l = (document.documentElement.lang || 'es').slice(0, 2).toLowerCase();
    return HEADER_I18N[l] ? l : 'es';
  }

  render() {
    const t = HEADER_I18N[this.lang];

    this.innerHTML = /* html */ `
      <header class="site-header" role="banner">
        <nav class="site-header__nav" aria-label="Principal">
          <!-- Logo -->
          <a href="/" class="site-header__logo" aria-label="MetodologIA — Inicio">
            <span class="site-header__logo-text">
              <span class="site-header__logo-metodolog">Metodolog</span><span class="site-header__logo-ia">IA</span>
            </span>
          </a>

          <!-- Desktop nav links -->
          <ul class="site-header__links" role="list">
            <li>
              <a href="/diagnostico/" class="site-header__cta-gold" data-i18n="nav.ruta">${t.ruta}</a>
            </li>
            <li>
              <a href="/programas/" class="site-header__link" data-i18n="nav.servicios">${t.servicios}</a>
            </li>
            <li>
              <a href="/contacto/" class="site-header__link" data-i18n="nav.contacto">${t.contacto}</a>
            </li>
          </ul>

          <!-- Hamburger (mobile <960px) -->
          <button
            class="site-header__hamburger"
            type="button"
            aria-label="Abrir menú"
            aria-expanded="false"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round"
                 stroke-linejoin="round" aria-hidden="true">
              <line x1="4" x2="20" y1="6"  y2="6"/>
              <line x1="4" x2="20" y1="12" y2="12"/>
              <line x1="4" x2="20" y1="18" y2="18"/>
            </svg>
          </button>
        </nav>
      </header>
    `;
  }

  setupHamburger() {
    const btn = this.querySelector('.site-header__hamburger');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      this.dispatchEvent(
        new CustomEvent('mdg:sidebar-toggle', { bubbles: true, composed: true })
      );
    });
  }
}

if (!customElements.get('site-header')) {
  customElements.define('site-header', SiteHeader);
}
