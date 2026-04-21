import { describe, it, expect, beforeEach, vi } from 'vitest';

// --- DOM + localStorage mocks ---
let store = {};
const localStorageMock = {
  getItem: vi.fn((key) => store[key] ?? null),
  setItem: vi.fn((key, val) => { store[key] = String(val); }),
  removeItem: vi.fn((key) => { delete store[key]; }),
  clear: vi.fn(() => { store = {}; }),
};

let prefersDark = false;
const matchMediaMock = vi.fn((query) => ({
  matches: query === '(prefers-color-scheme: dark)' ? prefersDark : false,
  media: query,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
}));

const documentMock = {
  documentElement: { dataset: {} },
};

vi.stubGlobal('localStorage', localStorageMock);
vi.stubGlobal('matchMedia', matchMediaMock);
vi.stubGlobal('document', documentMock);

// Import AFTER mocks are in place
let mod;

beforeEach(async () => {
  store = {};
  prefersDark = false;
  documentMock.documentElement.dataset = {};
  localStorageMock.getItem.mockClear();
  localStorageMock.setItem.mockClear();
  matchMediaMock.mockClear();

  // Re-import to reset internal state each test
  vi.resetModules();
  mod = await import('../../js/theme/toggle.js');
});

describe('theme/toggle', () => {
  describe('getTheme', () => {
    it('defaults to "light" when no storage and no prefers-color-scheme', () => {
      mod.initTheme();
      expect(mod.getTheme()).toBe('light');
    });

    it('reads from localStorage if present', () => {
      store.mdg_theme = 'dark';
      mod.initTheme();
      expect(mod.getTheme()).toBe('dark');
    });

    it('respects prefers-color-scheme: dark when no localStorage', () => {
      prefersDark = true;
      // Need fresh matchMedia mock with updated prefersDark
      matchMediaMock.mockImplementation((query) => ({
        matches: query === '(prefers-color-scheme: dark)' ? prefersDark : false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }));
      mod.initTheme();
      expect(mod.getTheme()).toBe('dark');
    });

    it('localStorage overrides prefers-color-scheme', () => {
      prefersDark = true;
      matchMediaMock.mockImplementation((query) => ({
        matches: query === '(prefers-color-scheme: dark)' ? prefersDark : false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }));
      store.mdg_theme = 'light';
      mod.initTheme();
      expect(mod.getTheme()).toBe('light');
    });
  });

  describe('setTheme', () => {
    it('persists to localStorage', () => {
      mod.initTheme();
      mod.setTheme('dark');
      expect(localStorageMock.setItem).toHaveBeenCalledWith('mdg_theme', 'dark');
      expect(store.mdg_theme).toBe('dark');
    });

    it('updates document.documentElement.dataset.theme', () => {
      mod.initTheme();
      mod.setTheme('dark');
      expect(documentMock.documentElement.dataset.theme).toBe('dark');
    });

    it('ignores invalid theme values', () => {
      mod.initTheme();
      mod.setTheme('dark');
      mod.setTheme('purple');
      expect(mod.getTheme()).toBe('dark');
      expect(documentMock.documentElement.dataset.theme).toBe('dark');
    });

    it('updates getTheme return value', () => {
      mod.initTheme();
      mod.setTheme('dark');
      expect(mod.getTheme()).toBe('dark');
      mod.setTheme('light');
      expect(mod.getTheme()).toBe('light');
    });
  });

  describe('toggleTheme', () => {
    it('flips light to dark', () => {
      mod.initTheme(); // defaults to light
      mod.toggleTheme();
      expect(mod.getTheme()).toBe('dark');
    });

    it('flips dark to light', () => {
      store.mdg_theme = 'dark';
      mod.initTheme();
      mod.toggleTheme();
      expect(mod.getTheme()).toBe('light');
    });

    it('persists the toggled theme', () => {
      mod.initTheme();
      mod.toggleTheme();
      expect(store.mdg_theme).toBe('dark');
    });
  });

  describe('initTheme', () => {
    it('applies theme to document.documentElement.dataset', () => {
      store.mdg_theme = 'dark';
      mod.initTheme();
      expect(documentMock.documentElement.dataset.theme).toBe('dark');
    });

    it('applies "light" by default', () => {
      mod.initTheme();
      expect(documentMock.documentElement.dataset.theme).toBe('light');
    });
  });

  describe('subscribe / unsubscribe', () => {
    it('subscribe receives change events from setTheme', () => {
      mod.initTheme();
      const calls = [];
      mod.subscribe((theme) => calls.push(theme));
      mod.setTheme('dark');
      mod.setTheme('light');
      expect(calls).toEqual(['dark', 'light']);
    });

    it('subscribe receives change events from toggleTheme', () => {
      mod.initTheme();
      const calls = [];
      mod.subscribe((theme) => calls.push(theme));
      mod.toggleTheme();
      expect(calls).toEqual(['dark']);
    });

    it('unsubscribe stops notifications', () => {
      mod.initTheme();
      const calls = [];
      const cb = (theme) => calls.push(theme);
      mod.subscribe(cb);
      mod.setTheme('dark');
      mod.unsubscribe(cb);
      mod.setTheme('light');
      expect(calls).toEqual(['dark']);
    });

    it('multiple subscribers all receive events', () => {
      mod.initTheme();
      const a = [];
      const b = [];
      mod.subscribe((t) => a.push(t));
      mod.subscribe((t) => b.push(t));
      mod.setTheme('dark');
      expect(a).toEqual(['dark']);
      expect(b).toEqual(['dark']);
    });
  });
});
