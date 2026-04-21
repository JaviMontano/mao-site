import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

const STORAGE_KEY = 'mdg_diagnostic';
const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

describe('DiagnosticState', () => {
  let mod;
  let store;
  const NOW = 1700000000000; // fixed timestamp for deterministic tests

  function makeStore(initial = {}) {
    store = { ...initial };
    vi.stubGlobal('localStorage', {
      getItem: vi.fn((key) => store[key] ?? null),
      setItem: vi.fn((key, val) => { store[key] = String(val); }),
      removeItem: vi.fn((key) => { delete store[key]; }),
    });
  }

  beforeEach(async () => {
    vi.resetModules();
    vi.useFakeTimers();
    vi.setSystemTime(NOW);
    makeStore();
    mod = await import('../../js/diagnostic/state.js');
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  // ── 1. Initial state is idle ────────────────────────────────────────
  describe('initial state', () => {
    it('returns idle status when localStorage is empty', () => {
      const state = mod.getState();
      expect(state.status).toBe('idle');
    });

    it('returns default shape with null fields', () => {
      const state = mod.getState();
      expect(state).toMatchObject({
        status: 'idle',
        step: 0,
        answers: {},
        startedAt: null,
        completedAt: null,
      });
    });
  });

  // ── 2. startDiagnostic transitions to in_progress ──────────────────
  describe('startDiagnostic', () => {
    it('transitions from idle to in_progress', () => {
      mod.startDiagnostic();
      expect(mod.getState().status).toBe('in_progress');
    });

    it('sets step to 1', () => {
      mod.startDiagnostic();
      expect(mod.getState().step).toBe(1);
    });

    it('records startedAt as current timestamp', () => {
      mod.startDiagnostic();
      expect(mod.getState().startedAt).toBe(NOW);
    });

    it('initializes empty answers object', () => {
      mod.startDiagnostic();
      expect(mod.getState().answers).toEqual({});
    });

    it('does not transition if already in_progress', () => {
      mod.startDiagnostic();
      const firstStart = mod.getState().startedAt;
      vi.setSystemTime(NOW + 5000);
      mod.startDiagnostic();
      // startedAt should remain the same — no restart
      expect(mod.getState().startedAt).toBe(firstStart);
    });
  });

  // ── 3. saveAnswer stores answer and advances step ──────────────────
  describe('saveAnswer', () => {
    beforeEach(() => {
      mod.startDiagnostic();
    });

    it('stores the answer keyed by questionId', () => {
      mod.saveAnswer('q1', 'a1');
      expect(mod.getState().answers.q1).toBe('a1');
    });

    it('advances step by 1', () => {
      expect(mod.getState().step).toBe(1);
      mod.saveAnswer('q1', 'a1');
      expect(mod.getState().step).toBe(2);
    });

    it('accumulates multiple answers', () => {
      mod.saveAnswer('q1', 'a1');
      mod.saveAnswer('q2', 'a2');
      mod.saveAnswer('q3', 'a3');
      const state = mod.getState();
      expect(state.answers).toEqual({ q1: 'a1', q2: 'a2', q3: 'a3' });
      expect(state.step).toBe(4);
    });

    it('overwrites answer if same questionId is saved again', () => {
      mod.saveAnswer('q1', 'a1');
      mod.saveAnswer('q1', 'a1_revised');
      expect(mod.getState().answers.q1).toBe('a1_revised');
    });
  });

  // ── 4. completeDiagnostic stores result, sets synced=false ─────────
  describe('completeDiagnostic', () => {
    const result = { nivel_id: 'nivel_2', score: 75 };

    beforeEach(() => {
      mod.startDiagnostic();
      mod.saveAnswer('q1', 'a1');
      mod.saveAnswer('q2', 'a2');
    });

    it('transitions to completed status', () => {
      mod.completeDiagnostic(result);
      expect(mod.getState().status).toBe('completed');
    });

    it('stores the result object (nivel_id, score)', () => {
      mod.completeDiagnostic(result);
      const state = mod.getState();
      expect(state.result).toEqual(result);
    });

    it('records completedAt timestamp', () => {
      vi.setSystemTime(NOW + 60000);
      mod.completeDiagnostic(result);
      expect(mod.getState().completedAt).toBe(NOW + 60000);
    });

    it('sets synced to false', () => {
      mod.completeDiagnostic(result);
      expect(mod.getState().synced).toBe(false);
    });

    it('sets pending_sync to true', () => {
      mod.completeDiagnostic(result);
      expect(mod.getState().pending_sync).toBe(true);
    });

    it('initializes sync_failures to 0', () => {
      mod.completeDiagnostic(result);
      expect(mod.getState().sync_failures).toBe(0);
    });
  });

  // ── 5. markSynced clears pending_sync ──────────────────────────────
  describe('markSynced', () => {
    beforeEach(() => {
      mod.startDiagnostic();
      mod.completeDiagnostic({ nivel_id: 'nivel_1', score: 50 });
    });

    it('sets synced to true', () => {
      mod.markSynced();
      expect(mod.getState().synced).toBe(true);
    });

    it('clears pending_sync flag', () => {
      mod.markSynced();
      expect(mod.getState().pending_sync).toBe(false);
    });
  });

  // ── 6. markSyncFailed increments counter ───────────────────────────
  describe('markSyncFailed', () => {
    beforeEach(() => {
      mod.startDiagnostic();
      mod.completeDiagnostic({ nivel_id: 'nivel_1', score: 50 });
    });

    it('increments sync_failures by 1', () => {
      mod.markSyncFailed();
      expect(mod.getState().sync_failures).toBe(1);
    });

    it('increments cumulatively on repeated calls', () => {
      mod.markSyncFailed();
      mod.markSyncFailed();
      mod.markSyncFailed();
      expect(mod.getState().sync_failures).toBe(3);
    });

    it('records sync_attempt_ts', () => {
      vi.setSystemTime(NOW + 10000);
      mod.markSyncFailed();
      expect(mod.getState().sync_attempt_ts).toBe(NOW + 10000);
    });
  });

  // ── 7. shouldRetrySync returns false after 3 failures ──────────────
  describe('shouldRetrySync', () => {
    beforeEach(() => {
      mod.startDiagnostic();
      mod.completeDiagnostic({ nivel_id: 'nivel_1', score: 50 });
    });

    it('returns true when pending_sync and failures < 3', () => {
      expect(mod.shouldRetrySync()).toBe(true);
    });

    it('returns true after 1 failure', () => {
      mod.markSyncFailed();
      expect(mod.shouldRetrySync()).toBe(true);
    });

    it('returns true after 2 failures', () => {
      mod.markSyncFailed();
      mod.markSyncFailed();
      expect(mod.shouldRetrySync()).toBe(true);
    });

    it('returns false after 3 failures', () => {
      mod.markSyncFailed();
      mod.markSyncFailed();
      mod.markSyncFailed();
      expect(mod.shouldRetrySync()).toBe(false);
    });

    it('returns false when already synced', () => {
      mod.markSynced();
      expect(mod.shouldRetrySync()).toBe(false);
    });

    it('returns false when status is idle (no pending sync)', () => {
      mod.resetState();
      expect(mod.shouldRetrySync()).toBe(false);
    });
  });

  // ── 8. resetState clears everything ────────────────────────────────
  describe('resetState', () => {
    it('returns to idle status', () => {
      mod.startDiagnostic();
      mod.saveAnswer('q1', 'a1');
      mod.completeDiagnostic({ nivel_id: 'nivel_3', score: 90 });
      mod.resetState();
      expect(mod.getState().status).toBe('idle');
    });

    it('clears answers', () => {
      mod.startDiagnostic();
      mod.saveAnswer('q1', 'a1');
      mod.resetState();
      expect(mod.getState().answers).toEqual({});
    });

    it('resets step to 0', () => {
      mod.startDiagnostic();
      mod.saveAnswer('q1', 'a1');
      mod.resetState();
      expect(mod.getState().step).toBe(0);
    });

    it('clears timestamps', () => {
      mod.startDiagnostic();
      mod.resetState();
      const state = mod.getState();
      expect(state.startedAt).toBeNull();
      expect(state.completedAt).toBeNull();
    });

    it('clears sync state to defaults', () => {
      mod.startDiagnostic();
      mod.completeDiagnostic({ nivel_id: 'nivel_1', score: 50 });
      mod.markSyncFailed();
      mod.resetState();
      const state = mod.getState();
      expect(state.synced).toBe(false);
      expect(state.pending_sync).toBe(false);
      expect(state.sync_failures).toBe(0);
    });

    it('persists idle state to localStorage on reset', () => {
      mod.startDiagnostic();
      localStorage.setItem.mockClear();
      mod.resetState();
      expect(localStorage.setItem).toHaveBeenCalledWith(
        STORAGE_KEY,
        expect.any(String),
      );
      const saved = JSON.parse(
        localStorage.setItem.mock.calls.find((c) => c[0] === STORAGE_KEY)[1],
      );
      expect(saved.status).toBe('idle');
    });
  });

  // ── 9. isExpired returns true after 24h ────────────────────────────
  describe('isExpired', () => {
    it('returns false when state is idle', () => {
      expect(mod.isExpired()).toBe(false);
    });

    it('returns false immediately after starting', () => {
      mod.startDiagnostic();
      expect(mod.isExpired()).toBe(false);
    });

    it('returns false at 23h 59m', () => {
      mod.startDiagnostic();
      vi.setSystemTime(NOW + TWENTY_FOUR_HOURS - 60000);
      expect(mod.isExpired()).toBe(false);
    });

    it('returns true at 24h + 1ms', () => {
      mod.startDiagnostic();
      vi.setSystemTime(NOW + TWENTY_FOUR_HOURS + 1);
      expect(mod.isExpired()).toBe(true);
    });

    it('returns true well past 24h', () => {
      mod.startDiagnostic();
      vi.setSystemTime(NOW + TWENTY_FOUR_HOURS + 3600000);
      expect(mod.isExpired()).toBe(true);
    });

    it('expired state resets to idle on getState', () => {
      mod.startDiagnostic();
      vi.setSystemTime(NOW + TWENTY_FOUR_HOURS + 1);
      const state = mod.getState();
      expect(state.status).toBe('idle');
    });
  });

  // ── 10. State persists to localStorage ─────────────────────────────
  describe('localStorage persistence (write)', () => {
    it('persists on startDiagnostic', () => {
      mod.startDiagnostic();
      expect(localStorage.setItem).toHaveBeenCalledWith(
        STORAGE_KEY,
        expect.any(String),
      );
    });

    it('persists on saveAnswer', () => {
      mod.startDiagnostic();
      localStorage.setItem.mockClear();
      mod.saveAnswer('q1', 'a1');
      expect(localStorage.setItem).toHaveBeenCalledWith(
        STORAGE_KEY,
        expect.any(String),
      );
    });

    it('persists on completeDiagnostic', () => {
      mod.startDiagnostic();
      localStorage.setItem.mockClear();
      mod.completeDiagnostic({ nivel_id: 'nivel_1', score: 50 });
      expect(localStorage.setItem).toHaveBeenCalledWith(
        STORAGE_KEY,
        expect.any(String),
      );
    });

    it('persists on markSynced', () => {
      mod.startDiagnostic();
      mod.completeDiagnostic({ nivel_id: 'nivel_1', score: 50 });
      localStorage.setItem.mockClear();
      mod.markSynced();
      expect(localStorage.setItem).toHaveBeenCalledWith(
        STORAGE_KEY,
        expect.any(String),
      );
    });

    it('persists on markSyncFailed', () => {
      mod.startDiagnostic();
      mod.completeDiagnostic({ nivel_id: 'nivel_1', score: 50 });
      localStorage.setItem.mockClear();
      mod.markSyncFailed();
      expect(localStorage.setItem).toHaveBeenCalledWith(
        STORAGE_KEY,
        expect.any(String),
      );
    });

    it('stored value is valid JSON', () => {
      mod.startDiagnostic();
      const raw = localStorage.setItem.mock.calls.find(
        (c) => c[0] === STORAGE_KEY,
      )[1];
      expect(() => JSON.parse(raw)).not.toThrow();
    });
  });

  // ── 11. State loads from localStorage on init ──────────────────────
  describe('localStorage persistence (read on init)', () => {
    it('restores in_progress state from localStorage', async () => {
      const saved = JSON.stringify({
        status: 'in_progress',
        step: 3,
        answers: { q1: 'a1', q2: 'a2' },
        startedAt: NOW - 1000,
        completedAt: null,
      });

      vi.resetModules();
      vi.setSystemTime(NOW);
      makeStore({ [STORAGE_KEY]: saved });
      mod = await import('../../js/diagnostic/state.js');

      const state = mod.getState();
      expect(state.status).toBe('in_progress');
      expect(state.step).toBe(3);
      expect(state.answers).toEqual({ q1: 'a1', q2: 'a2' });
    });

    it('restores completed state with sync metadata', async () => {
      const saved = JSON.stringify({
        status: 'completed',
        step: 6,
        answers: { q1: 'a1' },
        startedAt: NOW - 5000,
        completedAt: NOW - 1000,
        result: { nivel_id: 'nivel_2', score: 75 },
        synced: false,
        pending_sync: true,
        sync_failures: 1,
        sync_attempt_ts: NOW - 2000,
      });

      vi.resetModules();
      vi.setSystemTime(NOW);
      makeStore({ [STORAGE_KEY]: saved });
      mod = await import('../../js/diagnostic/state.js');

      const state = mod.getState();
      expect(state.status).toBe('completed');
      expect(state.result).toEqual({ nivel_id: 'nivel_2', score: 75 });
      expect(state.synced).toBe(false);
      expect(state.pending_sync).toBe(true);
      expect(state.sync_failures).toBe(1);
    });

    it('resets to idle if loaded state is expired (>24h)', async () => {
      const saved = JSON.stringify({
        status: 'in_progress',
        step: 2,
        answers: { q1: 'a1' },
        startedAt: NOW - TWENTY_FOUR_HOURS - 1,
        completedAt: null,
      });

      vi.resetModules();
      vi.setSystemTime(NOW);
      makeStore({ [STORAGE_KEY]: saved });
      mod = await import('../../js/diagnostic/state.js');

      const state = mod.getState();
      expect(state.status).toBe('idle');
    });

    it('handles corrupted localStorage gracefully', async () => {
      vi.resetModules();
      vi.setSystemTime(NOW);
      makeStore({ [STORAGE_KEY]: 'NOT_VALID_JSON{{{' });
      mod = await import('../../js/diagnostic/state.js');

      const state = mod.getState();
      expect(state.status).toBe('idle');
    });

    it('handles missing localStorage key gracefully', async () => {
      vi.resetModules();
      vi.setSystemTime(NOW);
      makeStore({});
      mod = await import('../../js/diagnostic/state.js');

      const state = mod.getState();
      expect(state.status).toBe('idle');
    });
  });

  // ── Edge cases ─────────────────────────────────────────────────────
  describe('edge cases', () => {
    it('completeDiagnostic is no-op if status is idle', () => {
      mod.completeDiagnostic({ nivel_id: 'nivel_1', score: 50 });
      expect(mod.getState().status).toBe('idle');
    });

    it('saveAnswer is no-op if status is idle', () => {
      mod.saveAnswer('q1', 'a1');
      expect(mod.getState().answers).toEqual({});
    });

    it('can restart after reset', () => {
      mod.startDiagnostic();
      mod.resetState();
      mod.startDiagnostic();
      expect(mod.getState().status).toBe('in_progress');
      expect(mod.getState().step).toBe(1);
    });

    it('can restart after completion + reset', () => {
      mod.startDiagnostic();
      mod.completeDiagnostic({ nivel_id: 'nivel_1', score: 50 });
      mod.resetState();
      mod.startDiagnostic();
      expect(mod.getState().status).toBe('in_progress');
      expect(mod.getState().result).toBeNull();
    });
  });
});
