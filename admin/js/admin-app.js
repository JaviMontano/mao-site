/**
 * Admin UI controller — auth state, tab routing, admin claim check.
 * @module admin/js/admin-app
 */
import { getFirebaseApp } from '../../js/cms/firebase-config.js';
import { AuthService } from '../../js/cms/auth-service.js';
import { AdminAPI } from '../../js/cms/admin-api.js';
import { ContentService } from '../../js/cms/content-service.js';
import { ProgramEditor } from './program-editor.js';
import { PriceEditor } from './price-editor.js';
import { I18nEditor } from './i18n-editor.js';

const app = getFirebaseApp();
AuthService.init(app);
AdminAPI.init(app);

const loginScreen = document.getElementById('login-screen');
const deniedScreen = document.getElementById('denied-screen');
const adminEditor = document.getElementById('admin-editor');
const userInfo = document.getElementById('user-info');

// Auth state handling
AuthService.onAuthStateChanged(async (user) => {
  if (!user) {
    showScreen('login');
    return;
  }

  const isAdmin = await AuthService.isAdmin();
  if (!isAdmin) {
    showScreen('denied');
    userInfo.textContent = user.email;
    return;
  }

  showScreen('editor');
  userInfo.innerHTML = `${user.email} <button id="logout-btn" class="ml-2 text-slate-500 hover:text-white text-xs">[Sign Out]</button>`;
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

// Tab navigation with keyboard support (T055b)
const tabs = document.querySelectorAll('[role="tab"]');
const panels = document.querySelectorAll('[role="tabpanel"]');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => activateTab(tab));
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
    activateTab(tabArray[newIdx]);
  });
});

function activateTab(selectedTab) {
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
