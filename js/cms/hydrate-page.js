/**
 * hydrate-page.js — Generic Firebase CMS content hydration.
 *
 * Reads from Firestore `pages/{slug}` and replaces innerHTML of elements
 * with `data-cms` attributes. Static text stays as fallback.
 *
 * Usage in any page:
 *   import { hydratePage } from '../js/cms/hydrate-page.js';
 *   hydratePage('empresas');
 *
 * Firestore document structure:
 *   pages/{slug} → { section: { key: "HTML string", ... }, ... }
 *
 * HTML attribute format:
 *   data-cms="{slug}.{section}.{key}" → resolves to data[section][key]
 *
 * @module js/cms/hydrate-page
 */

export async function hydratePage(slug) {
  try {
    const { initializeApp } = await import('firebase/app');
    const { getFirestore, doc, getDoc } = await import('firebase/firestore');
    const configMod = await import('./firebase-config.js');
    const app = initializeApp(configMod.firebaseConfig);
    const db = getFirestore(app);

    const snap = await getDoc(doc(db, 'pages', slug));
    if (!snap.exists()) return;
    const data = snap.data();

    document.querySelectorAll('[data-cms]').forEach(el => {
      const key = el.dataset.cms;
      // Strip the page slug prefix: "empresas.hero.title" → "hero.title"
      const parts = key.replace(new RegExp(`^${slug}\\.`), '').split('.');
      let val = data;
      for (const p of parts) {
        if (val == null) break;
        val = val[p];
      }
      if (typeof val === 'string') {
        el.innerHTML = val;
      }
    });
  } catch (err) {
    console.debug(`[${slug}] CMS hydration skipped:`, err.message);
  }
}
