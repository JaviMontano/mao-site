/**
 * bus.js — Lightweight pub/sub event bus
 * Pure ES module, zero dependencies.
 */

/** @type {Map<string, Set<Function>>} */
const listeners = new Map();

/**
 * Subscribe to an event.
 * @param {string} event
 * @param {Function} callback
 */
export function on(event, callback) {
  if (!listeners.has(event)) {
    listeners.set(event, new Set());
  }
  listeners.get(event).add(callback);
}

/**
 * Unsubscribe from an event.
 * @param {string} event
 * @param {Function} callback
 */
export function off(event, callback) {
  const cbs = listeners.get(event);
  if (cbs) {
    cbs.delete(callback);
  }
}

/**
 * Publish an event to all subscribers.
 * @param {string} event
 * @param {*} data
 */
export function emit(event, data) {
  const cbs = listeners.get(event);
  if (cbs) {
    for (const cb of cbs) {
      cb(data);
    }
  }
}

/**
 * Subscribe once — auto-unsubscribes after the first call.
 * @param {string} event
 * @param {Function} callback
 */
export function once(event, callback) {
  const wrapper = (data) => {
    off(event, wrapper);
    callback(data);
  };
  on(event, wrapper);
}

/**
 * Clear all listeners (useful for testing).
 */
export function clear() {
  listeners.clear();
}
