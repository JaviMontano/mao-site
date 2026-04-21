import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock consent module
vi.mock('../../js/analytics/consent.js', () => ({
  hasAnalyticsConsent: vi.fn(() => false),
}));

// Mock audience state
vi.mock('../../js/audience/state.js', () => ({
  getAudience: vi.fn(() => 'persona'),
}));

// Mock bus
vi.mock('../../js/state/bus.js', () => ({
  on: vi.fn(),
  emit: vi.fn(),
}));

describe('analytics/events', () => {
  let trackEvent, trackPageView, setUserProperties, _initBusListener;
  let consent, audienceState, bus;
  let firebaseLogEvent, firebaseSetUserProperties;

  beforeEach(async () => {
    vi.resetModules();
    vi.restoreAllMocks();

    // Re-mock after resetModules
    vi.doMock('../../js/analytics/consent.js', () => ({
      hasAnalyticsConsent: vi.fn(() => false),
    }));
    vi.doMock('../../js/audience/state.js', () => ({
      getAudience: vi.fn(() => 'persona'),
    }));
    vi.doMock('../../js/state/bus.js', () => ({
      on: vi.fn(),
      emit: vi.fn(),
    }));

    // Mock Firebase Analytics — simulate window.firebaseAnalytics
    firebaseLogEvent = vi.fn();
    firebaseSetUserProperties = vi.fn();
    vi.stubGlobal('window', {
      ...globalThis.window,
      firebaseAnalytics: {
        logEvent: firebaseLogEvent,
        setUserProperties: firebaseSetUserProperties,
      },
    });

    // Stub document.documentElement for locale/theme
    vi.stubGlobal('document', {
      documentElement: {
        lang: 'es',
        getAttribute: vi.fn((attr) => {
          if (attr === 'data-theme') return 'light';
          if (attr === 'lang') return 'es';
          return null;
        }),
      },
    });

    // Stub Date.now for deterministic timestamps
    vi.spyOn(Date, 'now').mockReturnValue(1700000000000);

    // Import fresh module + mocks
    const mod = await import('../../js/analytics/events.js');
    trackEvent = mod.trackEvent;
    trackPageView = mod.trackPageView;
    setUserProperties = mod.setUserProperties;
    _initBusListener = mod._initBusListener;

    consent = (await import('../../js/analytics/consent.js'));
    audienceState = (await import('../../js/audience/state.js'));
    bus = (await import('../../js/state/bus.js'));
  });

  // ── Test 1: trackEvent skips when no consent ──
  describe('consent gating', () => {
    it('should silently skip when analytics consent is not granted', () => {
      consent.hasAnalyticsConsent.mockReturnValue(false);

      trackEvent('cta_click_primary', { cta_label: 'Empieza' });

      expect(firebaseLogEvent).not.toHaveBeenCalled();
    });

    // ── Test 2: trackEvent fires when consent granted ──
    it('should fire event when consent is granted', () => {
      consent.hasAnalyticsConsent.mockReturnValue(true);

      trackEvent('cta_click_primary', { cta_label: 'Empieza' });

      expect(firebaseLogEvent).toHaveBeenCalledTimes(1);
      expect(firebaseLogEvent).toHaveBeenCalledWith(
        'cta_click_primary',
        expect.objectContaining({ cta_label: 'Empieza' }),
      );
    });
  });

  // ── Test 3: trackEvent includes audience field automatically ──
  describe('automatic envelope fields', () => {
    it('should auto-include audience, locale, theme, and timestamp', () => {
      consent.hasAnalyticsConsent.mockReturnValue(true);
      audienceState.getAudience.mockReturnValue('empresa');

      trackEvent('home_view', { returning: false });

      expect(firebaseLogEvent).toHaveBeenCalledWith(
        'home_view',
        expect.objectContaining({
          audience: 'empresa',
          locale: 'es',
          theme: 'light',
          timestamp: 1700000000000,
          returning: false,
        }),
      );
    });

    it('should not overwrite explicit params with envelope defaults', () => {
      consent.hasAnalyticsConsent.mockReturnValue(true);

      trackEvent('test_event', { audience: 'custom_override' });

      // Envelope audience should NOT override explicit params
      const payload = firebaseLogEvent.mock.calls[0][1];
      expect(payload.audience).toBe('custom_override');
    });
  });

  // ── Test 4: trackPageView fires page_view event ──
  describe('trackPageView', () => {
    it('should fire page_view event with slug and audience', () => {
      consent.hasAnalyticsConsent.mockReturnValue(true);
      audienceState.getAudience.mockReturnValue('persona');

      trackPageView('diagnostico');

      expect(firebaseLogEvent).toHaveBeenCalledWith(
        'page_view',
        expect.objectContaining({
          page_slug: 'diagnostico',
          audience: 'persona',
        }),
      );
    });

    it('should skip page_view when no consent', () => {
      consent.hasAnalyticsConsent.mockReturnValue(false);

      trackPageView('home');

      expect(firebaseLogEvent).not.toHaveBeenCalled();
    });
  });

  // ── Test 5: setUserProperties calls Firebase setUserProperties ──
  describe('setUserProperties', () => {
    it('should call Firebase setUserProperties with given props', () => {
      consent.hasAnalyticsConsent.mockReturnValue(true);

      setUserProperties({ audience: 'empresa', locale: 'en', theme: 'dark' });

      expect(firebaseSetUserProperties).toHaveBeenCalledWith(
        expect.objectContaining({
          audience: 'empresa',
          locale: 'en',
          theme: 'dark',
        }),
      );
    });

    it('should skip setUserProperties when no consent', () => {
      consent.hasAnalyticsConsent.mockReturnValue(false);

      setUserProperties({ audience: 'persona' });

      expect(firebaseSetUserProperties).not.toHaveBeenCalled();
    });
  });

  // ── Test 6: audience_switched event fired on audience change ──
  describe('audience_switched event', () => {
    it('should register a bus listener for audience_changed', () => {
      // _initBusListener is called on module load; verify bus.on was called
      expect(bus.on).toHaveBeenCalledWith('audience_changed', expect.any(Function));
    });

    it('should fire audience_switched event when audience changes', () => {
      consent.hasAnalyticsConsent.mockReturnValue(true);

      // Extract the callback registered on the bus
      const onCall = bus.on.mock.calls.find(([event]) => event === 'audience_changed');
      expect(onCall).toBeTruthy();
      const handler = onCall[1];

      // Simulate audience change
      handler({ from: 'persona', to: 'empresa' });

      expect(firebaseLogEvent).toHaveBeenCalledWith(
        'audience_switched',
        expect.objectContaining({
          from: 'persona',
          to: 'empresa',
        }),
      );
    });

    it('should skip audience_switched when no consent', () => {
      consent.hasAnalyticsConsent.mockReturnValue(false);

      const onCall = bus.on.mock.calls.find(([event]) => event === 'audience_changed');
      const handler = onCall[1];

      handler({ from: 'empresa', to: 'persona' });

      expect(firebaseLogEvent).not.toHaveBeenCalled();
    });
  });

  // ── Test 7: Fallback to console.debug when Firebase unavailable ──
  describe('Firebase unavailable fallback', () => {
    it('should fallback to console.debug when Firebase analytics is not available', async () => {
      vi.resetModules();

      vi.doMock('../../js/analytics/consent.js', () => ({
        hasAnalyticsConsent: vi.fn(() => true),
      }));
      vi.doMock('../../js/audience/state.js', () => ({
        getAudience: vi.fn(() => 'persona'),
      }));
      vi.doMock('../../js/state/bus.js', () => ({
        on: vi.fn(),
        emit: vi.fn(),
      }));

      // Remove Firebase from window
      vi.stubGlobal('window', {});
      vi.stubGlobal('document', {
        documentElement: {
          lang: 'es',
          getAttribute: vi.fn(() => 'light'),
        },
      });
      vi.spyOn(Date, 'now').mockReturnValue(1700000000000);

      const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

      const mod = await import('../../js/analytics/events.js');

      mod.trackEvent('test_event', { foo: 'bar' });

      expect(debugSpy).toHaveBeenCalledWith(
        '[analytics]',
        'test_event',
        expect.objectContaining({ foo: 'bar' }),
      );

      debugSpy.mockRestore();
    });

    it('should fallback console.debug for setUserProperties when Firebase unavailable', async () => {
      vi.resetModules();

      vi.doMock('../../js/analytics/consent.js', () => ({
        hasAnalyticsConsent: vi.fn(() => true),
      }));
      vi.doMock('../../js/audience/state.js', () => ({
        getAudience: vi.fn(() => 'persona'),
      }));
      vi.doMock('../../js/state/bus.js', () => ({
        on: vi.fn(),
        emit: vi.fn(),
      }));

      vi.stubGlobal('window', {});
      vi.stubGlobal('document', {
        documentElement: {
          lang: 'es',
          getAttribute: vi.fn(() => 'light'),
        },
      });

      const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

      const mod = await import('../../js/analytics/events.js');
      mod.setUserProperties({ audience: 'persona' });

      expect(debugSpy).toHaveBeenCalledWith(
        '[analytics:userProps]',
        expect.objectContaining({ audience: 'persona' }),
      );

      debugSpy.mockRestore();
    });
  });
});
