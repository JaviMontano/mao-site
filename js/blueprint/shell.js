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
// ?v=4 cache-bust ensures fresh components
import '../../components/SiteHeader.js?v=4';
import '../../components/SiteSidebar.js?v=4';
import '../../components/SiteFooter.js?v=4';
import '../../components/TripleToggle.js?v=4';
import '../../components/OfflinePill.js?v=4';
import '../../components/ConsentBanner.js?v=4';

// --- Module imports ---
import { initTheme } from '../theme/toggle.js?v=4';
import { initAudienceController, hydrateSlots } from '../audience/controller.js';
import { getAudience } from '../audience/state.js';
import { on } from '../state/bus.js';
import { initLegacyRouter, checkRedirect } from '../redirects/legacy-router.js';

/**
 * Fetch a JSON dictionary, returning {} on failure.
 * @param {string} url
 * @returns {Promise<object>}
 */
async function fetchJSON(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return {};
    return await res.json();
  } catch {
    return {};
  }
}

/**
 * Resolve the base path for dictionary URLs relative to the page.
 * Pages at root use './js/i18n/...', pages in subdirs use '../js/i18n/...'
 */
function dictBasePath() {
  const depth = window.location.pathname.replace(/\/+$/, '').split('/').length - 1;
  return depth >= 1 ? '../' : './';
}

/**
 * Initialise the page shell.
 *
 * @param {object} options
 * @param {string} options.pageSlug — page identifier for slot resolution
 */
export async function initShell(options = {}) {
  const { pageSlug } = options;
  const locale = document.documentElement.lang || 'es';

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
  // ------------------------------------------------------------------

  // ------------------------------------------------------------------
  // 3. Initialise theme module
  // ------------------------------------------------------------------
  initTheme();

  // ------------------------------------------------------------------
  // 4. Load i18n module (classic script) + dictionaries for this page
  // ------------------------------------------------------------------
  const base = dictBasePath();

  // Dynamically load the legacy i18n module if not already present
  if (!window.i18n) {
    await new Promise((resolve) => {
      const s = document.createElement('script');
      s.src = `${base}js/i18n/i18n.js?v=4`;
      s.onload = resolve;
      s.onerror = resolve; // proceed even if it fails
      document.head.appendChild(s);
    });
  }
  const [pageDict, commonDict] = await Promise.all([
    fetchJSON(`${base}js/i18n/dictionaries/${pageSlug}.json`),
    fetchJSON(`${base}js/i18n/dictionaries/common.json`),
  ]);

  // Build dictionaries object keyed by pageSlug for slot-resolver
  const dictionaries = {
    [pageSlug]: pageDict,
    common: commonDict,
  };

  // ------------------------------------------------------------------
  // 5. Initialise audience controller (slot hydration + toggle wiring)
  // ------------------------------------------------------------------
  initAudienceController({
    pageSlug,
    locale,
    dictionaries,
    firestoreSlots: {},
    cmsEnabled: false,
  });

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

  // Language change → reload dictionaries + re-hydrate all slots
  on('langchange', async (data) => {
    const newLocale = (data && data.locale) || locale;
    const audience = getAudience();

    // Reload dictionaries for the new locale
    const [newPageDict, newCommonDict] = await Promise.all([
      fetchJSON(`${base}js/i18n/dictionaries/${pageSlug}.json`),
      fetchJSON(`${base}js/i18n/dictionaries/common.json`),
    ]);
    dictionaries[pageSlug] = newPageDict;
    dictionaries.common = newCommonDict;

    hydrateSlots(pageSlug, audience, newLocale, {
      dictionaries,
      firestoreSlots: {},
      cmsEnabled: false,
    });

    // Also translate data-i18n elements via the legacy i18n module
    if (window.i18n && typeof window.i18n.setLang === 'function') {
      window.i18n.setLang(newLocale);
    }
  });

  // ------------------------------------------------------------------
  // 7. Legacy router as fallback
  // ------------------------------------------------------------------
  initLegacyRouter();
}
