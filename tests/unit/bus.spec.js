import { describe, it, expect, beforeEach } from 'vitest';
import { on, off, emit, once, clear } from '../../js/state/bus.js';

describe('bus', () => {
  beforeEach(() => {
    clear();
  });

  describe('on + emit', () => {
    it('should subscribe and receive events', () => {
      const calls = [];
      on('test', (data) => calls.push(data));
      emit('test', 'hello');
      expect(calls).toEqual(['hello']);
    });

    it('should pass data payload correctly', () => {
      const calls = [];
      on('payload', (data) => calls.push(data));
      const payload = { id: 1, name: 'demo' };
      emit('payload', payload);
      expect(calls[0]).toBe(payload);
    });

    it('should support multiple listeners on same event', () => {
      const a = [];
      const b = [];
      on('multi', (d) => a.push(d));
      on('multi', (d) => b.push(d));
      emit('multi', 42);
      expect(a).toEqual([42]);
      expect(b).toEqual([42]);
    });
  });

  describe('off', () => {
    it('should unsubscribe and stop receiving events', () => {
      const calls = [];
      const handler = (d) => calls.push(d);
      on('unsub', handler);
      emit('unsub', 1);
      off('unsub', handler);
      emit('unsub', 2);
      expect(calls).toEqual([1]);
    });
  });

  describe('once', () => {
    it('should fire only once then auto-remove', () => {
      const calls = [];
      once('single', (d) => calls.push(d));
      emit('single', 'a');
      emit('single', 'b');
      expect(calls).toEqual(['a']);
    });
  });

  describe('emit with no listeners', () => {
    it('should not throw when emitting with no listeners', () => {
      expect(() => emit('nobody')).not.toThrow();
    });

    it('should not throw when emitting with no listeners and data', () => {
      expect(() => emit('nobody', { x: 1 })).not.toThrow();
    });
  });

  describe('clear', () => {
    it('should remove all listeners', () => {
      const calls = [];
      on('a', (d) => calls.push(d));
      on('b', (d) => calls.push(d));
      clear();
      emit('a', 1);
      emit('b', 2);
      expect(calls).toEqual([]);
    });
  });
});
