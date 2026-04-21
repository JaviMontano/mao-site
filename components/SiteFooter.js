/**
 * SiteFooter — 12-page sitemap footer (T067)
 * 3-column link grid covering all 12 canonical pages (no 404).
 * Each link has data-i18n for ES/EN internationalization.
 * Styles: Tailwind utility classes, brand tokens.
 *
 * @license Copyleft
 * @copyright MetodologIA
 */

const FOOTER_I18N = {
  es: {
    // Column headers
    col_explorar: 'Explorar',
    col_aprender: 'Aprender',
    col_conectar: 'Conectar',
    // 12 page labels
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
    // Other
    quote: '"La excelencia no se compra, se diseña. Se cocrea y se comparte."',
    copyright: '© 2026 MetodologIA. Copyleft.',
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
  },
};

class SiteFooter extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.hydrateIcons();
  }

  /** Resolve current language from <html lang="..."> or default to 'es' */
  get lang() {
    const l = (document.documentElement.lang || 'es').slice(0, 2).toLowerCase();
    return FOOTER_I18N[l] ? l : 'es';
  }

  hydrateIcons() {
    const initIcons = () => {
      if (typeof window.icons !== 'undefined' && typeof window.icons.createIcons === 'function') {
        window.icons.createIcons();
      } else {
        setTimeout(() => {
          if (typeof window.icons !== 'undefined') window.icons.createIcons();
        }, 500);
      }
    };

    if (document.readyState === 'complete') {
      initIcons();
    } else {
      window.addEventListener('load', initIcons);
    }
  }

  render() {
    const t = FOOTER_I18N[this.lang];
    const linkClass = 'text-slate-100 hover:text-brand-gold text-sm transition-colors flex items-center gap-2 hover:translate-x-1 duration-300';

    this.innerHTML = `
    <footer class="bg-[var(--bg-primary)] border-t border-white/5 pt-16 pb-8 relative overflow-hidden" aria-label="Pie de página">
        <!-- Glow Effect -->
        <div class="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" aria-hidden="true"></div>

        <div class="container mx-auto px-6 max-w-7xl relative z-10">
            <!-- Links Grid: Brand + 3 columns -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">

                <!-- Brand Column (spans 2) -->
                <div class="lg:col-span-2 space-y-6">
                    <div class="flex items-center gap-4">
                        <svg width="40" height="40" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
                            <defs><linearGradient id="footerGradNew" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="var(--bg-primary)"/><stop offset="100%" stop-color="var(--bg-surface)"/></linearGradient></defs>
                            <rect width="36" height="36" rx="10" fill="url(#footerGradNew)"/>
                            <path d="M10 12h3v12h-3V12zm6 0h3v8h-3v-8zm0 10h3v2h-3v-2zm6-10h3v6h-3v-6zm0 8h3v4h-3v-4z" fill="white"/>
                            <circle cx="18" cy="8" r="2" fill="var(--brand-gold)"/>
                        </svg>
                        <div>
                            <h3 class="text-xl font-bold font-heading"><span class="text-white">Metodolog</span><span class="text-brand-gold font-black">IA</span></h3>
                            <p class="text-slate-200 text-[10px] tracking-[0.2em] uppercase font-bold">Aceleremos su Estrateg<span class="text-brand-gold">IA</span></p>
                        </div>
                    </div>
                    <p class="text-slate-200 text-sm leading-relaxed max-w-sm italic" data-i18n="footer.quote">
                        ${t.quote}
                    </p>
                </div>

                <!-- Column 1: Explorar (Home, Diagnóstico, Empresas, Personas) -->
                <nav class="space-y-4" aria-label="${t.col_explorar}">
                    <h4 class="text-white font-bold text-xs uppercase tracking-widest border-b border-brand-gold/20 pb-2 inline-block" data-i18n="footer.col_explorar">${t.col_explorar}</h4>
                    <ul class="space-y-3">
                        <li><a href="/" class="${linkClass}" data-i18n="footer.home">${t.home}</a></li>
                        <li><a href="/diagnostico/" class="${linkClass}" data-i18n="footer.diagnostico">${t.diagnostico}</a></li>
                        <li><a href="/empresas/" class="${linkClass}" data-i18n="footer.empresas">${t.empresas}</a></li>
                        <li><a href="/personas/" class="${linkClass}" data-i18n="footer.personas">${t.personas}</a></li>
                    </ul>
                </nav>

                <!-- Column 2: Aprender (Programas, Recursos, Método, Casos) -->
                <nav class="space-y-4" aria-label="${t.col_aprender}">
                    <h4 class="text-white font-bold text-xs uppercase tracking-widest border-b border-brand-gold/20 pb-2 inline-block" data-i18n="footer.col_aprender">${t.col_aprender}</h4>
                    <ul class="space-y-3">
                        <li><a href="/programas/" class="${linkClass}" data-i18n="footer.programas">${t.programas}</a></li>
                        <li><a href="/recursos/" class="${linkClass}" data-i18n="footer.recursos">${t.recursos}</a></li>
                        <li><a href="/metodo/" class="${linkClass}" data-i18n="footer.metodo">${t.metodo}</a></li>
                        <li><a href="/casos/" class="${linkClass}" data-i18n="footer.casos">${t.casos}</a></li>
                    </ul>
                </nav>

                <!-- Column 3: Conectar (Nosotros, Insights, Contacto, Legal) -->
                <nav class="space-y-4" aria-label="${t.col_conectar}">
                    <h4 class="text-white font-bold text-xs uppercase tracking-widest border-b border-brand-gold/20 pb-2 inline-block" data-i18n="footer.col_conectar">${t.col_conectar}</h4>
                    <ul class="space-y-3">
                        <li><a href="/nosotros/" class="${linkClass}" data-i18n="footer.nosotros">${t.nosotros}</a></li>
                        <li><a href="/insights/" class="${linkClass}" data-i18n="footer.insights">${t.insights}</a></li>
                        <li><a href="/contacto/" class="${linkClass}" data-i18n="footer.contacto">${t.contacto}</a></li>
                        <li><a href="/legal/" class="${linkClass}" data-i18n="footer.legal">${t.legal}</a></li>
                    </ul>
                </nav>
            </div>

            <!-- Bottom Bar -->
            <div class="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p class="text-xs text-slate-300" data-i18n="footer.copyright">${t.copyright}</p>
                <div class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true"></span>
                    <p class="text-[10px] text-slate-200 font-bold uppercase tracking-wider">
                        Success as a Service <span class="text-slate-600 mx-2">|</span> Powered by Pristino Agent
                    </p>
                </div>
            </div>
        </div>
    </footer>
    `;
  }
}

customElements.define('site-footer', SiteFooter);
