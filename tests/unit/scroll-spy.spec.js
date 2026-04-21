import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createScrollSpy } from '../../js/sidebar/scroll-spy.js';

describe('scroll-spy', () => {
  let mockObserve;
  let mockDisconnect;
  let observerCallback;

  beforeEach(() => {
    vi.restoreAllMocks();

    mockObserve = vi.fn();
    mockDisconnect = vi.fn();
    observerCallback = null;

    vi.stubGlobal('IntersectionObserver', vi.fn((cb) => {
      observerCallback = cb;
      return { observe: mockObserve, disconnect: mockDisconnect };
    }));

    vi.stubGlobal('document', {
      querySelectorAll: vi.fn(() => [
        { id: 'hero' },
        { id: 'features' },
        { id: 'pricing' },
      ]),
    });
  });

  describe('createScrollSpy returns correct API', () => {
    it('should return object with observe, disconnect, getActive', () => {
      const spy = createScrollSpy({ onActivate: vi.fn() });
      expect(spy).toHaveProperty('observe');
      expect(spy).toHaveProperty('disconnect');
      expect(spy).toHaveProperty('getActive');
      expect(typeof spy.observe).toBe('function');
      expect(typeof spy.disconnect).toBe('function');
      expect(typeof spy.getActive).toBe('function');
    });
  });

  describe('observe creates IntersectionObserver with correct options', () => {
    it('should create observer with default rootMargin and threshold', () => {
      const spy = createScrollSpy({ onActivate: vi.fn() });
      spy.observe();

      expect(IntersectionObserver).toHaveBeenCalledWith(
        expect.any(Function),
        { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
      );
    });

    it('should observe all elements matching default sectionSelector', () => {
      const spy = createScrollSpy({ onActivate: vi.fn() });
      spy.observe();

      expect(document.querySelectorAll).toHaveBeenCalledWith('section[id]');
      expect(mockObserve).toHaveBeenCalledTimes(3);
      expect(mockObserve).toHaveBeenCalledWith({ id: 'hero' });
      expect(mockObserve).toHaveBeenCalledWith({ id: 'features' });
      expect(mockObserve).toHaveBeenCalledWith({ id: 'pricing' });
    });

    it('should use custom sectionSelector when provided', () => {
      const spy = createScrollSpy({
        sectionSelector: '.scroll-section',
        onActivate: vi.fn(),
      });
      spy.observe();

      expect(document.querySelectorAll).toHaveBeenCalledWith('.scroll-section');
    });

    it('should accept custom rootMargin and threshold', () => {
      const spy = createScrollSpy({
        rootMargin: '-20% 0px -30% 0px',
        threshold: 0.5,
        onActivate: vi.fn(),
      });
      spy.observe();

      expect(IntersectionObserver).toHaveBeenCalledWith(
        expect.any(Function),
        { rootMargin: '-20% 0px -30% 0px', threshold: 0.5 }
      );
    });
  });

  describe('onActivate called when section becomes visible', () => {
    it('should call onActivate with section id on intersection', () => {
      const onActivate = vi.fn();
      const spy = createScrollSpy({ onActivate });
      spy.observe();

      observerCallback([
        { isIntersecting: true, target: { id: 'features' } },
      ]);

      expect(onActivate).toHaveBeenCalledWith('features');
    });

    it('should not call onActivate when section exits viewport', () => {
      const onActivate = vi.fn();
      const spy = createScrollSpy({ onActivate });
      spy.observe();

      observerCallback([
        { isIntersecting: false, target: { id: 'hero' } },
      ]);

      expect(onActivate).not.toHaveBeenCalled();
    });

    it('should handle multiple entries, activating only intersecting ones', () => {
      const onActivate = vi.fn();
      const spy = createScrollSpy({ onActivate });
      spy.observe();

      observerCallback([
        { isIntersecting: false, target: { id: 'hero' } },
        { isIntersecting: true, target: { id: 'pricing' } },
      ]);

      expect(onActivate).toHaveBeenCalledTimes(1);
      expect(onActivate).toHaveBeenCalledWith('pricing');
    });
  });

  describe('getActive returns current section', () => {
    it('should return null before any intersection', () => {
      const spy = createScrollSpy({ onActivate: vi.fn() });
      expect(spy.getActive()).toBeNull();
    });

    it('should return the last activated section id', () => {
      const spy = createScrollSpy({ onActivate: vi.fn() });
      spy.observe();

      observerCallback([
        { isIntersecting: true, target: { id: 'hero' } },
      ]);
      expect(spy.getActive()).toBe('hero');

      observerCallback([
        { isIntersecting: true, target: { id: 'features' } },
      ]);
      expect(spy.getActive()).toBe('features');
    });
  });

  describe('disconnect cleans up observer', () => {
    it('should call disconnect on the IntersectionObserver instance', () => {
      const spy = createScrollSpy({ onActivate: vi.fn() });
      spy.observe();
      spy.disconnect();

      expect(mockDisconnect).toHaveBeenCalledTimes(1);
    });

    it('should not throw if disconnect called before observe', () => {
      const spy = createScrollSpy({ onActivate: vi.fn() });
      expect(() => spy.disconnect()).not.toThrow();
    });
  });
});
