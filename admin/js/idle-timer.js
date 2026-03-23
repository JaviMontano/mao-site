/**
 * Idle timeout — auto sign-out after 8 hours of inactivity.
 * Tracks click/keypress/mousemove. Uses sessionStorage for refresh survival.
 * @module admin/js/idle-timer
 */

const TIMEOUT_MS = 8 * 60 * 60 * 1000; // 8 hours
const STORAGE_KEY = 'idle_timer_last_activity';
const ACTIVITY_EVENTS = ['click', 'keypress', 'mousemove'];

export const IdleTimer = {
  _timer: null,
  _onTimeout: null,

  /**
   * Start the idle timer.
   * @param {Function} onTimeout - called when timeout expires (should sign out)
   */
  start(onTimeout) {
    this._onTimeout = onTimeout;

    // Check if we have a stored timestamp from a previous page load
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      const elapsed = Date.now() - parseInt(stored, 10);
      if (elapsed >= TIMEOUT_MS) {
        onTimeout();
        return;
      }
    }

    this._resetTimer();

    // Track user activity
    ACTIVITY_EVENTS.forEach((event) => {
      document.addEventListener(event, () => this._resetTimer(), { passive: true });
    });
  },

  /**
   * Stop the idle timer and remove listeners.
   */
  stop() {
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
    ACTIVITY_EVENTS.forEach((event) => {
      document.removeEventListener(event, this._resetTimer);
    });
    sessionStorage.removeItem(STORAGE_KEY);
  },

  _resetTimer() {
    if (this._timer) clearTimeout(this._timer);
    sessionStorage.setItem(STORAGE_KEY, String(Date.now()));
    this._timer = setTimeout(() => {
      if (this._onTimeout) this._onTimeout();
    }, TIMEOUT_MS);
  },
};
