/**
 * Content Editor — Firestore CRUD for slots/{pageSlug}
 *
 * Schema per slot: { slotId, variants: { "persona.es", "persona.en", "empresa.es", "empresa.en" } }
 * Saves per slot to Firestore slots/{pageSlug}.
 *
 * @module admin/js/content-editor
 * [TS-100, TS-101, TS-102, TS-107]
 */
import { getFirebaseApp } from '../../js/cms/firebase-config.js';
import { AuthService } from '../../js/cms/auth-service.js';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

const app = getFirebaseApp();
AuthService.init(app);
const db = getFirestore(app);

// 13 canonical pages (12 sidebar pages + 404)
const PAGES = [
  { slug: 'home', name: 'Home', slotCount: 7 },
  { slug: 'diagnostico', name: 'Diagnostico', slotCount: 7 },
  { slug: 'empresas', name: 'Empresas', slotCount: 7 },
  { slug: 'personas', name: 'Personas', slotCount: 7 },
  { slug: 'programas', name: 'Programas', slotCount: 7 },
  { slug: 'recursos', name: 'Recursos', slotCount: 7 },
  { slug: 'metodo', name: 'Metodo', slotCount: 7 },
  { slug: 'casos', name: 'Casos', slotCount: 7 },
  { slug: 'nosotros', name: 'Nosotros', slotCount: 7 },
  { slug: 'insights', name: 'Insights', slotCount: 7 },
  { slug: 'contacto', name: 'Contacto', slotCount: 7 },
  { slug: 'legal', name: 'Legal', slotCount: 7 },
  { slug: '404', name: '404', slotCount: 3 },
];

// 4 variant keys
const VARIANT_KEYS = [
  { key: 'persona.es', label: 'ES \u00d7 Persona' },
  { key: 'persona.en', label: 'EN \u00d7 Persona' },
  { key: 'empresa.es', label: 'ES \u00d7 Empresa' },
  { key: 'empresa.en', label: 'EN \u00d7 Empresa' },
];

// DOM references
const loginScreen = document.getElementById('login-screen');
const deniedScreen = document.getElementById('denied-screen');
const pagePicker = document.getElementById('page-picker');
const slotEditor = document.getElementById('slot-editor');
const pageGrid = document.getElementById('page-grid');
const slotsContainer = document.getElementById('slots-container');
const editorTitle = document.getElementById('editor-title');
const backBtn = document.getElementById('back-btn');
const loginBtn = document.getElementById('login-btn');
const logoutBtnDenied = document.getElementById('logout-btn-denied');
const userInfo = document.getElementById('user-info');
const toast = document.getElementById('toast');

let currentPageSlug = null;

// ── Screen management ──

function showScreen(screen) {
  loginScreen.classList.toggle('hidden', screen !== 'login');
  deniedScreen.classList.toggle('hidden', screen !== 'denied');
  pagePicker.classList.toggle('hidden', screen !== 'picker');
  slotEditor.classList.toggle('hidden', screen !== 'editor');
}

// ── Auth ──

loginBtn?.addEventListener('click', () => AuthService.signInWithGoogle());
logoutBtnDenied?.addEventListener('click', () => AuthService.signOut());

AuthService.onAuthStateChanged(async (user) => {
  if (!user) {
    showScreen('login');
    if (userInfo) userInfo.textContent = '';
    return;
  }

  // Check admin access (legacy claim or admin+ role)
  const token = await user.getIdTokenResult();
  const claims = token.claims;
  const isAdmin =
    claims.admin === true ||
    ['admin', 'super_admin'].includes(claims.role);

  if (!isAdmin) {
    showScreen('denied');
    return;
  }

  if (userInfo) {
    userInfo.textContent = `${user.displayName || user.email}`;
  }
  showScreen('picker');
  renderPageGrid();
});

// ── Page Picker Grid (13 cards) [TS-100] ──

function renderPageGrid() {
  if (!pageGrid) return;
  pageGrid.innerHTML = '';

  for (const page of PAGES) {
    const card = document.createElement('div');
    card.className = 'page-card';
    card.setAttribute('role', 'listitem');
    card.setAttribute('tabindex', '0');
    card.setAttribute('data-slug', page.slug);
    card.innerHTML = `
      <h3>${page.name}</h3>
      <span class="slot-count">${page.slotCount} slots</span>
    `;
    card.addEventListener('click', () => openSlotEditor(page.slug));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openSlotEditor(page.slug);
      }
    });
    pageGrid.appendChild(card);
  }
}

// ── Slot Editor [TS-101, TS-102] ──

async function openSlotEditor(pageSlug) {
  currentPageSlug = pageSlug;
  const page = PAGES.find((p) => p.slug === pageSlug);
  if (editorTitle) editorTitle.textContent = `${page.name} — Content Slots`;
  showScreen('editor');

  // Load existing data from Firestore
  let existingData = {};
  try {
    const docRef = doc(db, 'slots', pageSlug);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      existingData = snap.data().slots || {};
    }
  } catch (err) {
    console.warn('Could not load slots from Firestore:', err);
  }

  renderSlots(pageSlug, existingData);
}

function renderSlots(pageSlug, existingData) {
  if (!slotsContainer) return;
  slotsContainer.innerHTML = '';

  // Generate slot IDs based on sections config pattern
  const slotIds = generateSlotIds(pageSlug);

  for (const slotId of slotIds) {
    const existing = existingData[slotId] || {};
    const block = document.createElement('div');
    block.className = 'slot-block';
    block.setAttribute('data-slot-id', slotId);

    const variantFields = VARIANT_KEYS.map(({ key, label }) => {
      const value = existing.variants?.[key] || '';
      return `
        <div class="variant-field">
          <label for="slot-${slotId}-${key}">${label}</label>
          <textarea
            id="slot-${slotId}-${key}"
            data-variant-key="${key}"
            placeholder="${label}"
            aria-label="${slotId} ${label}"
          >${escapeHtml(value)}</textarea>
        </div>
      `;
    }).join('');

    block.innerHTML = `
      <h4>${slotId}</h4>
      <div class="variant-grid">${variantFields}</div>
      <div class="slot-actions">
        <button class="btn-save" data-save-slot="${slotId}">Save slot</button>
      </div>
    `;

    const saveBtn = block.querySelector(`[data-save-slot="${slotId}"]`);
    saveBtn.addEventListener('click', () => saveSlot(pageSlug, slotId, block));

    slotsContainer.appendChild(block);
  }
}

function generateSlotIds(pageSlug) {
  // Standard content slots per page section pattern
  const sectionSlots = {
    home: ['hero.headline', 'hero.subheadline', 'hero.cta', 'diagnostico.title', 'recursos.title', 'programas.title', 'contacto.title'],
    diagnostico: ['intro.headline', 'intro.body', 'segmento.title', 'madurez.title', 'dolor.title', 'urgencia.title', 'resultado.title'],
    empresas: ['b2b.headline', 'b2b.body', 'programas.title', 'diagnostico.cta', 'recursos.title', 'casos.title', 'contacto.cta'],
    personas: ['autodiagnostico.headline', 'autodiagnostico.body', 'recursos.title', 'programas.title', 'comunidad.title', 'casos.title', 'contacto.cta'],
    programas: ['catalogo.headline', 'detalle.body', 'audiencia.title', 'duracion.title', 'resultado.title', 'testimonios.title', 'inscripcion.cta'],
    recursos: ['biblioteca.headline', 'playbooks.title', 'herramientas.title', 'premium.title', 'prompts.title', 'automatizacion.title', 'comunidad.title'],
    metodo: ['filosofia.headline', 'diagnostico.title', 'estrategia.title', 'amplificacion.title', 'pivote.title', 'evidencia.title', 'siguiente.cta'],
    casos: ['destacados.headline', 'empresa.title', 'persona.title', 'resultados.title', 'metodologia.title', 'testimonios.title', 'contacto.cta'],
    nosotros: ['vision.headline', 'equipo.title', 'ecosistema.title', 'metodologia.title', 'valores.title', 'comunidad.title', 'contacto.cta'],
    insights: ['articulos.headline', 'tendencias.title', 'herramientas.title', 'investigacion.title', 'comunidad.title', 'suscripcion.cta', 'archivo.title'],
    contacto: ['formulario.headline', 'servicios.title', 'ubicacion.title', 'redes.title', 'faq.title', 'horario.title', 'mapa.title'],
    legal: ['privacidad.title', 'terminos.title', 'cookies.title', 'datos.title', 'derechos.title', 'cambios.title', 'contacto.title'],
    '404': ['error.headline', 'error.body', 'error.cta'],
  };
  return sectionSlots[pageSlug] || [];
}

// ── Save per slot to Firestore ──

async function saveSlot(pageSlug, slotId, block) {
  const saveBtn = block.querySelector(`[data-save-slot="${slotId}"]`);
  saveBtn.disabled = true;
  saveBtn.textContent = 'Saving...';

  const variants = {};
  const textareas = block.querySelectorAll('textarea[data-variant-key]');
  for (const ta of textareas) {
    variants[ta.dataset.variantKey] = ta.value;
  }

  const slotData = { slotId, variants };

  try {
    const docRef = doc(db, 'slots', pageSlug);
    const snap = await getDoc(docRef);

    if (snap.exists()) {
      await updateDoc(docRef, {
        [`slots.${slotId}`]: slotData,
        updatedAt: new Date().toISOString(),
        updatedBy: AuthService.currentUser()?.uid || 'unknown',
      });
    } else {
      await setDoc(docRef, {
        slots: { [slotId]: slotData },
        updatedAt: new Date().toISOString(),
        updatedBy: AuthService.currentUser()?.uid || 'unknown',
      });
    }

    showToast('Slot saved successfully', 'success');
  } catch (err) {
    console.error('Save failed:', err);
    showToast(`Save failed: ${err.message}`, 'error');
  } finally {
    saveBtn.disabled = false;
    saveBtn.textContent = 'Save slot';
  }
}

// ── Back button ──

backBtn?.addEventListener('click', () => {
  currentPageSlug = null;
  showScreen('picker');
});

// ── Toast ──

function showToast(message, type = 'success') {
  if (!toast) return;
  toast.textContent = message;
  toast.className = `toast toast--${type}`;
  setTimeout(() => {
    toast.classList.add('toast--hidden');
  }, 3000);
}

// ── Helpers ──

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Export for testing
export { PAGES, VARIANT_KEYS, generateSlotIds };
