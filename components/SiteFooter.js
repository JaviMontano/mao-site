/**
 * SiteFooter — Canonical NeoSwiss footer
 *
 * 4-column grid (brand + 3 nav columns) with ecosystem stats bar.
 * Uses neoswiss-system.css classes exclusively (no Tailwind).
 *
 * @license Copyleft
 * @copyright MetodologIA
 */

const FOOTER_I18N = {
  es: {
    col_explorar: 'Explorar',
    col_aprender: 'Aprender',
    col_conectar: 'Conectar',
    home: 'Inicio',
    diagnostico: 'Diagnóstico',
    empresas: 'Empresas',
    personas: 'Personas',
    programas: 'Programas',
    recursos: 'Recursos',
    metodo: 'Método',
    casos: 'Casos de Éxito',
    nosotros: 'Nosotros',
    insights: 'Insights',
    contacto: 'Contacto',
    legal: 'Legal',
    quote: '"La excelencia no se compra, se diseña. Se cocrea y se comparte."',
    copyright: '© 2026 MetodologIA. Copyleft.',
    powered: 'Success as a Service · Powered by Pristino Agent',
    eco_founders: 'Founders',
    eco_ambassadors: 'Embajadores',
    eco_nodes: 'Nodos',
    eco_countries: 'Países',
  },
  en: {
    col_explorar: 'Explore',
    col_aprender: 'Learn',
    col_conectar: 'Connect',
    home: 'Home',
    diagnostico: 'Diagnostic',
    empresas: 'For Companies',
    personas: 'For Individuals',
    programas: 'Programs',
    recursos: 'Resources',
    metodo: 'Methodology',
    casos: 'Case Studies',
    nosotros: 'About Us',
    insights: 'Insights',
    contacto: 'Contact',
    legal: 'Legal',
    quote: '"Excellence is not bought, it is designed. Co-created and shared."',
    copyright: '© 2026 MetodologIA. Copyleft.',
    powered: 'Success as a Service · Powered by Pristino Agent',
    eco_founders: 'Founders',
    eco_ambassadors: 'Ambassadors',
    eco_nodes: 'Nodes',
    eco_countries: 'Countries',
  },
};

function col(title, links) {
  return `
    <nav>
      <div class="site-footer__col-head">${title}</div>
      ${links.map(([href, label]) => `<a class="site-footer__link" href="${href}">${label}</a>`).join('')}
    </nav>`;
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.render();
    document.addEventListener('langchange', () => this.render());
  }

  get lang() {
    const l = (document.documentElement.lang || 'es').slice(0, 2).toLowerCase();
    return FOOTER_I18N[l] ? l : 'es';
  }

  render() {
    const t = FOOTER_I18N[this.lang];

    this.innerHTML = `
    <footer class="site-footer" aria-label="Pie de página">
      <div class="container">
        <div class="site-footer__grid">
          <!-- Brand -->
          <div>
            <div class="site-footer__brand-name">Metodolog<span style="color:var(--brand-gold)">IA</span></div>
            <p class="site-footer__brand-tagline" data-cms="footer.quote">${t.quote}</p>
          </div>

          <!-- Explorar -->
          ${col(t.col_explorar, [
            ['/', t.home],
            ['/diagnostico/', t.diagnostico],
            ['/empresas/', t.empresas],
            ['/personas/', t.personas],
          ])}

          <!-- Aprender -->
          ${col(t.col_aprender, [
            ['/programas/', t.programas],
            ['/recursos/', t.recursos],
            ['/metodo/', t.metodo],
            ['/casos/', t.casos],
          ])}

          <!-- Conectar -->
          ${col(t.col_conectar, [
            ['/nosotros/', t.nosotros],
            ['/insights/', t.insights],
            ['/contacto/', t.contacto],
            ['/legal/', t.legal]
          ])}
        </div>

        <!-- Bottom -->
        <div class="site-footer__bottom">
          <span data-cms="footer.copyright">${t.copyright}</span>
          <span>${t.powered}</span>
        </div>
      </div>
    </footer>
    `;
  }
}

if (!customElements.get('site-footer')) {
  customElements.define('site-footer', SiteFooter);
}
