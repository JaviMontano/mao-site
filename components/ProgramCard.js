/**
 * ProgramCard.js — Web Component for educational program cards.
 * Displays: name_i18n, audiencia, duracion, resultado_i18n, CTA href.
 *
 * Attributes:
 *   name-es, name-en    — Program name per locale
 *   audiencia            — "persona" | "empresa" | "ambos"
 *   duracion             — Duration string (e.g. "8 semanas")
 *   resultado-es, resultado-en — Expected result per locale
 *   cta-href             — Link target for the CTA button
 *   cta-text-es, cta-text-en — CTA label per locale
 *
 * Traceability: [TS-022, TS-023]
 */

class ProgramCard extends HTMLElement {
  static get observedAttributes() {
    return [
      'name-es', 'name-en', 'audiencia', 'duracion',
      'resultado-es', 'resultado-en',
      'cta-href', 'cta-text-es', 'cta-text-en',
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this._langObs = () => this.render();
    document.addEventListener('langchange', this._langObs);
  }

  disconnectedCallback() {
    document.removeEventListener('langchange', this._langObs);
  }

  attributeChangedCallback() {
    if (this.isConnected) this.render();
  }

  get locale() {
    return document.documentElement.lang || 'es';
  }

  render() {
    const lang = this.locale;
    const name = this.getAttribute(`name-${lang}`) || this.getAttribute('name-es') || '';
    const audiencia = this.getAttribute('audiencia') || 'ambos';
    const duracion = this.getAttribute('duracion') || '';
    const resultado = this.getAttribute(`resultado-${lang}`) || this.getAttribute('resultado-es') || '';
    const ctaHref = this.getAttribute('cta-href') || 'ruta/index.html';
    const ctaText = this.getAttribute(`cta-text-${lang}`) || this.getAttribute('cta-text-es') || (lang === 'en' ? 'Learn more' : 'Saber mas');

    const tagLabel = audiencia === 'persona' ? (lang === 'en' ? 'Individuals' : 'Personas')
      : audiencia === 'empresa' ? (lang === 'en' ? 'Companies' : 'Empresas')
      : (lang === 'en' ? 'Both' : 'Ambos');

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        .card {
          border: 1px solid var(--ns-border, #e5e7eb);
          border-radius: var(--ns-radius-md, 12px);
          padding: 1.5rem;
          background: var(--ns-bg-card, #fff);
          display: flex; flex-direction: column; gap: 0.75rem;
        }
        .card__name { font-size: 1.25rem; font-weight: 700; margin: 0; color: var(--ns-text, #111); }
        .card__tag { display: inline-block; font-size: 0.75rem; font-weight: 600; padding: 0.25rem 0.75rem;
          border-radius: 9999px; background: var(--ns-gold, #eab308); color: #000; }
        .card__meta { font-size: 0.875rem; color: var(--ns-text-sec, #6b7280); }
        .card__resultado { font-size: 0.9375rem; color: var(--ns-text, #111); }
        .card__cta { display: inline-block; margin-top: auto; padding: 0.625rem 1.25rem; font-weight: 600;
          border-radius: var(--ns-radius-sm, 8px); background: var(--ns-navy, #1e293b); color: #fff;
          text-decoration: none; text-align: center; transition: opacity 200ms; }
        .card__cta:hover { opacity: 0.85; }
      </style>
      <article class="card" data-audience-variant="${audiencia}">
        <h3 class="card__name">${name}</h3>
        <span class="card__tag">${tagLabel}</span>
        ${duracion ? `<p class="card__meta">${duracion}</p>` : ''}
        ${resultado ? `<p class="card__resultado">${resultado}</p>` : ''}
        <a class="card__cta" href="${ctaHref}">${ctaText}</a>
      </article>
    `;
  }
}

customElements.define('program-card', ProgramCard);
export default ProgramCard;
