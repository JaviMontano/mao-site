/**
 * shell.js — Page shell bootstrap.
 *
 * Common entry point imported by every page. Initialises all shell
 * components (header, sidebar, toggle, offline pill, consent banner),
 * wires bus events, and kicks off the audience + theme controllers.
 *
 * Called on DOMContentLoaded by each page's inline script.
 *
 * Anti-FOUC note: theme is restored from localStorage in an inline
 * <script> in the HTML *before* CSS loads. This module only sets up
 * the interactive toggle behaviour after the DOM is ready.
 */

// --- Component imports (self-register on import) ---
import '../../components/SiteHeader.js';
import '../../components/SiteSidebar.js';
import '../../components/TripleToggle.js';
import '../../components/OfflinePill.js';
import '../../components/ConsentBanner.js';

// --- Module imports ---
import { initTheme } from '../theme/toggle.js';
import { initAudienceController, hydrateSlots } from '../audience/controller.js';
import { getAudience } from '../audience/state.js';
import { on } from '../state/bus.js';
import { initLegacyRouter, checkRedirect } from '../redirects/legacy-router.js';

/**
 * Initialise the page shell.
 *
 * @param {object} options
 * @param {string} options.pageSlug      — page identifier for slot resolution
 * @param {object} options.dictionaries  — i18n dictionary tree
 * @param {object} [options.firestoreSlots] — CMS overrides from Firestore
 * @param {boolean} [options.cmsEnabled] — whether Firestore slots are active
 * @param {string} [options.locale]      — current locale (default "es")
 */
export function initShell(options = {}) {
  const {
    pageSlug,
    dictionaries = {},
    firestoreSlots = {},
    cmsEnabled = false,
    locale = 'es',
  } = options;

  // ------------------------------------------------------------------
  // 1. Check legacy redirects — bail early if the URL should redirect
  // ------------------------------------------------------------------
  const redirect = checkRedirect(window.location.pathname);
  if (redirect) {
    window.location.replace(redirect.target);
    return;
  }

  // ------------------------------------------------------------------
  // 2. Anti-FOUC theme restore is handled by inline <script> in HTML.
  //    Nothing to do here — step kept as documentation of the sequence.
  // ------------------------------------------------------------------

  // ------------------------------------------------------------------
  // 3. Initialise theme module (interactive toggle, system preference)
  // ------------------------------------------------------------------
  initTheme();

  // ------------------------------------------------------------------
  // 4. Initialise audience controller (slot hydration + toggle wiring)
  // ------------------------------------------------------------------
  initAudienceController({
    pageSlug,
    locale,
    dictionaries,
    firestoreSlots,
    cmsEnabled,
  });

  // ------------------------------------------------------------------
  // 5. Custom elements — all self-register on import. The guards below
  //    are a safety net against double-define if scripts load twice.
  //    (SiteHeader already has an internal guard; others rely on the
  //    import-once semantics of ES modules.)
  // ------------------------------------------------------------------

  // ------------------------------------------------------------------
  // 6. Wire bus events
  // ------------------------------------------------------------------

  // Header hamburger → sidebar drawer
  on('mdg:sidebar-toggle', () => {
    const sidebar = document.querySelector('site-sidebar');
    if (sidebar && typeof sidebar.toggle === 'function') {
      sidebar.toggle();
    }
  });

  // Language change → re-hydrate all slots with new locale
  on('langchange', (data) => {
    const newLocale = (data && data.locale) || locale;
    const audience = getAudience();
    hydrateSlots(pageSlug, audience, newLocale, {
      dictionaries,
      firestoreSlots,
      cmsEnabled,
    });
  });

  // ------------------------------------------------------------------
  // 7. Legacy router as fallback (handles any remaining /ruta/* paths)
  // ------------------------------------------------------------------
  initLegacyRouter();
}
