/**
 * CTAHandler.js - Motor de Interacción Inteligente para MetodologIA
 * Gestiona dinámicamente los CTAs de correo para reducir fricción y elevar el profesionalismo.
 */

class CTAHandler {
    constructor() {
        this.ctaData = null;
        this.isLoaded = false;
        this._boundClick = null;
        this._boundHover = null;
        this.init();
    }

    async init() {
        try {
            const scripts = document.getElementsByTagName('script');
            let basePath = '.';
            for (const script of scripts) {
                if (script.src.includes('CTAHandler.js')) {
                    basePath = script.src.substring(0, script.src.lastIndexOf('/'));
                    break;
                }
            }

            const response = await fetch(`${basePath}/cta-data.json`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            this.ctaData = await response.json();
            this.isLoaded = true;
        } catch (error) {
            console.warn('CTAHandler: cta-data.json no disponible, usando fallback href.');
        } finally {
            this.bindEvents();
        }
    }

    bindEvents() {
        this._boundClick = (e) => {
            const el = e.target.closest('[data-cta]');
            if (!el) return;
            e.preventDefault();
            this.executeCTA(el.getAttribute('data-cta'), el);
        };

        this._boundHover = (e) => {
            const el = e.target.closest('[data-cta]');
            if (!el || el.hasAttribute('title')) return;
            const id = el.getAttribute('data-cta');
            if (this.ctaData && this.ctaData[id]) {
                const prefix = (window.i18n && window.i18n.t('cta.email_tooltip_prefix')) || 'Abrirá tu correo para';
                el.setAttribute('title', `${prefix}: ${this.ctaData[id].subject}`);
            }
        };

        document.addEventListener('click', this._boundClick);
        document.addEventListener('mouseover', this._boundHover);
    }

    executeCTA(id, element, params) {
        if (!this.isLoaded || !this.ctaData || !this.ctaData[id]) {
            const fallback = element.getAttribute('href');
            if (fallback && fallback.startsWith('mailto:')) {
                window.location.href = fallback;
            }
            return;
        }

        const mailtoLink = this.buildMailto(id, params);
        if (!mailtoLink) return;

        this.animateFeedback(element);
        setTimeout(() => { window.location.href = mailtoLink; }, 300);
    }

    buildMailto(id, params) {
        if (!this.ctaData || !this.ctaData[id]) return null;

        const config = this.ctaData[id];
        let subject = config.subject || '';
        let body = config.body || '';

        if (params && typeof params === 'object') {
            for (const [key, value] of Object.entries(params)) {
                const token = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
                subject = subject.replace(token, String(value));
                body = body.replace(token, String(value));
            }
        }

        return `mailto:${config.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }

    animateFeedback(element) {
        element.style.transition = 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
        element.style.transform = 'scale(0.95)';

        const icon = element.querySelector('i[data-lucide], svg');
        if (icon) {
            icon.style.filter = 'drop-shadow(0 0 8px var(--brand-gold-dark))';
        }

        setTimeout(() => { element.style.transform = 'scale(1.05)'; }, 100);
        setTimeout(() => {
            element.style.transform = '';
            if (icon) icon.style.filter = '';
        }, 400);
    }
}

window.ctaHandler = new CTAHandler();
