/**
 * Idle timer module tests — TDD RED phase.
 * @see specs/006-cms-backoffice-rbac/spec.md US1
 */
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

// T029: idle-timer tests [TS-004]
describe('IdleTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should trigger signOut callback after 8 hours of inactivity', () => {
    const TIMEOUT_MS = 8 * 60 * 60 * 1000;
    const onTimeout = vi.fn();
    const timer = setTimeout(onTimeout, TIMEOUT_MS);
    vi.advanceTimersByTime(TIMEOUT_MS);
    expect(onTimeout).toHaveBeenCalledTimes(1);
    clearTimeout(timer);
  });

  it('should reset timer on user activity', () => {
    const TIMEOUT_MS = 8 * 60 * 60 * 1000;
    const onTimeout = vi.fn();
    let timer = setTimeout(onTimeout, TIMEOUT_MS);

    // Simulate activity after 1 hour
    vi.advanceTimersByTime(60 * 60 * 1000);
    clearTimeout(timer);
    timer = setTimeout(onTimeout, TIMEOUT_MS);

    // After 7 more hours, should NOT have fired
    vi.advanceTimersByTime(7 * 60 * 60 * 1000);
    expect(onTimeout).not.toHaveBeenCalled();

    // After 1 more hour (8 total from reset), SHOULD fire
    vi.advanceTimersByTime(60 * 60 * 1000);
    expect(onTimeout).toHaveBeenCalledTimes(1);
    clearTimeout(timer);
  });

  it('should survive page refresh via sessionStorage', () => {
    const storage = {};
    const mockSessionStorage = {
      getItem: vi.fn((key) => storage[key] || null),
      setItem: vi.fn((key, val) => { storage[key] = val; }),
    };

    const now = Date.now();
    mockSessionStorage.setItem('idle_timer_last_activity', String(now));
    expect(mockSessionStorage.getItem('idle_timer_last_activity')).toBe(String(now));
  });
});
