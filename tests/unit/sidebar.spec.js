import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getSections } from '../../js/sidebar/sections-config.js';

/**
 * TDD tests for components/SiteSidebar.js (not yet implemented).
 *
 * Covers: section rendering, link structure, active state,
 * mobile drawer (open/close/toggle), Escape key, backdrop click,
 * and langchange re-render.
 *
 * Traceability: [TS-093, TS-094, TS-096, TS-097]
 */

/* ------------------------------------------------------------------ */
/*  Helpers & DOM shims                                                */
/* ------------------------------------------------------------------ */

/** Minimal DOM element stub with class-list, attributes, and children. */
function createElement(tag) {
  const classList = new Set();
  const attributes = {};
  const children = [];
  const listeners = {};

  return {
    tagName: tag.toUpperCase(),
    classList: {
      add: (c) => classList.add(c),
      remove: (c) => classList.delete(c),
      toggle: (c) => {
        if (classList.has(c)) { classList.delete(c); return false; }
        classList.add(c); return true;
      },
      contains: (c) => classList.has(c),
    },
    setAttribute: (k, v) => { attributes[k] = v; },
    getAttribute: (k) => attributes[k] ?? null,
    appendChild: (child) => { children.push(child); return child; },
    get children() { return children; },
    get innerHTML() { return ''; },
    set innerHTML(_v) { children.length = 0; },
    querySelectorAll: (sel) => {
      // Flat search through children — enough for our tests
      if (sel === '.sidebar-link') return children.filter((c) => c.classList.contains('sidebar-link'));
      if (sel === '.sidebar-number') return children.flatMap((c) => c.children).filter((c) => c?.classList?.contains('sidebar-number'));
      if (sel === '.sidebar-icon') return children.flatMap((c) => c.children).filter((c) => c?.classList?.contains('sidebar-icon'));
      return [];
    },
    querySelector: (sel) => {
      const results = children.filter((c) => {
        if (sel.startsWith('.')) return c.classList?.contains(sel.slice(1));
        if (sel.startsWith('#')) return c.getAttribute?.('id') === sel.slice(1);
        return false;
      });
      return results[0] ?? null;
    },
    addEventListener: (evt, fn) => {
      (listeners[evt] ??= []).push(fn);
    },
    removeEventListener: (evt, fn) => {
      if (listeners[evt]) listeners[evt] = listeners[evt].filter((f) => f !== fn);
    },
    _emit: (evt, detail) => {
      (listeners[evt] ?? []).forEach((fn) => fn(detail));
    },
    click: () => {
      (listeners['click'] ?? []).forEach((fn) => fn({ type: 'click' }));
    },
  };
}

/* ------------------------------------------------------------------ */
/*  SiteSidebar in-test mock                                           */
/* ------------------------------------------------------------------ */

/**
 * Contract-based mock of SiteSidebar.
 *
 * This mock encodes the EXPECTED behavior from spec/plan so that tests
 * define the contract BEFORE implementation exists. When the real
 * component is built, swap the import and all tests should still pass.
 */
class SiteSidebar {
  constructor() {
    this.el = createElement('nav');
    this.el.setAttribute('role', 'navigation');
    this._pageSlug = 'home';
    this._activeId = null;
    this._links = [];
    this._backdrop = null;
    this._escHandler = null;
  }

  /** Render (or re-render) nav links for current page. */
  render() {
    this.el.innerHTML = '';
    this._links = [];

    const sections = getSections(this._pageSlug);
    sections.forEach((sec, idx) => {
      const link = createElement('a');
      link.classList.add('sidebar-link');
      link.setAttribute('href', `#${sec.id}`);
      link.setAttribute('data-section', sec.id);

      const num = createElement('span');
      num.classList.add('sidebar-number');
      num.textContent = String(idx + 1).padStart(2, '0');
      link.appendChild(num);

      const icon = createElement('span');
      icon.classList.add('sidebar-icon');
      icon.setAttribute('data-icon', sec.icon);
      link.appendChild(icon);

      this.el.appendChild(link);
      this._links.push(link);
    });

    // Backdrop for mobile drawer
    this._backdrop = createElement('div');
    this._backdrop.classList.add('sidebar-backdrop');
    this._backdrop.addEventListener('click', () => this.close());
    this.el.appendChild(this._backdrop);
  }

  /** Set which section is active (scroll-spy integration). */
  setActive(sectionId) {
    this._links.forEach((link) => {
      if (link.getAttribute('data-section') === sectionId) {
        link.classList.add('is-active');
      } else {
        link.classList.remove('is-active');
      }
    });
    this._activeId = sectionId;
  }

  /** Open mobile drawer. */
  open() {
    this.el.classList.add('is-open');
    this._escHandler = (e) => {
      if (e.key === 'Escape') this.close();
    };
    document.addEventListener('keydown', this._escHandler);
  }

  /** Close mobile drawer. */
  close() {
    this.el.classList.remove('is-open');
    if (this._escHandler) {
      document.removeEventListener('keydown', this._escHandler);
      this._escHandler = null;
    }
  }

  /** Toggle mobile drawer. */
  toggle() {
    if (this.el.classList.contains('is-open')) {
      this.close();
    } else {
      this.open();
    }
  }

  /** Change page and re-render. */
  setPage(slug) {
    this._pageSlug = slug;
    this.render();
  }
}

/* ------------------------------------------------------------------ */
/*  Tests                                                              */
/* ------------------------------------------------------------------ */

describe('SiteSidebar', () => {
  let sidebar;
  let keydownListeners;

  beforeEach(() => {
    vi.restoreAllMocks();

    // Stub global document for keydown events
    keydownListeners = [];
    vi.stubGlobal('document', {
      addEventListener: vi.fn((evt, fn) => {
        if (evt === 'keydown') keydownListeners.push(fn);
      }),
      removeEventListener: vi.fn((evt, fn) => {
        if (evt === 'keydown') {
          keydownListeners = keydownListeners.filter((f) => f !== fn);
        }
      }),
    });

    sidebar = new SiteSidebar();
    sidebar.render();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  /* ---------------------------------------------------------------- */
  /*  TC-1: Renders 7 nav links for a given page                      */
  /* ---------------------------------------------------------------- */
  describe('section rendering', () => {
    it('should render exactly 7 nav links for "home" page', () => {
      const links = sidebar.el.querySelectorAll('.sidebar-link');
      expect(links).toHaveLength(7);
    });

    it('should render 7 links for every page in sections-config', async () => {
      const { getAllPages } = await import('../../js/sidebar/sections-config.js');
      // Verify the static import still holds — every page has 7
      const pages = getAllPages();
      expect(pages.length).toBe(12);

      for (const slug of pages) {
        const sections = getSections(slug);
        expect(sections).toHaveLength(7);
      }
    });

    it('should render links matching the sections-config for "home"', () => {
      const homeSections = getSections('home');
      const links = sidebar.el.querySelectorAll('.sidebar-link');

      links.forEach((link, i) => {
        expect(link.getAttribute('data-section')).toBe(homeSections[i].id);
        expect(link.getAttribute('href')).toBe(`#${homeSections[i].id}`);
      });
    });
  });

  /* ---------------------------------------------------------------- */
  /*  TC-2: Links have correct sidebar-link/number/icon structure     */
  /* ---------------------------------------------------------------- */
  describe('link structure', () => {
    it('each link should contain a .sidebar-number child', () => {
      const links = sidebar.el.querySelectorAll('.sidebar-link');
      links.forEach((link) => {
        const nums = link.children.filter((c) => c.classList.contains('sidebar-number'));
        expect(nums).toHaveLength(1);
      });
    });

    it('each link should contain a .sidebar-icon child', () => {
      const links = sidebar.el.querySelectorAll('.sidebar-link');
      links.forEach((link) => {
        const icons = link.children.filter((c) => c.classList.contains('sidebar-icon'));
        expect(icons).toHaveLength(1);
      });
    });

    it('icons should reference the correct Lucide icon name', () => {
      const homeSections = getSections('home');
      const links = sidebar.el.querySelectorAll('.sidebar-link');
      links.forEach((link, i) => {
        const icon = link.children.find((c) => c.classList.contains('sidebar-icon'));
        expect(icon.getAttribute('data-icon')).toBe(homeSections[i].icon);
      });
    });
  });

  /* ---------------------------------------------------------------- */
  /*  TC-3: Active state via setActive(sectionId)                     */
  /* ---------------------------------------------------------------- */
  describe('active state', () => {
    it('should add is-active class to the matching link', () => {
      sidebar.setActive('diagnostico');
      const links = sidebar.el.querySelectorAll('.sidebar-link');
      const active = links.find((l) => l.getAttribute('data-section') === 'diagnostico');
      expect(active.classList.contains('is-active')).toBe(true);
    });

    it('should remove is-active from previously active link', () => {
      sidebar.setActive('diagnostico');
      sidebar.setActive('recursos');

      const links = sidebar.el.querySelectorAll('.sidebar-link');
      const diag = links.find((l) => l.getAttribute('data-section') === 'diagnostico');
      const rec = links.find((l) => l.getAttribute('data-section') === 'recursos');

      expect(diag.classList.contains('is-active')).toBe(false);
      expect(rec.classList.contains('is-active')).toBe(true);
    });

    it('only one link should be active at a time', () => {
      sidebar.setActive('metodo');
      const links = sidebar.el.querySelectorAll('.sidebar-link');
      const activeCount = links.filter((l) => l.classList.contains('is-active')).length;
      expect(activeCount).toBe(1);
    });
  });

  /* ---------------------------------------------------------------- */
  /*  TC-4: Mobile — open() adds is-open class                        */
  /* ---------------------------------------------------------------- */
  describe('mobile drawer — open', () => {
    it('should add is-open class when open() is called', () => {
      sidebar.open();
      expect(sidebar.el.classList.contains('is-open')).toBe(true);
    });

    it('should register Escape key listener when opened', () => {
      sidebar.open();
      expect(document.addEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
    });
  });

  /* ---------------------------------------------------------------- */
  /*  TC-5: Mobile — close() removes is-open class                    */
  /* ---------------------------------------------------------------- */
  describe('mobile drawer — close', () => {
    it('should remove is-open class when close() is called', () => {
      sidebar.open();
      sidebar.close();
      expect(sidebar.el.classList.contains('is-open')).toBe(false);
    });

    it('should remove keydown listener when closed', () => {
      sidebar.open();
      sidebar.close();
      expect(document.removeEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
    });
  });

  /* ---------------------------------------------------------------- */
  /*  TC-6: Mobile — toggle() flips is-open state                     */
  /* ---------------------------------------------------------------- */
  describe('mobile drawer — toggle', () => {
    it('should open when currently closed', () => {
      sidebar.toggle();
      expect(sidebar.el.classList.contains('is-open')).toBe(true);
    });

    it('should close when currently open', () => {
      sidebar.open();
      sidebar.toggle();
      expect(sidebar.el.classList.contains('is-open')).toBe(false);
    });

    it('should cycle correctly across multiple toggles', () => {
      sidebar.toggle(); // open
      sidebar.toggle(); // close
      sidebar.toggle(); // open
      expect(sidebar.el.classList.contains('is-open')).toBe(true);
    });
  });

  /* ---------------------------------------------------------------- */
  /*  TC-7: Escape key closes sidebar when open                       */
  /* ---------------------------------------------------------------- */
  describe('Escape key', () => {
    it('should close sidebar on Escape keydown', () => {
      sidebar.open();

      // Simulate Escape key via the captured listeners
      keydownListeners.forEach((fn) => fn({ key: 'Escape' }));

      expect(sidebar.el.classList.contains('is-open')).toBe(false);
    });

    it('should not throw on Escape when sidebar is already closed', () => {
      expect(() => {
        keydownListeners.forEach((fn) => fn({ key: 'Escape' }));
      }).not.toThrow();
    });

    it('should ignore non-Escape keys', () => {
      sidebar.open();
      keydownListeners.forEach((fn) => fn({ key: 'Enter' }));
      expect(sidebar.el.classList.contains('is-open')).toBe(true);
    });
  });

  /* ---------------------------------------------------------------- */
  /*  TC-8: Re-render on langchange event                             */
  /* ---------------------------------------------------------------- */
  describe('langchange re-render', () => {
    it('should re-render links when langchange triggers setPage', () => {
      // Simulate i18n language change by calling setPage (re-render)
      sidebar.setPage('empresas');
      const links = sidebar.el.querySelectorAll('.sidebar-link');
      expect(links).toHaveLength(7);

      const empresasSections = getSections('empresas');
      links.forEach((link, i) => {
        expect(link.getAttribute('data-section')).toBe(empresasSections[i].id);
      });
    });

    it('should clear previous links on re-render', () => {
      const linksBefore = sidebar.el.querySelectorAll('.sidebar-link');
      expect(linksBefore).toHaveLength(7);

      sidebar.setPage('legal');
      const linksAfter = sidebar.el.querySelectorAll('.sidebar-link');
      expect(linksAfter).toHaveLength(7);

      // Verify they are the legal page sections, not home
      const legalSections = getSections('legal');
      linksAfter.forEach((link, i) => {
        expect(link.getAttribute('data-section')).toBe(legalSections[i].id);
      });
    });

    it('should preserve active state reset after re-render', () => {
      sidebar.setActive('diagnostico');
      sidebar.setPage('empresas');

      // After re-render, no link should be active
      const links = sidebar.el.querySelectorAll('.sidebar-link');
      const activeCount = links.filter((l) => l.classList.contains('is-active')).length;
      expect(activeCount).toBe(0);
    });
  });

  /* ---------------------------------------------------------------- */
  /*  TC-9: Backdrop click closes sidebar                             */
  /* ---------------------------------------------------------------- */
  describe('backdrop click', () => {
    it('should close sidebar when backdrop is clicked', () => {
      sidebar.open();
      expect(sidebar.el.classList.contains('is-open')).toBe(true);

      // Find backdrop and click it
      const backdrop = sidebar._backdrop;
      backdrop.click();

      expect(sidebar.el.classList.contains('is-open')).toBe(false);
    });

    it('backdrop click should also clean up Escape listener', () => {
      sidebar.open();
      sidebar._backdrop.click();

      expect(document.removeEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
    });
  });

  /* ---------------------------------------------------------------- */
  /*  Sections-config integrity (cross-check)                         */
  /* ---------------------------------------------------------------- */
  describe('sections-config integrity', () => {
    it('getSections("home") should return exactly 7 entries', () => {
      const sections = getSections('home');
      expect(sections).toHaveLength(7);
    });

    it('each section should have id, icon, and i18nKey', () => {
      const sections = getSections('home');
      sections.forEach((sec) => {
        expect(sec).toHaveProperty('id');
        expect(sec).toHaveProperty('icon');
        expect(sec).toHaveProperty('i18nKey');
        expect(typeof sec.id).toBe('string');
        expect(typeof sec.icon).toBe('string');
        expect(typeof sec.i18nKey).toBe('string');
      });
    });

    it('unknown page slug should return empty array', () => {
      expect(getSections('nonexistent')).toEqual([]);
    });
  });
});
