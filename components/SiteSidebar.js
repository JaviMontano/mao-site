/**
 * SiteSidebar.js — 7-section numbered nav Web Component with scroll-spy
 * and mobile drawer.
 *
 * @license Copyleft
 * @copyright MetodologIA
 */

import { getSections } from '../js/sidebar/sections-config.js';
import { createScrollSpy } from '../js/sidebar/scroll-spy.js';
import { on, off } from '../js/state/bus.js';

/** Infer page slug from the current URL pathname. */
function slugFromURL() {
  const path = window.location.pathname.replace(/\/index\.html$/, '/');
  const segment = path.split('/').filter(Boolean).pop();
  return segment || 'home';
}

function getNestedValue(obj, key) {
  return key.split('.').reduce((value, part) => value?.[part], obj);
}

function humanizeKey(key) {
  return key
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

class SiteSidebar extends HTMLElement {
  constructor() {
    super();
    /** @type {Array<HTMLAnchorElement>} */
    this._links = [];
    this._backdrop = null;
    this._scrollSpy = null;
    this._escHandler = null;
    this._pageSlug = 'home';
    this._labels = null;
    this._lang = document.documentElement.lang || 'es';
    this._onLangChange = this._handleLangChange.bind(this);
  }

  connectedCallback() {
    this._pageSlug = this.dataset.page || slugFromURL();
    this.classList.add('sidebar');
    this.setAttribute('role', 'navigation');
    this._loadLabels().then(() => {
      this.render();
      this._initScrollSpy();
    });
    on('langchange', this._onLangChange);
  }

  disconnectedCallback() {
    this._destroyScrollSpy();
    this._removeEscListener();
    off('langchange', this._onLangChange);
  }

  /* ------------------------------------------------------------------ */
  /*  Rendering                                                          */
  /* ------------------------------------------------------------------ */

  render() {
    this.innerHTML = '';
    this._links = [];

    const sections = getSections(this._pageSlug);

    // Mobile CTA (visible only ≤640px via CSS)
    const cta = document.createElement('a');
    cta.className = 'sidebar__cta';
    cta.href = '/contacto/';
    cta.textContent = this._lang === 'en' ? "Let's Talk →" : 'Conversemos →';
    this.appendChild(cta);

    // Sidebar head (canonical: .sidebar__head)
    const head = document.createElement('div');
    head.className = 'sidebar__head';
    head.textContent = this._lang === 'en' ? 'Index' : 'Índice';
    this.appendChild(head);

    // Nav wrapper (canonical: .sidebar__nav)
    const nav = document.createElement('nav');
    nav.className = 'sidebar__nav';

    sections.forEach((sec, idx) => {
      const a = document.createElement('a');
      a.className = 'sidebar__link';
      a.href = `#${sec.id}`;
      a.dataset.section = sec.id;
      a.addEventListener('click', (e) => this._handleLinkClick(e, sec.id));

      const labelText =
        getNestedValue(this._labels, sec.i18nKey)?.[this._lang] ||
        humanizeKey(sec.id);
      a.textContent = labelText;

      // Number at the end (canonical: .sidebar__link-num)
      const num = document.createElement('span');
      num.className = 'sidebar__link-num';
      num.textContent = String(idx + 1).padStart(2, '0');
      a.appendChild(num);

      nav.appendChild(a);
      this._links.push(a);
    });

    this.appendChild(nav);

    // Sidebar footer
    const footer = document.createElement('div');
    footer.className = 'sidebar__footer';
    footer.innerHTML = '<a href="/">metodologia.info</a>';
    this.appendChild(footer);

    // Backdrop for mobile drawer
    this._backdrop = document.createElement('div');
    this._backdrop.className = 'sidebar-backdrop';
    this._backdrop.addEventListener('click', () => this.close());
    document.body.appendChild(this._backdrop);
  }

  /* ------------------------------------------------------------------ */
  /*  Public API                                                         */
  /* ------------------------------------------------------------------ */

  /** Highlight the link matching `sectionId`, clearing others. */
  setActive(sectionId) {
    for (const link of this._links) {
      if (link.dataset.section === sectionId) {
        link.classList.add('is-active');
      } else {
        link.classList.remove('is-active');
      }
    }
  }

  /** Open the mobile drawer. */
  open() {
    this.classList.add('is-open');
    this._escHandler = (e) => {
      if (e.key === 'Escape') this.close();
    };
    document.addEventListener('keydown', this._escHandler);
  }

  /** Close the mobile drawer. */
  close() {
    this.classList.remove('is-open');
    this._removeEscListener();
  }

  /** Toggle the mobile drawer open/closed. */
  toggle() {
    if (this.classList.contains('is-open')) {
      this.close();
    } else {
      this.open();
    }
  }

  /** Switch page and re-render. */
  setPage(slug) {
    this._pageSlug = slug;
    this.render();
  }

  /** Provide labels externally (avoids re-fetch). */
  setLabels(labels) {
    this._labels = labels;
    this.render();
  }

  /* ------------------------------------------------------------------ */
  /*  Internal                                                           */
  /* ------------------------------------------------------------------ */

  async _loadLabels() {
    try {
      const basePath = this.getAttribute('base-path')
        || (window.location.pathname.replace(/\/+$/, '').split('/').length - 1 >= 1 ? '..' : '.');
      const res = await fetch(`${basePath}/js/i18n/dictionaries/sidebar-labels.json`);
      if (res.ok) this._labels = await res.json();
    } catch { /* labels remain null — ids used as fallback */ }
  }

  _initScrollSpy() {
    this._scrollSpy = createScrollSpy({
      onActivate: (id) => this.setActive(id),
    });
    this._scrollSpy.observe();
  }

  _destroyScrollSpy() {
    if (this._scrollSpy) {
      this._scrollSpy.disconnect();
      this._scrollSpy = null;
    }
  }

  _removeEscListener() {
    if (this._escHandler) {
      document.removeEventListener('keydown', this._escHandler);
      this._escHandler = null;
    }
  }

  _handleLinkClick(e, sectionId) {
    e.preventDefault();
    const target = document.getElementById(sectionId);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
    // Close drawer on mobile
    if (this.classList.contains('is-open')) this.close();
  }

  _handleLangChange(data) {
    this._lang = (data && data.locale) || data || 'es';
    this._loadLabels().then(() => this.render());
  }
}

customElements.define('site-sidebar', SiteSidebar);
export default SiteSidebar;
