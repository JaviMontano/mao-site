/**
 * Page registry — lists site pages with i18n coverage, merges JSON + Firestore overrides.
 * @module admin/js/page-registry
 */
import { getFirestore, collection, getDocs, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { AuthService } from '../../js/cms/auth-service.js';
import { getFirebaseApp } from '../../js/cms/firebase-config.js';

const app = getFirebaseApp();
const db = getFirestore(app);

function sanitizePath(path) {
  return path.replace(/[/.]/g, '_');
}

export const PageRegistry = {
  async render(container) {
    container.innerHTML = `
      <div class="space-y-4">
        <h2 class="text-xl font-bold">Page Registry</h2>
        <p class="text-slate-400 text-sm">Site pages with i18n coverage. Run <code>npm run build:pages</code> to refresh.</p>
        <div id="page-table" class="space-y-2"></div>
      </div>
    `;

    // Load base registry
    let pages = [];
    try {
      const resp = await fetch('/admin/data/page-registry.json');
      if (resp.ok) pages = await resp.json();
    } catch {
      container.querySelector('#page-table').innerHTML =
        '<p class="text-red-400 text-sm">Could not load page registry. Run: npm run build:pages</p>';
      return;
    }

    // Load Firestore overrides
    const overrides = {};
    try {
      const snap = await getDocs(collection(db, 'page_overrides'));
      snap.docs.forEach((d) => { overrides[d.data().path] = d.data(); });
    } catch { /* Overrides optional */ }

    // Merge and render
    const tableEl = container.querySelector('#page-table');
    const LEVEL_COLORS = { L1: 'text-green-400', L2: 'text-blue-400', L3: 'text-yellow-400', L4: 'text-orange-400', L5: 'text-red-400' };

    tableEl.innerHTML = `
      <div class="bg-slate-700 rounded p-3 grid grid-cols-5 gap-2 text-xs font-semibold text-slate-400">
        <span>Path</span><span>Level</span><span>i18n Keys</span><span>Title</span><span>Actions</span>
      </div>
      ${pages.map((p) => {
    const override = overrides[p.path] || {};
    const displayTitle = override.title_es || p.title;
    return `
          <div class="bg-slate-800 rounded p-3 grid grid-cols-5 gap-2 text-sm items-center">
            <span class="font-mono text-xs truncate" title="${p.path}">${p.path}</span>
            <span class="${LEVEL_COLORS[p.level] || ''}">${p.level}</span>
            <span>${p.i18n_keys}</span>
            <span class="truncate">${displayTitle}</span>
            <button class="text-xs text-brand-gold hover:underline edit-page-btn" data-path="${p.path}">Edit Meta</button>
          </div>
        `;
  }).join('')}
    `;

    // Edit handlers
    tableEl.querySelectorAll('.edit-page-btn').forEach((btn) => {
      btn.addEventListener('click', () => this.showEditForm(container, btn.dataset.path, overrides[btn.dataset.path]));
    });
  },

  showEditForm(container, path, existing) {
    const data = existing || {};
    const form = document.createElement('div');
    form.className = 'bg-slate-700 rounded-xl p-6 mt-4';
    form.innerHTML = `
      <h3 class="text-lg font-bold mb-4">Edit: ${path}</h3>
      <div class="grid grid-cols-2 gap-4">
        <div><label class="block text-sm text-slate-400 mb-1">Title (ES)</label>
        <input type="text" data-f="title_es" value="${data.title_es || ''}" class="w-full bg-slate-600 text-white rounded px-3 py-2 text-sm" /></div>
        <div><label class="block text-sm text-slate-400 mb-1">Title (EN)</label>
        <input type="text" data-f="title_en" value="${data.title_en || ''}" class="w-full bg-slate-600 text-white rounded px-3 py-2 text-sm" /></div>
        <div><label class="block text-sm text-slate-400 mb-1">Description (ES)</label>
        <textarea data-f="description_es" rows="2" class="w-full bg-slate-600 text-white rounded px-3 py-2 text-sm">${data.description_es || ''}</textarea></div>
        <div><label class="block text-sm text-slate-400 mb-1">Description (EN)</label>
        <textarea data-f="description_en" rows="2" class="w-full bg-slate-600 text-white rounded px-3 py-2 text-sm">${data.description_en || ''}</textarea></div>
      </div>
      <div class="mt-4 flex gap-2">
        <button id="save-page-meta" class="px-4 py-2 bg-brand-gold text-slate-900 rounded font-semibold text-sm">Save</button>
        <button id="cancel-page-meta" class="px-4 py-2 bg-slate-600 text-white rounded text-sm">Cancel</button>
        <span id="page-meta-status" class="text-sm"></span>
      </div>
    `;

    // Remove any existing form
    container.querySelector('.page-edit-form')?.remove();
    form.classList.add('page-edit-form');
    container.querySelector('#page-table').after(form);

    form.querySelector('#cancel-page-meta').addEventListener('click', () => form.remove());
    form.querySelector('#save-page-meta').addEventListener('click', async () => {
      const statusEl = form.querySelector('#page-meta-status');
      const user = AuthService.getCurrentUser();
      const updates = { path };
      form.querySelectorAll('[data-f]').forEach((el) => {
        if (el.value.trim()) updates[el.dataset.f] = el.value.trim();
      });
      updates.updated_at = serverTimestamp();
      updates.updated_by = user?.email || 'unknown';

      try {
        await setDoc(doc(db, 'page_overrides', sanitizePath(path)), updates, { merge: true });
        statusEl.textContent = '✓ Saved';
        statusEl.className = 'text-sm text-green-400';
      } catch (err) {
        statusEl.textContent = `✗ ${err.message}`;
        statusEl.className = 'text-sm text-red-400';
      }
    });
  },
};
