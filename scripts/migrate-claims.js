#!/usr/bin/env node

/**
 * One-time migration: convert legacy admin:true claims to role:x claims.
 * Run once after deploying RBAC. Safe to re-run (skips already-migrated users).
 *
 * Usage:
 *   node scripts/migrate-claims.js --emulator
 *   node scripts/migrate-claims.js --dry-run
 */

import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

const args = process.argv.slice(2);
const useEmulator = args.includes('--emulator');
const dryRun = args.includes('--dry-run');

if (useEmulator) {
  process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';
  process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
}

// Bootstrap accounts — mirrors env config for migration script
const BOOTSTRAP_ACCOUNTS = [
  { email: 'javier.montano.guz@gmail.com', role: 'super_admin' },
  { email: 'contacto@metodologia.info', role: 'super_admin' },
  { email: 'german@metodologia.info', role: 'admin' },
];

const app = initializeApp({ projectId: 'metodologia-pristino-10x' });
const auth = getAuth(app);
const db = getFirestore(app);

async function main() {
  console.log(dryRun ? '=== DRY RUN ===' : '=== LIVE MIGRATION ===');

  let migrated = 0;
  let skipped = 0;
  let nextPageToken;

  do {
    const listResult = await auth.listUsers(100, nextPageToken);
    nextPageToken = listResult.pageToken;

    for (const user of listResult.users) {
      const claims = user.customClaims || {};

      // Skip if already has role claim
      if (claims.role) {
        console.log(`  SKIP ${user.email} — already has role: ${claims.role}`);
        skipped++;
        continue;
      }

      // Skip if no legacy admin claim
      if (!claims.admin) {
        console.log(`  SKIP ${user.email} — no admin claim`);
        skipped++;
        continue;
      }

      // Determine role
      const bootstrap = BOOTSTRAP_ACCOUNTS.find(
        (a) => a.email.toLowerCase() === user.email.toLowerCase(),
      );
      const newRole = bootstrap ? bootstrap.role : 'admin';

      console.log(`  MIGRATE ${user.email} → role: ${newRole}${bootstrap ? ' (bootstrap)' : ''}`);

      if (!dryRun) {
        await auth.setCustomUserClaims(user.uid, { role: newRole });

        const userRef = db.collection('users').doc(user.uid);
        const userSnap = await userRef.get();

        if (!userSnap.exists) {
          await userRef.set({
            uid: user.uid,
            email: user.email,
            display_name: user.displayName || user.email.split('@')[0],
            avatar_url: user.photoURL || null,
            role: newRole,
            preferred_language: 'es',
            source: bootstrap ? 'bootstrap' : 'manual',
            is_bootstrap: !!bootstrap,
            created_at: FieldValue.serverTimestamp(),
            updated_at: FieldValue.serverTimestamp(),
            last_login: FieldValue.serverTimestamp(),
            total_sessions: 0,
            role_history: [{ role: newRole, changed_by: 'migrate-claims-script', changed_at: new Date(), previous_role: 'legacy_admin' }],
          });
        } else {
          await userRef.update({
            role: newRole,
            updated_at: FieldValue.serverTimestamp(),
          });
        }
      }

      migrated++;
    }
  } while (nextPageToken);

  console.log(`\nMigration complete: ${migrated} migrated, ${skipped} skipped.`);
  process.exit(0);
}

main().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
