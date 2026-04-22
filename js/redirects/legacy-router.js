/**
 * legacy-router.js — Client-side fallback for 17 legacy URL redirects.
 *
 * Mirrors the .htaccess 301 rules for cases where server-side redirects
 * are bypassed (SPA navigation, CDN edge configs, etc.).
 *
 * @module js/redirects/legacy-router
 */

/** @type {Array<[string, string]>} Specific path → target pairs (checked before catch-all) */
const REDIRECT_MAP = [
  ['/vision.html', '/metodo/'],
  ['/vision/', '/metodo/'],
  ['/servicios/', '/programas/'],
  ['/metodologia.html', '/metodo/'],
  ['/empresas/diagnostico-gratuito.html', '/diagnostico/?audiencia=empresa'],
  ['/personas/autodiagnostico.html', '/diagnostico/?audiencia=persona'],
  ['/legal/privacidad.html', '/legal/#privacidad'],
  ['/legal/terminos.html', '/legal/#terminos'],
  ['/nosotros/ecosistema.html', '/nosotros/'],
  ['/nosotros/mision.html', '/nosotros/'],
  ['/ruta/cotizador-personas.html', '/diagnostico/'],
  ['/ruta/cotizador-empresas.html', '/diagnostico/'],
  ['/ruta/cotizador.html', '/diagnostico/'],
  ['/ruta/levels_grid.html', '/programas/'],
  ['/ruta/service_blueprint.html', '/programas/'],
  ['/ruta/a-medida.html', '/contacto/'],
  ['/sitemap.html', '/sitemap.xml'],
];

/** Catch-all prefix — any /ruta/* not matched above */
const RUTA_CATCH_ALL_TARGET = '/diagnostico/';

/**
 * Check whether a pathname should be redirected.
 * Pure function — no side effects.
 *
 * @param {string} pathname - The URL pathname to check (e.g. window.location.pathname)
 * @returns {{ target: string, code: 301 } | null} Redirect descriptor or null
 */
export function checkRedirect(pathname) {
  // 1. Exact / specific matches first
  for (const [from, to] of REDIRECT_MAP) {
    if (pathname === from) {
      return { target: to, code: 301 };
    }
  }

  // 2. Catch-all: /ruta/* → /diagnostico/
  if (pathname.startsWith('/ruta/') || pathname === '/ruta') {
    return { target: RUTA_CATCH_ALL_TARGET, code: 301 };
  }

  return null;
}

/**
 * Initialise the legacy router — check current pathname and redirect if matched.
 * Intended to run once on page load.
 */
export function initLegacyRouter() {
  const result = checkRedirect(window.location.pathname);
  if (result) {
    window.location.replace(result.target);
  }
}
