/**
 * components/ConsentBanner.js
 * LGPD analytics consent banner — Web Component.
 *
 * Shows a fixed bottom bar when no consent cookie exists.
 * Accept / Decline buttons persist the choice via consent.js.
 */

import { shouldShowBanner, setAnalyticsConsent } from '../js/analytics/consent.js';

const TEXTS = {
  es: {
    message: 'Usamos cookies analíticas para mejorar tu experiencia. ¿Aceptas?',
    accept: 'Aceptar',
    decline: 'Rechazar',
  },
  en: {
    message: 'We use analytics cookies to improve your experience. Do you accept?',
    accept: 'Accept',
    decline: 'Decline',
  },
};

class ConsentBanner extends HTMLElement {
  connectedCallback() {
    if (!shouldShowBanner()) return;
    this._render();
    this.show();
  }

  /** Show the banner and trap focus. */
  show() {
    this.style.display = 'block';
    const btn = this.querySelector('[data-action="accept"]');
    if (btn) btn.focus();
  }

  /** Hide the banner. */
  hide() {
    this.style.display = 'none';
  }

  /** @private */
  _getLang() {
    const lang = document.documentElement.lang || navigator.language || 'es';
    return lang.startsWith('en') ? 'en' : 'es';
  }

  /** @private */
  _render() {
    const t = TEXTS[this._getLang()];

    this.setAttribute('role', 'dialog');
    this.setAttribute('aria-label', t.message);
    this.style.cssText = [
      'position:fixed', 'bottom:0', 'left:0', 'right:0', 'z-index:9999',
      'background:#1a1a2e', 'color:#fff', 'padding:1rem',
      'display:none', 'font-family:sans-serif',
    ].join(';');

    this.innerHTML = `
      <div style="max-width:960px;margin:0 auto;display:flex;align-items:center;gap:1rem;flex-wrap:wrap;justify-content:center">
        <p style="margin:0;flex:1 1 300px;text-align:center;font-size:0.95rem">${t.message}</p>
        <div style="display:flex;gap:0.5rem">
          <button data-action="accept"
            style="padding:0.5rem 1.25rem;border:none;border-radius:4px;background:#00c9a7;color:#1a1a2e;font-weight:600;cursor:pointer">
            ${t.accept}
          </button>
          <button data-action="decline"
            style="padding:0.5rem 1.25rem;border:1px solid #fff;border-radius:4px;background:transparent;color:#fff;cursor:pointer">
            ${t.decline}
          </button>
        </div>
      </div>`;

    this.addEventListener('click', (e) => {
      const action = e.target.dataset?.action;
      if (action === 'accept') { setAnalyticsConsent(true); this.hide(); }
      if (action === 'decline') { setAnalyticsConsent(false); this.hide(); }
    });

    // Simple focus trap: Tab cycles between the two buttons
    this.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const btns = [...this.querySelectorAll('button')];
      if (!btns.length) return;
      const first = btns[0];
      const last = btns[btns.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    });
  }
}

customElements.define('consent-banner', ConsentBanner);

export default ConsentBanner;
