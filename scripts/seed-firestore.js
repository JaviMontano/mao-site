#!/usr/bin/env node

/**
 * Seed Firestore (emulator or production) with current hardcoded site content.
 *
 * Usage:
 *   node scripts/seed-firestore.js --emulator
 *   node scripts/seed-firestore.js --project site-metodologia
 *
 * Collection-specific extractors are added by T033 (programs), T044 (pricing), T068 (translations).
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const args = process.argv.slice(2);
const useEmulator = args.includes('--emulator');
const collections = args.filter((a) => !a.startsWith('--'));

// Configure for emulator or production
if (useEmulator) {
  process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
}

const app = initializeApp({
  projectId: 'site-metodologia',
});

const db = getFirestore(app);

/**
 * Registry of collection extractors.
 * Each extractor returns an array of { id, data } objects.
 * Added by T033 (programs), T044 (pricing), T068 (translations).
 */
const extractors = {};

/**
 * Register a collection extractor.
 * @param {string} name - Collection name
 * @param {Function} fn - Async function returning [{ id, data }]
 */
export function registerExtractor(name, fn) {
  extractors[name] = fn;
}

/**
 * Seed a collection using its registered extractor.
 * @param {string} collectionName
 */
async function seedCollection(collectionName) {
  const extractor = extractors[collectionName];
  if (!extractor) {
    console.warn(`No extractor registered for collection: ${collectionName}`);
    return;
  }

  console.log(`Seeding ${collectionName}...`);
  const items = await extractor();
  const batch = db.batch();
  for (const { id, data } of items) {
    batch.set(db.collection(collectionName).doc(id), data);
  }
  await batch.commit();
  console.log(`  ✓ ${items.length} documents written to ${collectionName}`);
}

/**
 * Seed config/settings document.
 */
async function seedConfig() {
  console.log('Seeding config/settings...');
  await db.collection('config').doc('settings').set({
    cache_ttl_ms: 3600000,
    migrated_collections: [],
    maintenance_mode: false,
  });
  console.log('  ✓ config/settings written');
}

// Main
async function main() {
  const toSeed = collections.length > 0 ? collections : Object.keys(extractors);

  await seedConfig();
  for (const name of toSeed) {
    await seedCollection(name);
  }

  console.log('\nSeeding complete.');
  process.exit(0);
}

main().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
