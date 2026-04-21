/**
 * slug-router.js — Client-side ?slug=X router for dynamic templates
 *
 * Supports 3 dynamic page types: programas, recursos, insights.
 * Content resolution cascade:
 *   1. Firestore collection doc (if ContentService available and has the slug)
 *   2. i18n dictionary fallback: {pageSlug}.slugs.{slug}.{audience}.{locale}
 *   3. null (unknown slug — renders 404-like message within the page)
 *
 * SEO: top-5 slugs per page are pre-rendered as <template data-slug="X"> tags
 * in the HTML. initSlugRouter() clones them instead of fetching when possible.
 *
 * Pure URL reading — no history.pushState (static site).
 */

const SLUG_PAGES = ['programas', 'recursos', 'insights'];

const DEFAULT_LOCALE = 'es';
const DEFAULT_AUDIENCE = 'persona';

/**
 * Read the `?slug=` param from the current URL.
 * @returns {string | null}
 */
export function getSlug() {
  try {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');
    return slug ? slug.trim() : null;
  } catch {
    return null;
  }
}

/**
 * Check whether the given pageSlug is one of the 3 dynamic template pages.
 * @param {string} pageSlug
 * @returns {boolean}
 */
export function isSlugPage(pageSlug) {
  return SLUG_PAGES.includes(pageSlug);
}

/**
 * Resolve content for a specific slug on a dynamic page.
 *
 * Cascade:
 *   1. Firestore doc from the page's collection (if ContentService ready)
 *   2. i18n dictionary path: {pageSlug}.slugs.{slug}.{audience}.{locale}
 *      with fallback to default audience/locale
 *   3. null if not found anywhere
 *
 * @param {string} pageSlug - One of: programas, recursos, insights
 * @param {string} slug     - The content slug identifier
 * @param {object} [options]
 * @param {string} [options.locale='es']
 * @param {string} [options.audience='persona']
 * @param {object} [options.dictionaries]   - i18n dictionaries object
 * @param {object} [options.contentService] - ContentService instance (or window.ContentService)
 * @returns {Promise<{title: string, body: string, meta: object} | null>}
 */
export async function resolveSlugContent(pageSlug, slug, options = {}) {
  const {
    locale = DEFAULT_LOCALE,
    audience = DEFAULT_AUDIENCE,
    dictionaries = {},
    contentService = (typeof window !== 'undefined' ? window.ContentService : null),
  } = options;

  if (!isSlugPage(pageSlug) || !slug) return null;

  // Level 1: Firestore — fetch slug doc from the page's collection
  if (contentService && typeof contentService.isReady === 'function' && contentService.isReady()) {
    try {
      const firestoreResult = await _fetchFromFirestore(contentService, pageSlug, slug, locale, audience);
      if (firestoreResult) return firestoreResult;
    } catch {
      // Firestore unavailable — fall through to i18n
    }
  }

  // Level 2: i18n dictionary fallback with audience/locale cascade
  const dictResult = _resolveFromDictionary(dictionaries, pageSlug, slug, audience, locale);
  if (dictResult) return dictResult;

  return null;
}

/**
 * Initialize the slug router for a given page.
 * Reads ?slug= from URL; if present, renders the slug content.
 * If no slug param, does nothing (listing/index view remains).
 *
 * @param {string} pageSlug - One of: programas, recursos, insights
 * @param {object} [options]
 * @param {string}  [options.locale]
 * @param {string}  [options.audience]
 * @param {object}  [options.dictionaries]
 * @param {object}  [options.contentService]
 * @param {string}  [options.contentSelector='[data-slug-content]'] - Container to render into
 * @param {string}  [options.listingSelector='[data-slug-listing]'] - Listing view to hide
 */
export async function initSlugRouter(pageSlug, options = {}) {
  if (!isSlugPage(pageSlug)) return;

  const slug = getSlug();
  if (!slug) return; // No slug param — show listing/index view as-is

  const {
    contentSelector = '[data-slug-content]',
    listingSelector = '[data-slug-listing]',
    ...resolveOptions
  } = options;

  // Check for pre-rendered <template data-slug="X"> first (SEO top-5)
  const preRendered = _activatePreRenderedTemplate(slug);
  if (preRendered) {
    _toggleViews(contentSelector, listingSelector, true);
    return;
  }

  // Fetch content dynamically
  const content = await resolveSlugContent(pageSlug, slug, resolveOptions);

  if (content) {
    _renderSlugContent(content, contentSelector);
    _toggleViews(contentSelector, listingSelector, true);
  } else {
    _renderNotFound(slug, contentSelector);
    _toggleViews(contentSelector, listingSelector, true);
  }
}

// ---------------------------------------------------------------------------
// Private helpers
// ---------------------------------------------------------------------------

/**
 * Attempt to fetch a slug document from Firestore via ContentService.
 * Collection name maps from pageSlug (e.g. "programas" → "programas").
 * @private
 */
async function _fetchFromFirestore(contentService, pageSlug, slug, locale, audience) {
  // Use getDoc-style lookup if ContentService exposes it,
  // otherwise attempt a generic getSlugContent method
  if (typeof contentService.getSlugContent === 'function') {
    const doc = await contentService.getSlugContent(pageSlug, slug, { locale, audience });
    if (doc && doc.title) {
      return {
        title: doc.title,
        body: doc.body || doc.content || '',
        meta: doc.meta || {},
      };
    }
  }
  return null;
}

/**
 * Resolve slug content from i18n dictionaries with 4-level fallback cascade.
 *
 * Path: {pageSlug}.slugs.{slug}.{audience}.{locale}
 * Fallbacks:
 *   1. exact: audience + locale
 *   2. locale fallback: audience + 'es'
 *   3. audience fallback: 'persona' + locale
 *   4. double fallback: 'persona' + 'es'
 *
 * @private
 */
function _resolveFromDictionary(dictionaries, pageSlug, slug, audience, locale) {
  const page = dictionaries[pageSlug];
  if (!page || !page.slugs) return null;

  const slugData = page.slugs[slug];
  if (!slugData) return null;

  // 4-level cascade (mirrors slot-resolver pattern)
  const entry =
    slugData[audience]?.[locale] ||
    slugData[audience]?.[DEFAULT_LOCALE] ||
    slugData[DEFAULT_AUDIENCE]?.[locale] ||
    slugData[DEFAULT_AUDIENCE]?.[DEFAULT_LOCALE] ||
    null;

  if (!entry) return null;

  // Entry can be an object { title, body, meta } or a string (title only)
  if (typeof entry === 'string') {
    return { title: entry, body: '', meta: {} };
  }

  return {
    title: entry.title || '',
    body: entry.body || entry.content || '',
    meta: entry.meta || {},
  };
}

/**
 * Look for a pre-rendered <template data-slug="X"> in the DOM.
 * If found, clone its content into the slug content container.
 * Returns true if a matching template was found and activated.
 * @private
 */
function _activatePreRenderedTemplate(slug) {
  const template = document.querySelector(`template[data-slug="${CSS.escape(slug)}"]`);
  if (!template) return false;

  const container = document.querySelector('[data-slug-content]');
  if (!container) return false;

  container.innerHTML = '';
  container.appendChild(template.content.cloneNode(true));
  return true;
}

/**
 * Render resolved slug content into the content container.
 * @private
 */
function _renderSlugContent(content, selector) {
  const container = document.querySelector(selector);
  if (!container) return;

  container.innerHTML = '';

  const titleEl = document.createElement('h1');
  titleEl.className = 'slug-content__title';
  titleEl.textContent = content.title;
  container.appendChild(titleEl);

  if (content.body) {
    const bodyEl = document.createElement('div');
    bodyEl.className = 'slug-content__body';
    bodyEl.innerHTML = content.body;
    container.appendChild(bodyEl);
  }

  // Update document title for SEO context
  if (content.title) {
    document.title = `${content.title} | MetodologIA`;
  }

  // Set meta description if available
  if (content.meta?.description) {
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', content.meta.description);
  }
}

/**
 * Render a 404-like "not found" message within the page (no redirect).
 * @private
 */
function _renderNotFound(slug, selector) {
  const container = document.querySelector(selector);
  if (!container) return;

  container.innerHTML = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'slug-content__not-found';
  wrapper.setAttribute('role', 'alert');

  const heading = document.createElement('h2');
  heading.textContent = 'Contenido no encontrado';
  wrapper.appendChild(heading);

  const message = document.createElement('p');
  message.textContent = `No se encontró contenido para "${slug}".`;
  wrapper.appendChild(message);

  container.appendChild(wrapper);
}

/**
 * Toggle visibility between slug content view and listing view.
 * @private
 */
function _toggleViews(contentSelector, listingSelector, showContent) {
  const contentEl = document.querySelector(contentSelector);
  const listingEl = document.querySelector(listingSelector);

  if (contentEl) {
    contentEl.hidden = !showContent;
  }
  if (listingEl) {
    listingEl.hidden = showContent;
  }
}
