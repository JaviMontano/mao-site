/**
  @license Copyleft
  @copyright MetodologIA
  @author Javier Montaño
  @author Germán Eliécer Sepúlveda
  @technology Antigravity | GoogleAI Studio | Gemini 3 Pro | Gemini 3 Flash
  @poweredBy Pristino Agent
 */

class SiteHeader extends HTMLElement {
    constructor() {
        super();
        this._floatingNav = null;
        this._scrollHandler = null;
    }

    connectedCallback() {
        const basePath = this.getAttribute('base-path') || '.';
        this.render();
        this.loadCTAHandler(basePath);
        this.loadI18n(basePath);
        this.hydrateIcons();
    }

    disconnectedCallback() {
        if (this._scrollHandler) {
            window.removeEventListener('scroll', this._scrollHandler);
            this._scrollHandler = null;
        }
        if (this._floatingNav && this._floatingNav.parentNode) {
            this._floatingNav.parentNode.removeChild(this._floatingNav);
            this._floatingNav = null;
        }
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

    loadCTAHandler(basePath) {
        if (!window.ctaHandlerLoaded) {
            const script = document.createElement('script');
            script.src = `${basePath}/js/CTAHandler.js`;
            script.defer = true;
            document.head.appendChild(script);
            window.ctaHandlerLoaded = true;
        }
    }

    loadI18n(basePath) {
        if (this.hasAttribute('data-skip-i18n')) return;
        if (!window.i18nLoaded) {
            const script = document.createElement('script');
            script.src = `${basePath}/js/i18n/i18n.js`;
            document.head.appendChild(script);
            window.i18nLoaded = true;
        }
    }

    render() {
        const basePath = this.getAttribute('base-path') || '.';
        const currentPath = window.location.pathname;
        this.innerHTML = `
        <nav class="premium-nav" data-i18n-aria-label="nav.menu_label">
            <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[10001] focus:px-4 focus:py-2 focus:bg-brand-gold focus:text-black focus:rounded-lg focus:font-bold focus:text-sm" data-i18n="nav.skip">Saltar al contenido principal</a>
            <div class="nav-container">
                <!-- Left: Logo + Tagline -->
                <div class="nav-brand">
                    <a href="${basePath}/index.html" class="nav-logo-link" aria-label="Ir al inicio de MetodologIA">
                        <svg width="34" height="34" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" class="logo-svg" role="img" aria-labelledby="logoTitle">
                            <title id="logoTitle">Logo MetodologIA</title>
                            <defs>
                                <linearGradient id="logoGradientPremium" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stop-color="var(--bg-primary)" stop-opacity="1" />
                                    <stop offset="100%" stop-color="var(--bg-surface)" stop-opacity="1" />
                                </linearGradient>
                                <filter id="logoGlow" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                                    <feMerge>
                                        <feMergeNode in="coloredBlur"/>
                                        <feMergeNode in="SourceGraphic"/>
                                    </feMerge>
                                </filter>
                            </defs>
                            <rect width="36" height="36" rx="10" fill="url(#logoGradientPremium)" filter="url(#logoGlow)"/>
                            <path d="M10 12h3v12h-3V12zm6 0h3v8h-3v-8zm0 10h3v2h-3v-2zm6-10h3v6h-3v-6zm0 8h3v4h-3v-4z" fill="white"/>
                            <circle cx="18" cy="8" r="2" fill="var(--brand-gold)"/>
                        </svg>
                        <h1><span class="highlight-metodologia">Metodolog</span><span class="highlight-ia-premium">IA</span></h1>
                    </a>
                    <div class="nav-tagline-modern">
                        <span class="tagline-text">
                            <span class="highlight-ia-yellow" data-i18n="tagline.prefix">Aceleremos</span> <span data-i18n="tagline.suffix">su Estrateg</span><span class="highlight-ia-premium">IA</span>
                        </span>
                    </div>
                </div>

                <!-- Language Toggle -->
                <div class="lang-toggle" role="radiogroup" aria-label="Idioma / Language">
                    <button class="lang-toggle__btn active" data-lang="es" aria-pressed="true" type="button">ES</button>
                    <button class="lang-toggle__btn" data-lang="en" aria-pressed="false" type="button">EN</button>
                </div>

                <!-- Center: Navigation Links -->
                <div class="hidden lg:flex items-center gap-5" role="menubar">
                    <a href="${basePath}/ruta/index.html" class="nav-link ${this.isActive(currentPath, 'ruta')}" role="menuitem" data-i18n="nav.ruta">Ruta de (R)Evolución</a>
                    <a href="${basePath}/recursos/index.html" class="nav-link ${this.isActive(currentPath, 'recursos')}" role="menuitem" data-i18n="nav.recursos">Recursos</a>
                    <a href="${basePath}/servicios/index.html" class="nav-link ${this.isActive(currentPath, 'servicios')}" role="menuitem" data-i18n="nav.servicios">Servicios</a>
                    <a href="${basePath}/contacto/index.html" class="nav-link ${this.isActive(currentPath, 'contacto')}" role="menuitem" data-i18n="nav.contacto">Contacto</a>
                </div>

                <!-- Right Actions -->
                <div class="hidden md:flex items-center gap-4">
                     <a href="https://campus.metodologia.info" target="_blank" rel="noopener noreferrer" class="text-sm text-slate-100 hover:text-brand-gold transition-colors flex items-center gap-1" aria-label="Acceder al Campus (abre en nueva pestaña)">
                        <span data-i18n="nav.campus">Campus</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-50" aria-hidden="true"><path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/><path d="m21 3-9 9"/><path d="M15 3h6v6"/></svg>
                    </a>
                    <a href="${basePath}/contacto/index.html" class="nav-cta-glow" data-i18n="nav.cta">
                        Primera Conversación
                    </a>
                </div>

                <!-- Mobile Menu Button -->
                <button class="mobile-menu-btn md:hidden" data-i18n-aria-label="nav.menu_open" aria-label="Abrir menú de navegación" id="header-menu-toggle" aria-expanded="false" aria-controls="mobile-nav-overlay">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                </button>
            </div>
            <!-- Animated Gold Underline -->
            <div class="nav-glow-line"></div>

            <!-- Mobile Menu Overlay (Hidden by default) -->
            <div id="mobile-nav-overlay" class="mobile-menu hidden absolute top-full left-0 w-full bg-[var(--bg-primary)]/95 backdrop-blur-xl border-b border-white/10 p-6 flex-col gap-4 lg:hidden" role="menu">
                 <!-- Mobile Language Toggle -->
                 <div class="lang-toggle lang-toggle--mobile" role="radiogroup" aria-label="Idioma / Language">
                     <button class="lang-toggle__btn active" data-lang="es" aria-pressed="true" type="button">ES</button>
                     <button class="lang-toggle__btn" data-lang="en" aria-pressed="false" type="button">EN</button>
                 </div>
                 <a href="${basePath}/ruta/index.html" class="text-white font-medium py-2" role="menuitem" data-i18n="nav.ruta">Ruta de (R)Evolución</a>
                 <a href="${basePath}/recursos/index.html" class="text-white font-medium py-2" role="menuitem" data-i18n="nav.recursos">Recursos</a>
                 <a href="${basePath}/servicios/index.html" class="text-white font-medium py-2" role="menuitem" data-i18n="nav.servicios">Servicios</a>
                 <a href="${basePath}/contacto/index.html" class="text-white font-medium py-2" role="menuitem" data-i18n="nav.contacto">Contacto</a>
            </div>
        </nav>
        `;

        const initInteractivity = () => {
            this.setupInteractivity();
            this.setupLangToggle();
            this.setupFloatingNav(basePath);
        };

        if (document.readyState === 'complete') {
            this.handleHydration(initInteractivity);
        } else {
            window.addEventListener('load', () => this.handleHydration(initInteractivity));
        }
    }

    handleHydration(callback) {
        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(callback);
        } else {
            setTimeout(callback, 16);
        }
    }

    setupInteractivity() {
        const main = document.querySelector('main');
        if (main && !main.id) main.id = 'main-content';

        const menuBtn = this.querySelector('#header-menu-toggle');
        const mobileMenu = this.querySelector('.mobile-menu');

        if (menuBtn && mobileMenu) {
            menuBtn.replaceWith(menuBtn.cloneNode(true));
            const newBtn = this.querySelector('#header-menu-toggle');
            newBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const isOpen = !mobileMenu.classList.contains('hidden');
                mobileMenu.classList.toggle('hidden');
                mobileMenu.classList.toggle('flex');
                newBtn.setAttribute('aria-expanded', String(!isOpen));
            });
        }
    }

    setupLangToggle() {
        const toggles = this.querySelectorAll('.lang-toggle__btn');
        toggles.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                if (window.i18n && window.i18n.setLang) {
                    window.i18n.setLang(lang);
                }
                // Sync all toggle buttons (desktop + mobile)
                document.querySelectorAll('.lang-toggle__btn').forEach(b => {
                    const isActive = b.getAttribute('data-lang') === lang;
                    b.classList.toggle('active', isActive);
                    b.setAttribute('aria-pressed', String(isActive));
                });
            });
        });
    }

    setupFloatingNav(basePath) {
        // Detect page sections: <section id="...">, <h2 id="...">, or
        // headings inside sections
        const sections = this.detectSections();
        if (sections.length === 0) return;

        // Derive per-page nav key prefix from URL path
        const pagePrefix = this.getNavKeyPrefix();

        // Build floating nav element
        const nav = document.createElement('div');
        nav.className = 'floating-nav';
        nav.setAttribute('role', 'navigation');
        nav.setAttribute('aria-label', 'Navegación de secciones');
        nav.setAttribute('data-i18n-aria-label', pagePrefix + '.nav.sections_label');

        // Home/logo pill
        nav.innerHTML = `
            <a href="${basePath}/index.html" class="floating-nav__home" aria-label="Inicio" title="Inicio" data-i18n-aria-label="${pagePrefix}.nav.home" data-i18n-title="${pagePrefix}.nav.home">
                <svg width="14" height="14" viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx="10" fill="currentColor" opacity="0.15"/><path d="M10 12h3v12h-3V12zm6 0h3v8h-3v-8zm0 10h3v2h-3v-2zm6-10h3v6h-3v-6zm0 8h3v4h-3v-4z" fill="currentColor"/></svg>
            </a>
            <div class="floating-nav__divider"></div>
        `;

        // Section links
        sections.forEach(s => {
            const link = document.createElement('a');
            link.href = `#${s.id}`;
            link.className = 'floating-nav__link';
            link.textContent = s.label;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.getElementById(s.id);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    history.replaceState(null, '', `#${s.id}`);
                }
            });
            nav.appendChild(link);
        });

        document.body.appendChild(nav);
        this._floatingNav = nav;

        // Re-read heading text into floating nav links on language change
        document.addEventListener('langchange', () => {
            const links = nav.querySelectorAll('.floating-nav__link');
            links.forEach((link, i) => {
                if (i < sections.length) {
                    const el = sections[i].el || document.getElementById(sections[i].id);
                    if (el) {
                        const heading = el.tagName.match(/^H[2-6]$/i)
                            ? el
                            : el.querySelector('h2, h3');
                        if (heading) {
                            link.textContent = heading.textContent.trim().substring(0, 24);
                        }
                    }
                }
            });
            // Re-translate floating nav's own data-i18n-* attributes
            if (window.i18n && window.i18n.translate) {
                window.i18n.translate(nav);
            }
        });

        // Scroll logic: show floating nav when header is out of view
        const headerEl = this.querySelector('.premium-nav');
        let ticking = false;

        this._scrollHandler = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                const headerBottom = headerEl.getBoundingClientRect().bottom;
                const shouldShow = headerBottom < -10;
                nav.classList.toggle('visible', shouldShow);

                // Update active section
                if (shouldShow) {
                    this.updateActiveSection(nav, sections);
                }
                ticking = false;
            });
        };

        window.addEventListener('scroll', this._scrollHandler, { passive: true });
    }

    detectSections() {
        const sections = [];
        const seen = new Set();

        // Strategy 1: <section id="..."> with readable label
        document.querySelectorAll('section[id]').forEach(el => {
            const id = el.id;
            if (seen.has(id) || id === 'main-content') return;
            const heading = el.querySelector('h2, h3');
            const label = heading
                ? heading.textContent.trim().substring(0, 24)
                : this.idToLabel(id);
            if (label) {
                sections.push({ id, label, el });
                seen.add(id);
            }
        });

        // Strategy 2: Headings with IDs (h2[id], h3[id])
        document.querySelectorAll('h2[id], h3[id]').forEach(el => {
            const id = el.id;
            if (seen.has(id)) return;
            const label = el.textContent.trim().substring(0, 24);
            if (label) {
                sections.push({ id, label, el });
                seen.add(id);
            }
        });

        // Strategy 3: If no IDs found, auto-assign IDs to main h2s
        if (sections.length === 0) {
            const main = document.querySelector('main');
            if (main) {
                main.querySelectorAll('h2').forEach((el, i) => {
                    const text = el.textContent.trim();
                    if (!text || text.length < 3) return;
                    const id = `section-${i}`;
                    el.id = id;
                    sections.push({
                        id,
                        label: text.substring(0, 24),
                        el
                    });
                });
            }
        }

        return sections.slice(0, 8); // Max 8 for usability
    }

    idToLabel(id) {
        return id
            .replace(/[-_]/g, ' ')
            .replace(/\b\w/g, c => c.toUpperCase())
            .substring(0, 24);
    }

    getNavKeyPrefix() {
        const path = window.location.pathname;
        if (path.endsWith('/index.html') || path.endsWith('/')) {
            const segments = path.replace(/\/index\.html$/, '').replace(/\/$/, '').split('/').filter(Boolean);
            if (segments.length === 0) return 'home';
            return segments[0];
        }
        const segments = path.split('/').filter(Boolean);
        if (segments.length === 0) return 'home';
        return segments[0];
    }

    updateActiveSection(nav, sections) {
        const links = nav.querySelectorAll('.floating-nav__link');
        let activeIndex = -1;
        const scrollY = window.scrollY + 100;

        for (let i = sections.length - 1; i >= 0; i--) {
            const el = sections[i].el || document.getElementById(sections[i].id);
            if (el && el.getBoundingClientRect().top + window.scrollY <= scrollY) {
                activeIndex = i;
                break;
            }
        }

        links.forEach((link, i) => {
            link.classList.toggle('active', i === activeIndex);
        });
    }

    isActive(current, path) {
        const targetPath = `/${path}/index.html`;
        const targetPathSlash = `/${path}/`;

        if (current.endsWith(targetPath) || current.endsWith(targetPathSlash)) {
            return 'text-brand-gold font-semibold';
        }
        return 'text-sm text-slate-100 hover:text-white transition-colors';
    }
}

customElements.define('site-header', SiteHeader);
