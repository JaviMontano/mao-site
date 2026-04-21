import { describe, it, expect, beforeEach, vi } from 'vitest';

// Priority levels for reference:
// 1 = URL param (highest)
// 2 = toggle (user intent)
// 3 = localStorage
// 4 = diagnostic
// 5 = cookie
// 6 = default "persona" (lowest)

describe('AudienceState', () => {
  let mod;

  function stubLocation(url) {
    const parsed = new URL(url);
    vi.stubGlobal('location', {
      href: parsed.href,
      search: parsed.search,
      origin: parsed.origin,
      pathname: parsed.pathname,
    });
  }

  beforeEach(async () => {
    vi.resetModules();
    // Clean localStorage mock
    const store = {};
    vi.stubGlobal('localStorage', {
      getItem: vi.fn((key) => store[key] ?? null),
      setItem: vi.fn((key, val) => { store[key] = String(val); }),
      removeItem: vi.fn((key) => { delete store[key]; }),
    });
    // Default: no URL params
    stubLocation('https://metodologia.info/');
    // No cookies by default
    vi.stubGlobal('document', { cookie: '' });

    mod = await import('../../js/audience/state.js');
  });

  describe('getAudience', () => {
    it('returns "persona" as default when no source is present', () => {
      expect(mod.getAudience()).toBe('persona');
    });

    it('returns "empresa" when URL param audiencia=empresa', async () => {
      vi.resetModules();
      stubLocation('https://metodologia.info/?audiencia=empresa');
      mod = await import('../../js/audience/state.js');
      expect(mod.getAudience()).toBe('empresa');
    });

    it('returns "persona" when URL param audiencia=persona', async () => {
      vi.resetModules();
      stubLocation('https://metodologia.info/?audiencia=persona');
      mod = await import('../../js/audience/state.js');
      expect(mod.getAudience()).toBe('persona');
    });

    it('ignores invalid URL param values', async () => {
      vi.resetModules();
      stubLocation('https://metodologia.info/?audiencia=invalid');
      mod = await import('../../js/audience/state.js');
      expect(mod.getAudience()).toBe('persona');
    });

    it('reads localStorage on init when no URL param', async () => {
      vi.resetModules();
      const store = { mdg_audience: 'empresa' };
      vi.stubGlobal('localStorage', {
        getItem: vi.fn((key) => store[key] ?? null),
        setItem: vi.fn((key, val) => { store[key] = String(val); }),
        removeItem: vi.fn((key) => { delete store[key]; }),
      });
      stubLocation('https://metodologia.info/');
      mod = await import('../../js/audience/state.js');
      expect(mod.getAudience()).toBe('empresa');
    });

    it('URL param overrides localStorage value', async () => {
      vi.resetModules();
      const store = { mdg_audience: 'persona' };
      vi.stubGlobal('localStorage', {
        getItem: vi.fn((key) => store[key] ?? null),
        setItem: vi.fn((key, val) => { store[key] = String(val); }),
        removeItem: vi.fn((key) => { delete store[key]; }),
      });
      stubLocation('https://metodologia.info/?audiencia=empresa');
      mod = await import('../../js/audience/state.js');
      expect(mod.getAudience()).toBe('empresa');
    });
  });

  describe('setAudience', () => {
    it('sets audience via toggle source', () => {
      mod.setAudience('empresa', 'toggle');
      expect(mod.getAudience()).toBe('empresa');
    });

    it('toggle overrides URL param', async () => {
      vi.resetModules();
      stubLocation('https://metodologia.info/?audiencia=persona');
      mod = await import('../../js/audience/state.js');
      expect(mod.getAudience()).toBe('persona');
      mod.setAudience('empresa', 'toggle');
      expect(mod.getAudience()).toBe('empresa');
    });

    it('lower-priority source does NOT override higher-priority value', async () => {
      vi.resetModules();
      stubLocation('https://metodologia.info/?audiencia=empresa');
      mod = await import('../../js/audience/state.js');
      // URL param is level 1; diagnostic is level 4 — should not override
      mod.setAudience('persona', 'diagnostic');
      expect(mod.getAudience()).toBe('empresa');
    });

    it('diagnostic source does not override toggle', () => {
      mod.setAudience('empresa', 'toggle');
      mod.setAudience('persona', 'diagnostic');
      expect(mod.getAudience()).toBe('empresa');
    });

    it('cookie source does not override diagnostic', () => {
      mod.setAudience('empresa', 'diagnostic');
      mod.setAudience('persona', 'cookie');
      expect(mod.getAudience()).toBe('empresa');
    });

    it('toggle always wins regardless of current source', async () => {
      vi.resetModules();
      stubLocation('https://metodologia.info/?audiencia=persona');
      mod = await import('../../js/audience/state.js');
      mod.setAudience('empresa', 'toggle');
      expect(mod.getAudience()).toBe('empresa');
    });

    it('persists to localStorage on set', () => {
      mod.setAudience('empresa', 'toggle');
      expect(localStorage.setItem).toHaveBeenCalledWith('mdg_audience', 'empresa');
    });

    it('rejects invalid audience values', () => {
      mod.setAudience('empresa', 'toggle');
      mod.setAudience('invalid', 'toggle');
      expect(mod.getAudience()).toBe('empresa');
    });
  });

  describe('getProvenance', () => {
    it('returns default provenance when no source', () => {
      const prov = mod.getProvenance();
      expect(prov).toEqual({ value: 'persona', source: 'default', level: 6 });
    });

    it('returns url provenance when URL param set', async () => {
      vi.resetModules();
      stubLocation('https://metodologia.info/?audiencia=empresa');
      mod = await import('../../js/audience/state.js');
      const prov = mod.getProvenance();
      expect(prov).toEqual({ value: 'empresa', source: 'url', level: 1 });
    });

    it('returns toggle provenance after toggle set', () => {
      mod.setAudience('empresa', 'toggle');
      const prov = mod.getProvenance();
      expect(prov).toEqual({ value: 'empresa', source: 'toggle', level: 2 });
    });

    it('returns localStorage provenance on init from storage', async () => {
      vi.resetModules();
      const store = { mdg_audience: 'empresa' };
      vi.stubGlobal('localStorage', {
        getItem: vi.fn((key) => store[key] ?? null),
        setItem: vi.fn((key, val) => { store[key] = String(val); }),
        removeItem: vi.fn((key) => { delete store[key]; }),
      });
      stubLocation('https://metodologia.info/');
      mod = await import('../../js/audience/state.js');
      const prov = mod.getProvenance();
      expect(prov).toEqual({ value: 'empresa', source: 'localStorage', level: 3 });
    });

    it('returns diagnostic provenance after diagnostic set', () => {
      mod.setAudience('empresa', 'diagnostic');
      const prov = mod.getProvenance();
      expect(prov).toEqual({ value: 'empresa', source: 'diagnostic', level: 4 });
    });

    it('returns cookie provenance after cookie set', () => {
      mod.setAudience('empresa', 'cookie');
      const prov = mod.getProvenance();
      expect(prov).toEqual({ value: 'empresa', source: 'cookie', level: 5 });
    });
  });

  describe('subscribe / unsubscribe', () => {
    it('subscriber receives change notification', () => {
      const calls = [];
      mod.subscribe((val) => calls.push(val));
      mod.setAudience('empresa', 'toggle');
      expect(calls).toEqual(['empresa']);
    });

    it('subscriber receives provenance-aware notification object', () => {
      const calls = [];
      mod.subscribe((val, prov) => calls.push({ val, prov }));
      mod.setAudience('empresa', 'toggle');
      expect(calls[0].val).toBe('empresa');
      expect(calls[0].prov).toEqual({ value: 'empresa', source: 'toggle', level: 2 });
    });

    it('does NOT notify when value is the same', () => {
      const calls = [];
      mod.subscribe((val) => calls.push(val));
      // default is persona; setting persona again via lower source should not notify
      mod.setAudience('persona', 'cookie');
      expect(calls).toEqual([]);
    });

    it('does NOT notify when lower-priority source is rejected', async () => {
      vi.resetModules();
      stubLocation('https://metodologia.info/?audiencia=empresa');
      mod = await import('../../js/audience/state.js');
      const calls = [];
      mod.subscribe((val) => calls.push(val));
      mod.setAudience('persona', 'diagnostic'); // lower priority, rejected
      expect(calls).toEqual([]);
    });

    it('unsubscribe stops notifications', () => {
      const calls = [];
      const handler = (val) => calls.push(val);
      mod.subscribe(handler);
      mod.setAudience('empresa', 'toggle');
      mod.unsubscribe(handler);
      mod.setAudience('persona', 'toggle');
      expect(calls).toEqual(['empresa']);
    });

    it('multiple subscribers all receive notifications', () => {
      const a = [];
      const b = [];
      mod.subscribe((val) => a.push(val));
      mod.subscribe((val) => b.push(val));
      mod.setAudience('empresa', 'toggle');
      expect(a).toEqual(['empresa']);
      expect(b).toEqual(['empresa']);
    });
  });
});
