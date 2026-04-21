#!/usr/bin/env node

/**
 * seed.js — Idempotent Firestore seeder (Feature 009)
 *
 * Seeds: 3 programs, 5 resources, 3 testimonials.
 * Uses firebase-admin SDK. Checks if doc exists before writing (idempotent).
 * Data matches data-model.md v3 schemas.
 *
 * Usage:
 *   node scripts/seed.js                   # Production (requires GOOGLE_APPLICATION_CREDENTIALS)
 *   node scripts/seed.js --emulator        # Local emulator (localhost:8080)
 *
 * Environment:
 *   FIRESTORE_EMULATOR_HOST is set automatically when --emulator flag is used.
 */

import { initializeApp } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

// --- CLI flags ---
const args = process.argv.slice(2);
const useEmulator = args.includes('--emulator');

if (useEmulator) {
  process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
  console.log('[seed] Using Firestore emulator at localhost:8080');
}

const app = initializeApp({ projectId: 'metodologia-pristino-10x' });
const db = getFirestore(app);

// --- Timestamp helper ---
const now = Timestamp.now();

// ============================================================
// Seed Data — matches data-model.md v3 schemas
// ============================================================

const PROGRAMS = [
  {
    id: 'design-thinking-b2b',
    slug: 'design-thinking-b2b',
    nombre_i18n: {
      es: 'Design Thinking para Equipos',
      en: 'Design Thinking for Teams',
    },
    audiencia: 'empresa',
    duracion: '8 semanas',
    resultado_i18n: {
      es: 'Equipos capaces de aplicar Design Thinking en problemas reales',
      en: 'Teams capable of applying Design Thinking to real problems',
    },
    href: '/programas/?slug=design-thinking-b2b',
    order: 1,
    status: 'published',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'agile-foundations',
    slug: 'agile-foundations',
    nombre_i18n: {
      es: 'Fundamentos Agiles',
      en: 'Agile Foundations',
    },
    audiencia: 'persona',
    duracion: '4 semanas',
    resultado_i18n: {
      es: 'Dominio de Scrum, Kanban y practicas agiles esenciales',
      en: 'Mastery of Scrum, Kanban and essential agile practices',
    },
    href: '/programas/?slug=agile-foundations',
    order: 2,
    status: 'published',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'ai-accelerator',
    slug: 'ai-accelerator',
    nombre_i18n: {
      es: 'Acelerador IA para Organizaciones',
      en: 'AI Accelerator for Organizations',
    },
    audiencia: 'empresa',
    duracion: '12 semanas',
    resultado_i18n: {
      es: 'Estrategia de IA implementada con casos de uso priorizados',
      en: 'AI strategy implemented with prioritized use cases',
    },
    href: '/programas/?slug=ai-accelerator',
    order: 3,
    status: 'published',
    createdAt: now,
    updatedAt: now,
  },
];

const RESOURCES = [
  {
    id: 'playbook-scrum',
    tipo: 'playbook',
    estado: 'free',
    locale: 'es',
    previewUrl: '/recursos/playbooks/scrum-guide.html',
    fullUrl: '/recursos/playbooks/scrum-guide.html',
    title_i18n: {
      es: 'Playbook Scrum: Guia Practica',
      en: 'Scrum Playbook: Practical Guide',
    },
    status: 'published',
  },
  {
    id: 'template-retro',
    tipo: 'template',
    estado: 'free',
    locale: 'es',
    previewUrl: '/recursos/herramientas/retrospectiva-template.html',
    fullUrl: '/recursos/herramientas/retrospectiva-template.html',
    title_i18n: {
      es: 'Plantilla de Retrospectiva',
      en: 'Retrospective Template',
    },
    status: 'published',
  },
  {
    id: 'checklist-dt',
    tipo: 'checklist',
    estado: 'free',
    locale: 'es',
    previewUrl: '/recursos/herramientas/design-thinking-checklist.html',
    fullUrl: '/recursos/herramientas/design-thinking-checklist.html',
    title_i18n: {
      es: 'Checklist Design Thinking',
      en: 'Design Thinking Checklist',
    },
    status: 'published',
  },
  {
    id: 'prompt-pack-ai',
    tipo: 'prompt-pack',
    estado: 'premium',
    locale: 'es',
    previewUrl: '/recursos/prompts/ai-prompt-pack-preview.html',
    fullUrl: '/recursos/premium/ai-prompt-pack.html',
    title_i18n: {
      es: 'Pack de Prompts IA para Metodologias',
      en: 'AI Prompt Pack for Methodologies',
    },
    status: 'published',
  },
  {
    id: 'guide-kanban',
    tipo: 'guide',
    estado: 'free',
    locale: 'es',
    previewUrl: '/recursos/playbooks/kanban-guide.html',
    fullUrl: '/recursos/playbooks/kanban-guide.html',
    title_i18n: {
      es: 'Guia Kanban: Del Caos al Flujo',
      en: 'Kanban Guide: From Chaos to Flow',
    },
    status: 'published',
  },
];

const TESTIMONIALS = [
  {
    id: 'testimonial-carlos',
    author_name: 'Carlos Rodriguez',
    author_role_i18n: {
      es: 'Director de Innovacion',
      en: 'Innovation Director',
    },
    quote_i18n: {
      es: 'MetodologIA transformo la forma en que nuestro equipo aborda problemas complejos. Resultados medibles en 3 meses.',
      en: 'MetodologIA transformed how our team approaches complex problems. Measurable results in 3 months.',
    },
    order: 1,
    status: 'published',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'testimonial-maria',
    author_name: 'Maria Fernanda Lopez',
    author_role_i18n: {
      es: 'Scrum Master Senior',
      en: 'Senior Scrum Master',
    },
    quote_i18n: {
      es: 'El diagnostico me dio claridad sobre mis brechas metodologicas. El programa de fundamentos agiles fue exactamente lo que necesitaba.',
      en: 'The diagnostic gave me clarity on my methodology gaps. The agile foundations program was exactly what I needed.',
    },
    order: 2,
    status: 'published',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'testimonial-andres',
    author_name: 'Andres Gutierrez',
    author_role_i18n: {
      es: 'CTO, Fintech LatAm',
      en: 'CTO, LatAm Fintech',
    },
    quote_i18n: {
      es: 'Implementamos el acelerador IA y en 12 semanas teniamos 4 casos de uso en produccion. ROI comprobado.',
      en: 'We implemented the AI accelerator and in 12 weeks had 4 use cases in production. Proven ROI.',
    },
    order: 3,
    status: 'published',
    createdAt: now,
    updatedAt: now,
  },
];

// ============================================================
// Idempotent seed logic
// ============================================================

/**
 * Seed a single document if it does not already exist.
 * @param {string} collection - Firestore collection path
 * @param {string} docId - Document ID
 * @param {object} data - Document data
 * @returns {Promise<'created'|'exists'>}
 */
async function seedIfAbsent(collection, docId, data) {
  const ref = db.collection(collection).doc(docId);
  const snap = await ref.get();
  if (snap.exists) {
    return 'exists';
  }
  await ref.set(data);
  return 'created';
}

/**
 * Seed an entire collection from an array of documents.
 * @param {string} collectionName
 * @param {Array<{id: string, [key: string]: any}>} docs
 */
async function seedCollection(collectionName, docs) {
  console.log(`\n[seed] Seeding ${collectionName}/ (${docs.length} documents)...`);
  let created = 0;
  let skipped = 0;

  for (const doc of docs) {
    const { id, ...data } = doc;
    const result = await seedIfAbsent(collectionName, id, data);
    if (result === 'created') {
      created++;
      console.log(`  + ${collectionName}/${id} — created`);
    } else {
      skipped++;
      console.log(`  = ${collectionName}/${id} — already exists, skipped`);
    }
  }

  console.log(`  [${collectionName}] ${created} created, ${skipped} skipped`);
}

// ============================================================
// Main
// ============================================================

async function main() {
  console.log('[seed] Starting idempotent seed...');

  await seedCollection('programs', PROGRAMS);
  await seedCollection('resources', RESOURCES);
  await seedCollection('testimonials', TESTIMONIALS);

  console.log('\n[seed] Done. All collections seeded.');
  process.exit(0);
}

main().catch((err) => {
  console.error('[seed] Failed:', err);
  process.exit(1);
});
