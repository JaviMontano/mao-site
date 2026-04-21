/**
 * DiagnosticStepper — 6-step wizard Web Component (T044)
 * Steps 1-5: multiple-choice questions; Step 6: PII capture form.
 * Result: badge (explorer/builder/strategist) + recommendation CTA.
 * @module components/DiagnosticStepper
 * @copyright MetodologIA | @license Copyleft
 */
import { getQuestions, computeScore, getThreshold, getRecommendation } from '../js/diagnostic/logic.js';

const TOTAL = 6;
const DELAY = 300;
const PII = {
  es: { title: 'Último paso: ¿a dónde enviamos tu resultado?', email: 'Correo electrónico',
    name: 'Nombre', consent: 'Acepto recibir comunicaciones de MetodologIA',
    submit: 'Ver mi resultado', errEmail: 'Ingresa un correo válido', errConsent: 'Debes aceptar para continuar' },
  en: { title: 'Last step: where should we send your result?', email: 'Email address',
    name: 'Name', consent: 'I agree to receive communications from MetodologIA',
    submit: 'See my result', errEmail: 'Enter a valid email', errConsent: 'You must agree to continue' },
};
const RES = {
  es: { heading: 'Tu nivel:', cta: 'Ver recomendación' },
  en: { heading: 'Your level:', cta: 'View recommendation' },
};

class DiagnosticStepper extends HTMLElement {
  #step = 1;
  #answers = {};
  #questions = [];

  get #locale() {
    const l = (document.documentElement.lang || 'es').slice(0, 2).toLowerCase();
    return PII[l] ? l : 'es';
  }

  connectedCallback() {
    this.#questions = getQuestions(this.#locale);
    const aud = new URLSearchParams(window.location.search).get('audiencia');
    if (aud) this.dataset.audiencia = aud;
    this.innerHTML = `<div class="diagnostic-stepper">
      <div class="diagnostic-progress" data-step="1" role="progressbar"
           aria-valuenow="1" aria-valuemin="1" aria-valuemax="${TOTAL}">
        <div class="diagnostic-progress__fill"></div>
      </div>
      <p class="diagnostic-progress__label">1 / ${TOTAL}</p>
      <div class="diagnostic-step-container"></div>
    </div>`;
    this.renderStep(1);
  }

  renderStep(n) {
    this.#step = n;
    this.renderProgress(n);
    const box = this.querySelector('.diagnostic-step-container');
    if (!box) return;
    if (n <= 5) {
      const q = this.#questions[n - 1];
      box.innerHTML = `<div class="diagnostic-step is-active" data-step="${n}">
        <h2 class="diagnostic-step__title">${q.prompt}</h2>
        <div class="diagnostic-options">${q.options.map((o) =>
          `<button class="diagnostic-option" data-answer="${o.id}" type="button">${o.label}</button>`
        ).join('')}</div></div>`;
      box.querySelectorAll('.diagnostic-option').forEach((btn) =>
        btn.addEventListener('click', (e) => this.#onOption(e, q.id))
      );
    } else {
      this.#renderPii(box);
    }
  }

  #onOption(e, qId) {
    const btn = e.currentTarget;
    this.#answers[qId] = btn.dataset.answer;
    const wrap = btn.closest('.diagnostic-options');
    wrap.querySelectorAll('.diagnostic-option').forEach((b) => { b.classList.remove('is-selected'); b.disabled = true; });
    btn.classList.add('is-selected');
    setTimeout(() => this.renderStep(this.#step + 1), DELAY);
  }

  #renderPii(box) {
    const t = PII[this.#locale];
    box.innerHTML = `<div class="diagnostic-step is-active" data-step="6">
      <h2 class="diagnostic-step__title">${t.title}</h2>
      <form class="diagnostic-pii-form" novalidate>
        <div class="diagnostic-options" style="gap:var(--spacing-4)">
          <label style="display:flex;flex-direction:column;gap:var(--spacing-1)">
            <span>${t.name}</span>
            <input type="text" name="name" class="diagnostic-option" style="cursor:text;font-weight:400" autocomplete="name"/>
          </label>
          <label style="display:flex;flex-direction:column;gap:var(--spacing-1)">
            <span>${t.email} *</span>
            <input type="email" name="email" required class="diagnostic-option" style="cursor:text;font-weight:400" autocomplete="email"/>
          </label>
          <label style="display:flex;align-items:center;gap:var(--spacing-3);cursor:pointer">
            <input type="checkbox" name="consent" required/>
            <span style="font-size:var(--text-sm)">${t.consent} *</span>
          </label>
          <p class="diagnostic-pii-error" style="color:var(--ns-danger,#c00);font-size:var(--text-sm);min-height:1.2em"></p>
          <button type="submit" class="diagnostic-result__cta">${t.submit}</button>
        </div>
      </form></div>`;
    box.querySelector('.diagnostic-pii-form').addEventListener('submit', (e) => this.#onPii(e));
  }

  #onPii(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const t = PII[this.#locale];
    const err = form.querySelector('.diagnostic-pii-error');
    const email = form.elements.email.value.trim();
    const name = form.elements.name.value.trim();
    const consent = form.elements.consent.checked;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { err.textContent = t.errEmail; form.elements.email.focus(); return; }
    if (!consent) { err.textContent = t.errConsent; return; }

    const score = computeScore(this.#answers);
    const th = getThreshold(score);
    const rec = getRecommendation(th.nivel_id);
    const result = {
      score, nivelId: th.nivel_id,
      titulo: rec.titulo[this.#locale] || rec.titulo.es,
      ctaHref: rec.cta_href,
      pii: { email, name, consent },
    };
    this.dispatchEvent(new CustomEvent('diagnostic-complete', { detail: result, bubbles: true }));
    this.renderResult(result);
  }

  renderResult(result) {
    const t = RES[this.#locale];
    const label = result.nivelId.charAt(0).toUpperCase() + result.nivelId.slice(1);
    this.innerHTML = `<div class="diagnostic-stepper"><div class="diagnostic-result">
      <span class="diagnostic-result-badge diagnostic-result-badge--${result.nivelId}">${label}</span>
      <h2 class="diagnostic-result__heading">${t.heading} ${label}</h2>
      <p class="diagnostic-result__description">${result.titulo}</p>
      <a href="${result.ctaHref}" class="diagnostic-result__cta">${t.cta}</a>
    </div></div>`;
  }

  renderProgress(step) {
    const bar = this.querySelector('.diagnostic-progress');
    if (!bar) return;
    bar.dataset.step = step;
    bar.setAttribute('aria-valuenow', step);
    const lbl = this.querySelector('.diagnostic-progress__label');
    if (lbl) lbl.textContent = `${step} / ${TOTAL}`;
  }
}

customElements.define('diagnostic-stepper', DiagnosticStepper);
export default DiagnosticStepper;
