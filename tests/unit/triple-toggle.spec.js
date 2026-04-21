import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// ────────────────────────────────────────────────────────────────
// TDD test for components/TripleToggle.js (T022)
// The component does NOT exist yet — this file drives the design.
//
// Spec refs: FR-245, FR-246, FR-247, FR-248, FR-249
// BDD refs:  TS-047, TS-099, TS-043, TS-049
// ────────────────────────────────────────────────────────────────

// --- Shared mock state ---
let store = {};
const localStorageMock = {
  getItem: vi.fn((key) => store[key] ?? null),
  setItem: vi.fn((key, val) => { store[key] = String(val); }),
  removeItem: vi.fn((key) => { delete store[key]; }),
  clear: vi.fn(() => { store = {}; }),
};

// --- Minimal DOM environment ---
// Vitest runs in node; we mock the DOM APIs the component will use.

/** Lightweight mock element for unit-testing Web Components in Node. */
function createMockElement(tag = 'div') {
  const attrs = {};
  const children = [];
  const listeners = {};
  const classList = new Set();
  const dataset = {};
  const style = {};

  const el = {
    tagName: tag.toUpperCase(),
    attrs,
    dataset,
    style,
    children,
    childNodes: children,
    innerHTML: '',
    textContent: '',

    // Attributes
    setAttribute(name, value) { attrs[name] = String(value); },
    getAttribute(name) { return attrs[name] ?? null; },
    removeAttribute(name) { delete attrs[name]; },
    hasAttribute(name) { return name in attrs; },

    // ClassList
    classList: {
      add: (...cls) => cls.forEach((c) => classList.add(c)),
      remove: (...cls) => cls.forEach((c) => classList.delete(c)),
      toggle: (c) => { classList.has(c) ? classList.delete(c) : classList.add(c); },
      contains: (c) => classList.has(c),
    },

    // Events
    addEventListener(event, fn) {
      (listeners[event] ??= []).push(fn);
    },
    removeEventListener(event, fn) {
      if (listeners[event]) {
        listeners[event] = listeners[event].filter((f) => f !== fn);
      }
    },
    dispatchEvent(event) {
      const handlers = listeners[event.type] ?? [];
      handlers.forEach((fn) => fn(event));
      return true;
    },

    // DOM tree
    appendChild(child) { children.push(child); return child; },
    removeChild(child) {
      const idx = children.indexOf(child);
      if (idx >= 0) children.splice(idx, 1);
      return child;
    },
    append(...nodes) { children.push(...nodes); },
    querySelector(sel) { return findInTree(el, sel); },
    querySelectorAll(sel) { return findAllInTree(el, sel); },

    // Shadow DOM stub
    attachShadow() {
      const shadow = createMockElement('shadow-root');
      el.shadowRoot = shadow;
      return shadow;
    },
    shadowRoot: null,

    // Misc
    getRootNode() { return documentMock; },
    _listeners: listeners,
  };

  return el;
}

/** Very basic selector matching for our test mocks */
function matchesSelector(el, sel) {
  if (sel.startsWith('[')) {
    const match = sel.match(/^\[([^\]=]+)(?:="([^"]*)")?\]$/);
    if (match) {
      const [, attr, val] = match;
      if (val !== undefined) return el.getAttribute?.(attr) === val;
      return el.hasAttribute?.(attr);
    }
  }
  if (sel.startsWith('.')) return el.classList?.contains(sel.slice(1));
  if (sel.startsWith('#')) return el.getAttribute?.('id') === sel.slice(1);
  return el.tagName?.toLowerCase() === sel.toLowerCase();
}

function findInTree(root, sel) {
  for (const child of (root.children ?? [])) {
    if (matchesSelector(child, sel)) return child;
    const found = findInTree(child, sel);
    if (found) return found;
  }
  // Also check shadowRoot
  if (root.shadowRoot) {
    for (const child of (root.shadowRoot.children ?? [])) {
      if (matchesSelector(child, sel)) return child;
      const found = findInTree(child, sel);
      if (found) return found;
    }
  }
  return null;
}

function findAllInTree(root, sel) {
  const results = [];
  for (const child of (root.children ?? [])) {
    if (matchesSelector(child, sel)) results.push(child);
    results.push(...findAllInTree(child, sel));
  }
  if (root.shadowRoot) {
    for (const child of (root.shadowRoot.children ?? [])) {
      if (matchesSelector(child, sel)) results.push(child);
      results.push(...findAllInTree(child, sel));
    }
  }
  return results;
}

/** Create a CustomEvent mock (node has no native CustomEvent) */
function createCustomEvent(type, init = {}) {
  return { type, detail: init.detail ?? null, bubbles: init.bubbles ?? false, cancelable: init.cancelable ?? false };
}

// --- Global mocks ---
const documentMock = {
  documentElement: { lang: 'es', dataset: { theme: 'light', audience: 'persona' } },
  createElement: vi.fn((tag) => createMockElement(tag)),
  createTextNode: vi.fn((text) => ({ textContent: text, nodeType: 3 })),
  body: createMockElement('body'),
  dispatchEvent: vi.fn(),
};

const windowListeners = {};

vi.stubGlobal('localStorage', localStorageMock);
vi.stubGlobal('document', documentMock);
vi.stubGlobal('CustomEvent', createCustomEvent);
vi.stubGlobal('HTMLElement', class MockHTMLElement {
  constructor() {
    Object.assign(this, createMockElement('div'));
  }
  connectedCallback() {}
  disconnectedCallback() {}
});
vi.stubGlobal('customElements', {
  _registry: {},
  define(name, ctor) { this._registry[name] = ctor; },
  get(name) { return this._registry[name]; },
});
vi.stubGlobal('window', {
  addEventListener: vi.fn((event, fn) => {
    (windowListeners[event] ??= []).push(fn);
  }),
  removeEventListener: vi.fn((event, fn) => {
    if (windowListeners[event]) {
      windowListeners[event] = windowListeners[event].filter((f) => f !== fn);
    }
  }),
  dispatchEvent: vi.fn((event) => {
    const handlers = windowListeners[event.type] ?? [];
    handlers.forEach((fn) => fn(event));
  }),
});
vi.stubGlobal('matchMedia', vi.fn(() => ({
  matches: false,
  media: '',
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
})));

// --- Module mocks ---
// The component will import these modules — we mock them for isolation.

vi.mock('../../js/theme/toggle.js', () => ({
  getTheme: vi.fn(() => 'light'),
  setTheme: vi.fn(),
  toggleTheme: vi.fn(),
  initTheme: vi.fn(),
  subscribe: vi.fn(),
  unsubscribe: vi.fn(),
}));

vi.mock('../../js/audience/state.js', () => ({
  getAudience: vi.fn(() => 'persona'),
  setAudience: vi.fn(),
  getProvenance: vi.fn(() => ({ value: 'persona', source: 'default', level: 6 })),
  subscribe: vi.fn(),
  unsubscribe: vi.fn(),
}));

let mod;
let themeMod;
let audienceMod;

beforeEach(async () => {
  store = {};
  documentMock.documentElement.lang = 'es';
  documentMock.documentElement.dataset = { theme: 'light', audience: 'persona' };
  documentMock.dispatchEvent.mockClear();
  localStorageMock.getItem.mockClear();
  localStorageMock.setItem.mockClear();
  localStorageMock.clear.mockClear();

  vi.resetModules();

  // Re-import mocked modules to get fresh mock references
  themeMod = await import('../../js/theme/toggle.js');
  audienceMod = await import('../../js/audience/state.js');

  // Set default mock returns
  themeMod.getTheme.mockReturnValue('light');
  audienceMod.getAudience.mockReturnValue('persona');

  // Import the component (will register with customElements)
  mod = await import('../../components/TripleToggle.js');
});

afterEach(() => {
  vi.restoreAllMocks();
});

// --- Helper: instantiate and connect the component ---
function createComponent() {
  const Ctor = customElements.get('triple-toggle');
  expect(Ctor).toBeDefined();

  const el = new Ctor();

  // Simulate browser calling connectedCallback
  if (typeof el.connectedCallback === 'function') {
    el.connectedCallback();
  }

  return el;
}

/** Find all toggle buttons inside the component's shadow or light DOM */
function getToggleButtons(el) {
  // The component should render 3 buttons with role="switch"
  return el.querySelectorAll('[role="switch"]');
}

/** Find toggle by data-toggle-type attribute */
function getToggleByType(el, type) {
  return el.querySelector(`[data-toggle-type="${type}"]`);
}

/** Get the aria-live region */
function getAnnouncer(el) {
  return el.querySelector('[aria-live]');
}

/** Simulate a click on a toggle button */
function clickToggle(button) {
  const clickEvent = { type: 'click', target: button, preventDefault: vi.fn() };
  const handlers = button._listeners?.click ?? [];
  handlers.forEach((fn) => fn(clickEvent));
}

/** Simulate keyboard activation (Space/Enter) on a toggle button */
function pressKey(button, key) {
  const event = { type: 'keydown', key, target: button, preventDefault: vi.fn() };
  const handlers = button._listeners?.keydown ?? [];
  handlers.forEach((fn) => fn(event));
}

// ────────────────────────────────────────────────────────────────
// Tests
// ────────────────────────────────────────────────────────────────

describe('TripleToggle Web Component', () => {
  describe('Registration', () => {
    it('registers as "triple-toggle" custom element', () => {
      const Ctor = customElements.get('triple-toggle');
      expect(Ctor).toBeDefined();
    });
  });

  describe('Rendering — 3 toggle buttons (FR-246)', () => {
    it('renders exactly 3 toggle buttons', () => {
      const el = createComponent();
      const buttons = getToggleButtons(el);
      expect(buttons.length).toBe(3);
    });

    it('each button has role="switch"', () => {
      const el = createComponent();
      const buttons = getToggleButtons(el);
      buttons.forEach((btn) => {
        expect(btn.getAttribute('role')).toBe('switch');
      });
    });

    it('each button has aria-checked attribute', () => {
      const el = createComponent();
      const buttons = getToggleButtons(el);
      buttons.forEach((btn) => {
        expect(btn.hasAttribute('aria-checked')).toBe(true);
      });
    });

    it('renders a theme toggle (data-toggle-type="theme")', () => {
      const el = createComponent();
      const themeToggle = getToggleByType(el, 'theme');
      expect(themeToggle).not.toBeNull();
    });

    it('renders a locale toggle (data-toggle-type="locale")', () => {
      const el = createComponent();
      const localeToggle = getToggleByType(el, 'locale');
      expect(localeToggle).not.toBeNull();
    });

    it('renders an audience toggle (data-toggle-type="audience")', () => {
      const el = createComponent();
      const audienceToggle = getToggleByType(el, 'audience');
      expect(audienceToggle).not.toBeNull();
    });
  });

  describe('Theme toggle (FR-246, TS-049)', () => {
    it('click calls toggleTheme from js/theme/toggle.js', () => {
      const el = createComponent();
      const themeBtn = getToggleByType(el, 'theme');
      clickToggle(themeBtn);
      expect(themeMod.toggleTheme).toHaveBeenCalled();
    });

    it('click emits mdg:state-changed with type "theme"', () => {
      const el = createComponent();
      const events = [];
      el.addEventListener('mdg:state-changed', (e) => events.push(e));

      const themeBtn = getToggleByType(el, 'theme');

      // After toggleTheme is called, the component reads the new value
      themeMod.getTheme.mockReturnValue('dark');
      clickToggle(themeBtn);

      expect(events.length).toBeGreaterThanOrEqual(1);
      const evt = events[0];
      expect(evt.detail.type).toBe('theme');
      expect(evt.detail.value).toBe('dark');
    });

    it('click updates aria-checked on theme toggle', () => {
      const el = createComponent();
      const themeBtn = getToggleByType(el, 'theme');

      // Initial state: light → aria-checked should reflect "false" (light = unchecked)
      expect(themeBtn.getAttribute('aria-checked')).toBe('false');

      // Toggle to dark
      themeMod.getTheme.mockReturnValue('dark');
      clickToggle(themeBtn);

      expect(themeBtn.getAttribute('aria-checked')).toBe('true');
    });

    it('Space key activates theme toggle (FR-249)', () => {
      const el = createComponent();
      const themeBtn = getToggleByType(el, 'theme');
      pressKey(themeBtn, ' ');
      expect(themeMod.toggleTheme).toHaveBeenCalled();
    });

    it('Enter key activates theme toggle (FR-249)', () => {
      const el = createComponent();
      const themeBtn = getToggleByType(el, 'theme');
      pressKey(themeBtn, 'Enter');
      expect(themeMod.toggleTheme).toHaveBeenCalled();
    });
  });

  describe('Locale toggle (FR-246)', () => {
    it('click switches document.documentElement.lang from "es" to "en"', () => {
      const el = createComponent();
      documentMock.documentElement.lang = 'es';
      const localeBtn = getToggleByType(el, 'locale');
      clickToggle(localeBtn);
      expect(documentMock.documentElement.lang).toBe('en');
    });

    it('click switches document.documentElement.lang from "en" to "es"', () => {
      const el = createComponent();
      documentMock.documentElement.lang = 'en';
      const localeBtn = getToggleByType(el, 'locale');
      clickToggle(localeBtn);
      expect(documentMock.documentElement.lang).toBe('es');
    });

    it('click persists locale to localStorage as mdg_locale', () => {
      const el = createComponent();
      documentMock.documentElement.lang = 'es';
      const localeBtn = getToggleByType(el, 'locale');
      clickToggle(localeBtn);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('mdg_locale', 'en');
    });

    it('click fires langchange event on window', () => {
      const el = createComponent();
      documentMock.documentElement.lang = 'es';
      const localeBtn = getToggleByType(el, 'locale');
      clickToggle(localeBtn);

      // Expect a langchange event was dispatched
      const langChangeCall = window.dispatchEvent.mock.calls.find(
        ([evt]) => evt.type === 'langchange'
      );
      expect(langChangeCall).toBeDefined();
    });

    it('click emits mdg:state-changed with type "locale"', () => {
      const el = createComponent();
      const events = [];
      el.addEventListener('mdg:state-changed', (e) => events.push(e));

      documentMock.documentElement.lang = 'es';
      const localeBtn = getToggleByType(el, 'locale');
      clickToggle(localeBtn);

      expect(events.length).toBeGreaterThanOrEqual(1);
      expect(events[0].detail.type).toBe('locale');
      expect(events[0].detail.value).toBe('en');
    });

    it('click updates aria-checked on locale toggle', () => {
      const el = createComponent();
      const localeBtn = getToggleByType(el, 'locale');

      // Default is "es" → aria-checked should reflect current state
      // "es" is default → false, "en" → true
      expect(localeBtn.getAttribute('aria-checked')).toBe('false');

      documentMock.documentElement.lang = 'es';
      clickToggle(localeBtn);
      expect(localeBtn.getAttribute('aria-checked')).toBe('true');
    });

    it('Space key activates locale toggle (FR-249)', () => {
      const el = createComponent();
      documentMock.documentElement.lang = 'es';
      const localeBtn = getToggleByType(el, 'locale');
      pressKey(localeBtn, ' ');
      expect(documentMock.documentElement.lang).toBe('en');
    });
  });

  describe('Audience toggle (FR-246, TS-043)', () => {
    it('click calls setAudience on js/audience/state.js', () => {
      const el = createComponent();
      const audienceBtn = getToggleByType(el, 'audience');
      audienceMod.getAudience.mockReturnValue('empresa');
      clickToggle(audienceBtn);
      expect(audienceMod.setAudience).toHaveBeenCalledWith('empresa', 'toggle');
    });

    it('click switches from persona to empresa', () => {
      const el = createComponent();
      const audienceBtn = getToggleByType(el, 'audience');

      // After click, mock returns empresa
      audienceMod.getAudience.mockReturnValue('empresa');
      clickToggle(audienceBtn);

      expect(audienceMod.setAudience).toHaveBeenCalledWith('empresa', 'toggle');
    });

    it('click switches from empresa to persona', () => {
      const el = createComponent();
      audienceMod.getAudience.mockReturnValue('empresa');

      // Re-create component so it reads initial state as empresa
      const el2 = createComponent();
      const audienceBtn = getToggleByType(el2, 'audience');

      audienceMod.getAudience.mockReturnValue('persona');
      clickToggle(audienceBtn);

      expect(audienceMod.setAudience).toHaveBeenCalledWith('persona', 'toggle');
    });

    it('click emits mdg:state-changed with type "audience"', () => {
      const el = createComponent();
      const events = [];
      el.addEventListener('mdg:state-changed', (e) => events.push(e));

      const audienceBtn = getToggleByType(el, 'audience');
      audienceMod.getAudience.mockReturnValue('empresa');
      clickToggle(audienceBtn);

      expect(events.length).toBeGreaterThanOrEqual(1);
      expect(events[0].detail.type).toBe('audience');
      expect(events[0].detail.value).toBe('empresa');
    });

    it('click updates aria-checked on audience toggle', () => {
      const el = createComponent();
      const audienceBtn = getToggleByType(el, 'audience');

      // Default persona → aria-checked false
      expect(audienceBtn.getAttribute('aria-checked')).toBe('false');

      audienceMod.getAudience.mockReturnValue('empresa');
      clickToggle(audienceBtn);
      expect(audienceBtn.getAttribute('aria-checked')).toBe('true');
    });

    it('updates html[data-audience] attribute on click', () => {
      const el = createComponent();
      const audienceBtn = getToggleByType(el, 'audience');
      audienceMod.getAudience.mockReturnValue('empresa');
      clickToggle(audienceBtn);
      expect(documentMock.documentElement.dataset.audience).toBe('empresa');
    });

    it('Space key activates audience toggle (FR-249)', () => {
      const el = createComponent();
      const audienceBtn = getToggleByType(el, 'audience');
      audienceMod.getAudience.mockReturnValue('empresa');
      pressKey(audienceBtn, ' ');
      expect(audienceMod.setAudience).toHaveBeenCalled();
    });
  });

  describe('Event: mdg:state-changed (FR-247)', () => {
    it('all three toggles fire mdg:state-changed CustomEvent', () => {
      const el = createComponent();
      const events = [];
      el.addEventListener('mdg:state-changed', (e) => events.push(e));

      // Theme
      themeMod.getTheme.mockReturnValue('dark');
      clickToggle(getToggleByType(el, 'theme'));

      // Locale
      documentMock.documentElement.lang = 'es';
      clickToggle(getToggleByType(el, 'locale'));

      // Audience
      audienceMod.getAudience.mockReturnValue('empresa');
      clickToggle(getToggleByType(el, 'audience'));

      expect(events.length).toBe(3);
      expect(events.map((e) => e.detail.type)).toEqual(['theme', 'locale', 'audience']);
    });

    it('event detail contains {type, value} shape', () => {
      const el = createComponent();
      const events = [];
      el.addEventListener('mdg:state-changed', (e) => events.push(e));

      themeMod.getTheme.mockReturnValue('dark');
      clickToggle(getToggleByType(el, 'theme'));

      expect(events[0].detail).toHaveProperty('type');
      expect(events[0].detail).toHaveProperty('value');
    });
  });

  describe('Persistence on connectedCallback (FR-245, FR-246)', () => {
    it('theme toggle reflects stored dark theme on init', () => {
      themeMod.getTheme.mockReturnValue('dark');
      const el = createComponent();
      const themeBtn = getToggleByType(el, 'theme');
      expect(themeBtn.getAttribute('aria-checked')).toBe('true');
    });

    it('theme toggle reflects stored light theme on init', () => {
      themeMod.getTheme.mockReturnValue('light');
      const el = createComponent();
      const themeBtn = getToggleByType(el, 'theme');
      expect(themeBtn.getAttribute('aria-checked')).toBe('false');
    });

    it('locale toggle reflects stored "en" locale on init', () => {
      documentMock.documentElement.lang = 'en';
      store.mdg_locale = 'en';
      const el = createComponent();
      const localeBtn = getToggleByType(el, 'locale');
      expect(localeBtn.getAttribute('aria-checked')).toBe('true');
    });

    it('locale toggle reflects stored "es" locale on init', () => {
      documentMock.documentElement.lang = 'es';
      store.mdg_locale = 'es';
      const el = createComponent();
      const localeBtn = getToggleByType(el, 'locale');
      expect(localeBtn.getAttribute('aria-checked')).toBe('false');
    });

    it('audience toggle reflects stored empresa on init', () => {
      audienceMod.getAudience.mockReturnValue('empresa');
      const el = createComponent();
      const audienceBtn = getToggleByType(el, 'audience');
      expect(audienceBtn.getAttribute('aria-checked')).toBe('true');
    });

    it('audience toggle reflects stored persona (default) on init', () => {
      audienceMod.getAudience.mockReturnValue('persona');
      const el = createComponent();
      const audienceBtn = getToggleByType(el, 'audience');
      expect(audienceBtn.getAttribute('aria-checked')).toBe('false');
    });
  });

  describe('ARIA: aria-live announcements (FR-249, TS-047)', () => {
    it('has an aria-live region', () => {
      const el = createComponent();
      const announcer = getAnnouncer(el);
      expect(announcer).not.toBeNull();
      expect(announcer.getAttribute('aria-live')).toBe('polite');
    });

    it('theme toggle click updates aria-live text', () => {
      const el = createComponent();
      const announcer = getAnnouncer(el);
      themeMod.getTheme.mockReturnValue('dark');
      clickToggle(getToggleByType(el, 'theme'));

      // Announcer should contain descriptive text about the change
      expect(announcer.textContent).toBeTruthy();
      expect(announcer.textContent.length).toBeGreaterThan(0);
    });

    it('locale toggle click updates aria-live text', () => {
      const el = createComponent();
      const announcer = getAnnouncer(el);
      documentMock.documentElement.lang = 'es';
      clickToggle(getToggleByType(el, 'locale'));

      expect(announcer.textContent).toBeTruthy();
      expect(announcer.textContent.length).toBeGreaterThan(0);
    });

    it('audience toggle click updates aria-live text', () => {
      const el = createComponent();
      const announcer = getAnnouncer(el);
      audienceMod.getAudience.mockReturnValue('empresa');
      clickToggle(getToggleByType(el, 'audience'));

      expect(announcer.textContent).toBeTruthy();
      expect(announcer.textContent.length).toBeGreaterThan(0);
    });
  });

  describe('Keyboard navigation (FR-249)', () => {
    it('ignores non-activation keys', () => {
      const el = createComponent();
      const themeBtn = getToggleByType(el, 'theme');
      const callsBefore = themeMod.toggleTheme.mock.calls.length;
      pressKey(themeBtn, 'Tab');
      pressKey(themeBtn, 'Escape');
      pressKey(themeBtn, 'a');
      expect(themeMod.toggleTheme.mock.calls.length).toBe(callsBefore);
    });
  });

  describe('disconnectedCallback cleanup', () => {
    it('disconnectedCallback does not throw', () => {
      const el = createComponent();
      expect(() => {
        if (typeof el.disconnectedCallback === 'function') {
          el.disconnectedCallback();
        }
      }).not.toThrow();
    });
  });
});
