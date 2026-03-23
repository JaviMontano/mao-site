#!/usr/bin/env node

/**
 * RBAC-aware role assignment CLI script.
 * Replaces set-admin-claim.js for the new RBAC system.
 *
 * Usage:
 *   node scripts/set-user-role.js --email user@example.com --role editor --emulator
 *   node scripts/set-user-role.js --email user@example.com --role super_admin
 */

import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

const args = process.argv.slice(2);
const useEmulator = args.includes('--emulator');
const emailIdx = args.indexOf('--email');
const roleIdx = args.indexOf('--role');

if (emailIdx === -1 || roleIdx === -1) {
  console.error('Usage: node scripts/set-user-role.js --email <email> --role <role> [--emulator]');
  process.exit(1);
}

const email = args[emailIdx + 1];
const role = args[roleIdx + 1];
const VALID_ROLES = ['super_admin', 'admin', 'editor', 'viewer'];

if (!VALID_ROLES.includes(role)) {
  console.error(`Invalid role: ${role}. Must be one of: ${VALID_ROLES.join(', ')}`);
  process.exit(1);
}

if (useEmulator) {
  process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';
  process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
}

const app = initializeApp({ projectId: 'metodologia-pristino-10x' });
const auth = getAuth(app);
const db = getFirestore(app);

async function main() {
  // Find user by email
  let userRecord;
  try {
    userRecord = await auth.getUserByEmail(email);
  } catch (err) {
    console.error(`User not found: ${email}`);
    process.exit(1);
  }

  const uid = userRecord.uid;
  console.log(`Setting role for ${email} (${uid}) → ${role}`);

  // Set custom claims
  await auth.setCustomUserClaims(uid, { role });
  console.log(`  ✓ Custom claim set: { role: "${role}" }`);

  // Update or create Firestore user doc
  const userRef = db.collection('users').doc(uid);
  const userSnap = await userRef.get();

  if (userSnap.exists) {
    await userRef.update({
      role,
      updated_at: FieldValue.serverTimestamp(),
    });
    console.log(`  ✓ users/${uid} updated`);
  } else {
    await userRef.set({
      uid,
      email,
      display_name: userRecord.displayName || email.split('@')[0],
      avatar_url: userRecord.photoURL || null,
      role,
      preferred_language: 'es',
      source: 'manual',
      is_bootstrap: false,
      created_at: FieldValue.serverTimestamp(),
      updated_at: FieldValue.serverTimestamp(),
      last_login: FieldValue.serverTimestamp(),
      total_sessions: 0,
      role_history: [{ role, changed_by: 'set-user-role-script', changed_at: new Date(), previous_role: null }],
    });
    console.log(`  ✓ users/${uid} created`);
  }

  console.log('Done.');
  process.exit(0);
}

main().catch((err) => {
  console.error('Failed:', err);
  process.exit(1);
});
