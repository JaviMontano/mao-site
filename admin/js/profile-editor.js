/**
 * User profile editor — display name, preferred language, avatar, read-only role.
 * @module admin/js/profile-editor
 */
import { getFirestore, doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { AuthService } from '../../js/cms/auth-service.js';
import { getFirebaseApp } from '../../js/cms/firebase-config.js';

const app = getFirebaseApp();
const db = getFirestore(app);

const ROLE_LABELS = { super_admin: 'Super Admin', admin: 'Admin', editor: 'Editor', viewer: 'Viewer' };

export const ProfileEditor = {
  /**
   * Render profile editor.
   * @param {HTMLElement} container
   */
  async render(container) {
    const user = AuthService.getCurrentUser();
    if (!user) {
      container.innerHTML = '<p class="text-slate-400">Not signed in.</p>';
      return;
    }

    // Load user doc from Firestore
    let userData = {};
    try {
      const userSnap = await getDoc(doc(db, 'users', user.uid));
      if (userSnap.exists()) userData = userSnap.data();
    } catch {
      // Fallback to auth data
    }

    const role = await AuthService.getRole();

    container.innerHTML = `
      <div class="bg-slate-800 rounded-xl p-6 max-w-lg">
        <div class="flex items-center gap-4 mb-6">
          <img src="${user.photoURL || ''}" alt="Avatar"
            class="w-16 h-16 rounded-full bg-slate-700 ${user.photoURL ? '' : 'hidden'}" />
          <div>
            <h2 class="text-xl font-bold">${userData.display_name || user.displayName || user.email}</h2>
            <p class="text-slate-400 text-sm">${user.email}</p>
            <span class="text-xs bg-brand-gold/20 text-brand-gold px-2 py-0.5 rounded mt-1 inline-block">
              ${ROLE_LABELS[role] || role || 'No role'}
            </span>
          </div>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm text-slate-400 mb-1">Display Name</label>
            <input type="text" id="profile-name" value="${userData.display_name || user.displayName || ''}"
              class="w-full bg-slate-700 text-white rounded px-3 py-2 text-sm" />
          </div>
          <div>
            <label class="block text-sm text-slate-400 mb-1">Preferred Language</label>
            <select id="profile-lang" class="bg-slate-700 text-white rounded px-3 py-2 text-sm">
              <option value="es" ${(userData.preferred_language || 'es') === 'es' ? 'selected' : ''}>Español</option>
              <option value="en" ${userData.preferred_language === 'en' ? 'selected' : ''}>English</option>
            </select>
          </div>
          <div>
            <label class="block text-sm text-slate-400 mb-1">Last Login</label>
            <p class="text-sm text-white">${userData.last_login?.toDate?.()?.toLocaleString() || 'Unknown'}</p>
          </div>
          <div>
            <label class="block text-sm text-slate-400 mb-1">Total Sessions</label>
            <p class="text-sm text-white">${userData.total_sessions || 0}</p>
          </div>
        </div>

        <button id="btn-save-profile" class="mt-6 px-4 py-2 bg-brand-gold text-slate-900 rounded font-semibold text-sm">
          Save Profile
        </button>
        <span id="profile-status" class="ml-2 text-sm"></span>
      </div>
    `;

    container.querySelector('#btn-save-profile').addEventListener('click', async () => {
      const statusEl = container.querySelector('#profile-status');
      try {
        await updateDoc(doc(db, 'users', user.uid), {
          display_name: container.querySelector('#profile-name').value.trim(),
          preferred_language: container.querySelector('#profile-lang').value,
          updated_at: serverTimestamp(),
        });
        statusEl.textContent = '✓ Saved';
        statusEl.className = 'ml-2 text-sm text-green-400';
      } catch (err) {
        statusEl.textContent = `✗ ${err.message}`;
        statusEl.className = 'ml-2 text-sm text-red-400';
      }
    });
  },
};
