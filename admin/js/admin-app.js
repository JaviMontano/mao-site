/**
 * Admin UI controller — auth state, RBAC tab routing, legacy migration.
 * @module admin/js/admin-app
 */
import { getFirebaseApp } from '../../js/cms/firebase-config.js';
import { AuthService } from '../../js/cms/auth-service.js';
import { AdminAPI } from '../../js/cms/admin-api.js';
import { ContentService } from '../../js/cms/content-service.js';
import { ProgramEditor } from './program-editor.js';
import { PriceEditor } from './price-editor.js';
import { I18nEditor } from './i18n-editor.js';
import { getFunctions, httpsCallable } from 'firebase/functions';

const app = getFirebaseApp();
AuthService.init(app);
AdminAPI.init(app);

const loginScreen = document.getElementById('login-screen');
const deniedScreen = document.getElementById('denied-screen');
const adminEditor = document.getElementById('admin-editor');
const userInfo = document.getElementById('user-info');
const tabBar = document.getElementById('tab-bar');

const ROLE_LEVELS = { super_admin: 4, admin: 3, editor: 2, viewer: 1 };

/**
 * Tab definitions with role requirements.
 * minRole = minimum role to see the tab.
 */
const TAB_DEFS = [
  { id: 'programs', label: 'Programs', minRole: 'viewer' },
  { id: 'prices', label: 'Prices', minRole: 'viewer' },
  { id: 'translations', label: 'Translations', minRole: 'viewer' },
  { id: 'pages', label: 'Pages', minRole: 'editor' },
  { id: 'users', label: 'Users', minRole: 'super_admin' },
  { id: 'audit', label: 'Audit', minRole: 'admin' },
  { id: 'profile', label: 'Profile', minRole: 'viewer' },
];

let currentRole = null;

// Auth state handling
AuthService.onAuthStateChanged(async (user) => {
  if (!user) {
    showScreen('login');
    return;
  }

  // Check for legacy admin claim and trigger migration
  const isLegacy = await AuthService.isLegacyAdmin();
  if (isLegacy) {
    try {
      const functions = getFunctions(app);
      const migrate = httpsCallable(functions, 'migrateMyRole');
      await migrate();
      await AuthService.refreshToken();
    } catch (err) {
      console.warn('Legacy migration failed:', err.message);
    }
  }

  const role = await AuthService.getRole();
  currentRole = role;

  if (!role) {
    showScreen('denied');
    userInfo.textContent = user.email;
    return;
  }

  showScreen('editor');
  renderTabs(role);
  userInfo.innerHTML = `<span class="text-slate-500 text-xs mr-2">${role}</span>${user.email} <button id="logout-btn" class="ml-2 text-slate-500 hover:text-white text-xs">[Sign Out]</button>`;
  document.getElementById('logout-btn')?.addEventListener('click', () => AuthService.signOut());

  // Initialize content service for admin
  await ContentService.init({ app });
  loadContent();
});

// Login button
document.getElementById('login-btn')?.addEventListener('click', async () => {
  try {
    await AuthService.signIn();
  } catch (err) {
    console.warn('Sign-in failed:', err.message);
  }
});

// Sign out from denied screen
document.getElementById('logout-btn-denied')?.addEventListener('click', () => AuthService.signOut());

function showScreen(screen) {
  loginScreen.classList.toggle('hidden', screen !== 'login');
  deniedScreen.classList.toggle('hidden', screen !== 'denied');
  adminEditor.classList.toggle('hidden', screen !== 'editor');
}

/**
 * Render tabs based on user role.
 * @param {string} role
 */
function renderTabs(role) {
  const roleLevel = ROLE_LEVELS[role] || 0;
  tabBar.innerHTML = '';

  const visibleTabs = TAB_DEFS.filter(
    (t) => roleLevel >= (ROLE_LEVELS[t.minRole] || 0),
  );

  visibleTabs.forEach((tabDef, idx) => {
    const btn = document.createElement('button');
    btn.setAttribute('role', 'tab');
    btn.id = `tab-${tabDef.id}`;
    btn.setAttribute('aria-controls', `panel-${tabDef.id}`);
    btn.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');
    btn.dataset.tab = tabDef.id;
    btn.textContent = tabDef.label;
    btn.className = idx === 0
      ? 'px-4 py-3 text-sm font-semibold border-b-2 border-brand-gold text-brand-gold'
      : 'px-4 py-3 text-sm font-semibold border-b-2 border-transparent text-slate-400 hover:text-white';
    btn.setAttribute('tabindex', idx === 0 ? '0' : '-1');
    tabBar.appendChild(btn);
  });

  // Show first panel
  if (visibleTabs.length > 0) {
    document.querySelectorAll('[role="tabpanel"]').forEach((p) => p.classList.add('hidden'));
    const firstPanel = document.getElementById(`panel-${visibleTabs[0].id}`);
    if (firstPanel) firstPanel.classList.remove('hidden');
  }

  // Bind tab events
  const tabs = tabBar.querySelectorAll('[role="tab"]');
  const panels = document.querySelectorAll('[role="tabpanel"]');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => activateTab(tab, tabs, panels));
    tab.addEventListener('keydown', (e) => {
      const tabArray = Array.from(tabs);
      const idx = tabArray.indexOf(tab);

      let newIdx = idx;
      if (e.key === 'ArrowRight') newIdx = (idx + 1) % tabArray.length;
      else if (e.key === 'ArrowLeft') newIdx = (idx - 1 + tabArray.length) % tabArray.length;
      else if (e.key === 'Home') newIdx = 0;
      else if (e.key === 'End') newIdx = tabArray.length - 1;
      else return;

      e.preventDefault();
      tabArray[newIdx].focus();
      activateTab(tabArray[newIdx], tabs, panels);
    });
  });
}

function activateTab(selectedTab, tabs, panels) {
  tabs.forEach((t) => {
    const isSelected = t === selectedTab;
    t.setAttribute('aria-selected', String(isSelected));
    t.classList.toggle('border-brand-gold', isSelected);
    t.classList.toggle('text-brand-gold', isSelected);
    t.classList.toggle('border-transparent', !isSelected);
    t.classList.toggle('text-slate-400', !isSelected);
    t.setAttribute('tabindex', isSelected ? '0' : '-1');
  });

  panels.forEach((p) => {
    p.classList.toggle('hidden', p.id !== `panel-${selectedTab.dataset.tab}`);
  });
}

// Load content into editors
async function loadContent() {
  const programs = await ContentService.getPrograms('empresas') || [];
  const personasPrograms = await ContentService.getPrograms('personas') || [];
  ProgramEditor.render(
    document.getElementById('panel-programs'),
    [...programs, ...personasPrograms],
  );

  const b2c = await ContentService.getPricing('b2c_base');
  const b2b = await ContentService.getPricing('b2b_multipliers');
  const premium = await ContentService.getPricing('premium');
  PriceEditor.render(document.getElementById('panel-prices'), b2c, b2b, premium);

  const es = await ContentService.getTranslations('es');
  const en = await ContentService.getTranslations('en');
  if (es && en) {
    I18nEditor.render(document.getElementById('panel-translations'), es, en);
  }
}
