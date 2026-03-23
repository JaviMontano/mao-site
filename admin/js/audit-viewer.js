/**
 * Audit log viewer — chronological log with filters, version diff, restore.
 * @module admin/js/audit-viewer
 */
import { getFirestore, collection, getDocs, query, orderBy, where, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { AuthService } from '../../js/cms/auth-service.js';
import { getFirebaseApp } from '../../js/cms/firebase-config.js';

const app = getFirebaseApp();
const db = getFirestore(app);

export const AuditViewer = {
  async render(container) {
    container.innerHTML = `
      <div class="space-y-4">
        <h2 class="text-xl font-bold">Audit Log</h2>
        <div class="flex gap-4 items-center">
          <select id="filter-collection" class="bg-slate-700 text-white rounded px-3 py-2 text-sm">
            <option value="">All Collections</option>
            <option value="programs">Programs</option>
            <option value="pricing">Pricing</option>
            <option value="translations">Translations</option>
            <option value="users">Users</option>
            <option value="invites">Invites</option>
          </select>
          <input type="text" id="filter-admin" placeholder="Filter by admin email..."
            class="bg-slate-700 text-white rounded px-3 py-2 text-sm flex-1" />
        </div>
        <div id="audit-list" class="space-y-2 max-h-[60vh] overflow-y-auto"></div>
        <div id="audit-detail" class="hidden bg-slate-700 rounded-xl p-6"></div>
      </div>
    `;

    await this.loadEntries(container);

    container.querySelector('#filter-collection').addEventListener('change', () => this.loadEntries(container));
    container.querySelector('#filter-admin').addEventListener('input', () => this.loadEntries(container));
  },

  async loadEntries(container) {
    const collFilter = container.querySelector('#filter-collection').value;
    const adminFilter = container.querySelector('#filter-admin').value.trim().toLowerCase();
    const listEl = container.querySelector('#audit-list');

    try {
      let q = query(collection(db, 'audit_log'), orderBy('timestamp', 'desc'));
      if (collFilter) {
        q = query(collection(db, 'audit_log'), where('collection', '==', collFilter), orderBy('timestamp', 'desc'));
      }

      const snap = await getDocs(q);
      let entries = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

      if (adminFilter) {
        entries = entries.filter((e) => (e.admin_email || '').toLowerCase().includes(adminFilter));
      }

      if (entries.length === 0) {
        listEl.innerHTML = '<p class="text-slate-500 text-sm">No audit entries found.</p>';
        return;
      }

      const ACTION_COLORS = {
        create: 'text-green-400', update: 'text-blue-400', delete: 'text-red-400',
        restore: 'text-purple-400', role_change: 'text-amber-400',
        login: 'text-slate-400', logout: 'text-slate-500',
      };

      listEl.innerHTML = entries.slice(0, 100).map((e) => `
        <div class="bg-slate-800 rounded p-3 flex items-center justify-between text-sm cursor-pointer hover:bg-slate-750 audit-entry" data-id="${e.id}">
          <div class="flex items-center gap-3">
            <span class="${ACTION_COLORS[e.action] || 'text-white'} font-mono text-xs w-20">${e.action}</span>
            <span class="text-slate-400">${e.collection}/${e.document_id}</span>
            ${e.field ? `<span class="text-slate-500 text-xs">.${e.field}</span>` : ''}
          </div>
          <div class="flex items-center gap-3">
            <span class="text-slate-500 text-xs">${e.admin_email}</span>
            <span class="text-slate-600 text-xs">${e.timestamp?.toDate?.()?.toLocaleString() || ''}</span>
          </div>
        </div>
      `).join('');

      // Bind click for detail view
      listEl.querySelectorAll('.audit-entry').forEach((el) => {
        el.addEventListener('click', () => {
          const entry = entries.find((e) => e.id === el.dataset.id);
          if (entry) this.showDetail(container, entry);
        });
      });
    } catch (err) {
      listEl.innerHTML = `<p class="text-red-400 text-sm">Error loading audit log: ${err.message}</p>`;
    }
  },

  showDetail(container, entry) {
    const detailEl = container.querySelector('#audit-detail');
    detailEl.classList.remove('hidden');
    detailEl.innerHTML = `
      <div class="flex justify-between items-start mb-4">
        <h3 class="text-lg font-bold">${entry.action}: ${entry.collection}/${entry.document_id}</h3>
        <button id="close-detail" class="text-slate-400 hover:text-white text-sm">✕ Close</button>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <h4 class="text-sm text-slate-400 mb-2">Previous Value</h4>
          <pre class="bg-slate-800 rounded p-3 text-xs text-red-300 overflow-auto max-h-48">${JSON.stringify(entry.previous_value, null, 2) || 'null'}</pre>
        </div>
        <div>
          <h4 class="text-sm text-slate-400 mb-2">New Value</h4>
          <pre class="bg-slate-800 rounded p-3 text-xs text-green-300 overflow-auto max-h-48">${JSON.stringify(entry.new_value, null, 2) || 'null'}</pre>
        </div>
      </div>
      <div class="mt-4 text-xs text-slate-500">
        <span>By: ${entry.admin_email}</span> · <span>${entry.timestamp?.toDate?.()?.toLocaleString() || ''}</span>
      </div>
      ${entry.action !== 'login' && entry.action !== 'logout' && entry.previous_value != null ? `
        <button id="btn-restore" class="mt-4 px-4 py-2 bg-purple-600 text-white rounded font-semibold text-sm hover:bg-purple-500">
          Restore Previous Value
        </button>
        <span id="restore-status" class="ml-2 text-sm"></span>
      ` : ''}
    `;

    detailEl.querySelector('#close-detail').addEventListener('click', () => {
      detailEl.classList.add('hidden');
    });

    const restoreBtn = detailEl.querySelector('#btn-restore');
    if (restoreBtn) {
      restoreBtn.addEventListener('click', () => this.restoreVersion(container, entry));
    }
  },

  async restoreVersion(container, entry) {
    const statusEl = container.querySelector('#restore-status');
    const user = AuthService.getCurrentUser();

    try {
      // Write the previous value back to the document
      const docRef = doc(db, entry.collection, entry.document_id);
      const restoreData = {};
      if (entry.field) {
        const fieldName = entry.field.split('.').pop();
        restoreData[fieldName] = entry.previous_value;
      }
      restoreData.updated_at = serverTimestamp();
      restoreData.updated_by = user?.email || 'unknown';

      await updateDoc(docRef, restoreData);

      // Create restore audit entry
      await addDoc(collection(db, 'audit_log'), {
        timestamp: serverTimestamp(),
        admin_id: user?.uid || 'unknown',
        admin_email: user?.email || 'unknown',
        collection: entry.collection,
        document_id: entry.document_id,
        action: 'restore',
        field: entry.field,
        previous_value: entry.new_value,
        new_value: entry.previous_value,
        ttl: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      });

      statusEl.textContent = '✓ Restored';
      statusEl.className = 'ml-2 text-sm text-green-400';
    } catch (err) {
      statusEl.textContent = `✗ ${err.message}`;
      statusEl.className = 'ml-2 text-sm text-red-400';
    }
  },
};
