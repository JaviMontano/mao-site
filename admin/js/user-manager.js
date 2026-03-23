/**
 * User management module — user list, role assignment, invites, domain allowlist.
 * @module admin/js/user-manager
 */
import { getFirestore, collection, getDocs, query, orderBy, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getFirebaseApp } from '../../js/cms/firebase-config.js';

const app = getFirebaseApp();
const db = getFirestore(app);
const functions = getFunctions(app);

const VALID_ROLES = ['super_admin', 'admin', 'editor', 'viewer'];
const ROLE_LABELS = { super_admin: 'Super Admin', admin: 'Admin', editor: 'Editor', viewer: 'Viewer' };

export const UserManager = {
  /**
   * Render user management UI into container.
   * @param {HTMLElement} container
   */
  async render(container) {
    container.innerHTML = `
      <div class="space-y-6">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-bold">User Management</h2>
          <button id="btn-invite" class="px-4 py-2 bg-brand-gold text-slate-900 rounded font-semibold text-sm">
            Invite User
          </button>
        </div>
        <input type="text" id="user-search" placeholder="Search by email or name..."
          class="w-full bg-slate-700 text-white rounded px-3 py-2 text-sm" />
        <div id="user-list" class="space-y-2"></div>
        <div id="invite-section" class="hidden bg-slate-800 rounded-xl p-6">
          <h3 class="text-lg font-bold mb-4">Invite External User</h3>
          <div class="grid grid-cols-2 gap-4">
            <input type="email" id="invite-email" placeholder="Email address"
              class="bg-slate-700 text-white rounded px-3 py-2 text-sm" />
            <select id="invite-role" class="bg-slate-700 text-white rounded px-3 py-2 text-sm">
              <option value="viewer">Viewer</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div class="mt-4 flex gap-2">
            <button id="btn-send-invite" class="px-4 py-2 bg-brand-gold text-slate-900 rounded font-semibold text-sm">Send Invite</button>
            <button id="btn-cancel-invite" class="px-4 py-2 bg-slate-600 text-white rounded text-sm">Cancel</button>
          </div>
          <p id="invite-status" class="mt-2 text-sm"></p>
        </div>
        <div id="pending-invites" class="bg-slate-800 rounded-xl p-6">
          <h3 class="text-lg font-bold mb-4">Pending Invites</h3>
          <div id="invite-list" class="space-y-2"></div>
        </div>
        <div id="domain-section" class="bg-slate-800 rounded-xl p-6">
          <h3 class="text-lg font-bold mb-4">Domain Allowlist</h3>
          <div id="domain-list" class="space-y-2"></div>
        </div>
      </div>
    `;

    // Load data
    await this.loadUsers(container);
    await this.loadInvites(container);
    await this.loadDomains(container);

    // Bind events
    container.querySelector('#btn-invite').addEventListener('click', () => {
      container.querySelector('#invite-section').classList.toggle('hidden');
    });

    container.querySelector('#btn-cancel-invite').addEventListener('click', () => {
      container.querySelector('#invite-section').classList.add('hidden');
    });

    container.querySelector('#btn-send-invite').addEventListener('click', () => this.sendInvite(container));

    container.querySelector('#user-search').addEventListener('input', (e) => {
      this.filterUsers(container, e.target.value);
    });
  },

  async loadUsers(container) {
    const usersSnap = await getDocs(query(collection(db, 'users'), orderBy('email')));
    const users = usersSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
    this._allUsers = users;
    this.renderUserList(container, users);
  },

  renderUserList(container, users) {
    const listEl = container.querySelector('#user-list');
    listEl.innerHTML = users.map((u) => `
      <div class="bg-slate-800 rounded p-4 flex items-center justify-between" data-uid="${u.uid}">
        <div>
          <span class="font-semibold">${u.display_name || u.email}</span>
          <span class="text-slate-400 text-sm ml-2">${u.email}</span>
          ${u.is_bootstrap ? '<span class="ml-2 text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded">Bootstrap</span>' : ''}
        </div>
        <div class="flex items-center gap-2">
          <select class="bg-slate-700 text-white rounded px-2 py-1 text-sm role-select" data-uid="${u.uid}"
            ${u.is_bootstrap ? 'disabled' : ''}>
            ${VALID_ROLES.map((r) => `<option value="${r}" ${u.role === r ? 'selected' : ''}>${ROLE_LABELS[r]}</option>`).join('')}
          </select>
          <span class="text-sm role-status" data-uid="${u.uid}"></span>
        </div>
      </div>
    `).join('');

    // Bind role change handlers
    listEl.querySelectorAll('.role-select').forEach((select) => {
      select.addEventListener('change', (e) => this.changeRole(container, e.target.dataset.uid, e.target.value));
    });
  },

  filterUsers(container, query) {
    if (!this._allUsers) return;
    const q = query.toLowerCase();
    const filtered = q
      ? this._allUsers.filter((u) => u.email.includes(q) || (u.display_name || '').toLowerCase().includes(q))
      : this._allUsers;
    this.renderUserList(container, filtered);
  },

  async changeRole(container, uid, newRole) {
    const statusEl = container.querySelector(`.role-status[data-uid="${uid}"]`);
    statusEl.textContent = 'Saving...';
    statusEl.className = 'text-sm role-status text-slate-400';

    try {
      const setRole = httpsCallable(functions, 'setUserRole');
      await setRole({ targetUid: uid, newRole });
      statusEl.textContent = '✓ Updated';
      statusEl.className = 'text-sm role-status text-green-400';
    } catch (err) {
      statusEl.textContent = `✗ ${err.message}`;
      statusEl.className = 'text-sm role-status text-red-400';
      // Revert select
      await this.loadUsers(container);
    }
  },

  async sendInvite(container) {
    const email = container.querySelector('#invite-email').value.trim();
    const role = container.querySelector('#invite-role').value;
    const statusEl = container.querySelector('#invite-status');

    if (!email) {
      statusEl.textContent = 'Email is required.';
      statusEl.className = 'mt-2 text-sm text-red-400';
      return;
    }

    try {
      const invite = httpsCallable(functions, 'inviteUser');
      await invite({ email, role });
      statusEl.textContent = `✓ Invited ${email} as ${role}`;
      statusEl.className = 'mt-2 text-sm text-green-400';
      container.querySelector('#invite-email').value = '';
      container.querySelector('#invite-section').classList.add('hidden');
      await this.loadInvites(container);
    } catch (err) {
      statusEl.textContent = `✗ ${err.message}`;
      statusEl.className = 'mt-2 text-sm text-red-400';
    }
  },

  async loadInvites(container) {
    const inviteListEl = container.querySelector('#invite-list');
    try {
      const invitesSnap = await getDocs(collection(db, 'config/invites'));
      const invites = invitesSnap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .filter((i) => i.status === 'pending');

      if (invites.length === 0) {
        inviteListEl.innerHTML = '<p class="text-slate-500 text-sm">No pending invites.</p>';
        return;
      }

      inviteListEl.innerHTML = invites.map((i) => `
        <div class="bg-slate-700 rounded p-3 flex items-center justify-between text-sm">
          <span>${i.email} → ${ROLE_LABELS[i.role] || i.role}</span>
          <span class="text-slate-400">by ${i.invited_by}</span>
        </div>
      `).join('');
    } catch {
      inviteListEl.innerHTML = '<p class="text-slate-500 text-sm">Could not load invites.</p>';
    }
  },

  async loadDomains(container) {
    const domainListEl = container.querySelector('#domain-list');
    try {
      const accessSnap = await getDoc(doc(db, 'config', 'access'));
      if (!accessSnap.exists()) {
        domainListEl.innerHTML = '<p class="text-slate-500 text-sm">No domain config found.</p>';
        return;
      }
      const data = accessSnap.data();
      const domains = data.allowed_domains || [];

      domainListEl.innerHTML = domains.map((d) => `
        <div class="bg-slate-700 rounded p-3 flex items-center justify-between text-sm">
          <span>@${d}</span>
          <span class="text-slate-400">→ ${data.default_role || 'viewer'}</span>
        </div>
      `).join('');
    } catch {
      domainListEl.innerHTML = '<p class="text-slate-500 text-sm">Could not load domains.</p>';
    }
  },
};
