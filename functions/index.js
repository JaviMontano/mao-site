/**
 * Cloud Functions for MetodologIA CMS RBAC.
 * @module functions/index
 */
import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, FieldValue, Timestamp } from 'firebase-admin/firestore';
import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { beforeUserCreated } from 'firebase-functions/v2/identity';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { checkBootstrap, getBootstrapAccounts } from './config.js';

const app = initializeApp();
const auth = getAuth(app);
const db = getFirestore(app);

const VALID_ROLES = ['super_admin', 'admin', 'editor', 'viewer'];
const ROLE_LEVELS = { super_admin: 4, admin: 3, editor: 2, viewer: 1 };

/**
 * Sanitize email to Firestore-safe document ID.
 * @param {string} email
 * @returns {string}
 */
function sanitizeEmail(email) {
  return email.toLowerCase().replace(/[.@]/g, '_');
}

/**
 * Create a user document in Firestore.
 * @param {string} uid
 * @param {Object} data
 */
async function createUserDoc(uid, data) {
  await db.collection('users').doc(uid).set({
    uid,
    email: data.email,
    display_name: data.displayName || data.email.split('@')[0],
    avatar_url: data.photoURL || null,
    role: data.role,
    preferred_language: 'es',
    source: data.source,
    is_bootstrap: data.isBootstrap || false,
    created_at: FieldValue.serverTimestamp(),
    updated_at: FieldValue.serverTimestamp(),
    last_login: FieldValue.serverTimestamp(),
    total_sessions: 1,
    role_history: [{
      role: data.role,
      changed_by: 'system',
      changed_at: Timestamp.now(),
      previous_role: null,
    }],
  });
}

/**
 * Write an audit log entry.
 * @param {Object} entry
 */
async function writeAuditLog(entry) {
  await db.collection('audit_log').add({
    ...entry,
    timestamp: FieldValue.serverTimestamp(),
    ttl: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
  });
}

// === onUserFirstLogin ===
// Auth trigger: runs when a new user is created in Firebase Auth.
export const onUserFirstLogin = beforeUserCreated(async (event) => {
  const { uid, email, displayName, photoURL } = event.data;
  if (!email) return;

  // 1. Check bootstrap accounts (env config — Constitution XXI)
  const bootstrap = checkBootstrap(email);
  if (bootstrap.isBootstrap) {
    await createUserDoc(uid, {
      email, displayName, photoURL,
      role: bootstrap.role,
      source: 'bootstrap',
      isBootstrap: true,
    });
    await auth.setCustomUserClaims(uid, { role: bootstrap.role });

    // Lazy-sync bootstrap accounts to config/access for UI display
    const accounts = getBootstrapAccounts();
    await db.collection('config').doc('access').set({
      bootstrap_accounts: accounts,
    }, { merge: true });

    await writeAuditLog({
      admin_id: uid,
      admin_email: email,
      collection: 'users',
      document_id: uid,
      action: 'login',
      field: null,
      previous_value: null,
      new_value: { role: bootstrap.role, source: 'bootstrap' },
    });
    return;
  }

  // 2. Check pending invites
  const inviteRef = db.doc(`config/invites/${sanitizeEmail(email)}`);
  const inviteSnap = await inviteRef.get();
  if (inviteSnap.exists) {
    const invite = inviteSnap.data();
    if (invite.status === 'pending') {
      await createUserDoc(uid, {
        email, displayName, photoURL,
        role: invite.role,
        source: 'invite',
      });
      await auth.setCustomUserClaims(uid, { role: invite.role });
      await inviteRef.update({ status: 'accepted' });

      await writeAuditLog({
        admin_id: uid,
        admin_email: email,
        collection: 'users',
        document_id: uid,
        action: 'login',
        field: null,
        previous_value: null,
        new_value: { role: invite.role, source: 'invite' },
      });
      return;
    }
  }

  // 3. Check allowed domains
  const accessDoc = await db.collection('config').doc('access').get();
  const accessData = accessDoc.exists ? accessDoc.data() : {};
  const allowedDomains = accessData.allowed_domains || [];
  const domain = email.split('@')[1];

  if (allowedDomains.includes(domain)) {
    const defaultRole = accessData.default_role || 'viewer';
    await createUserDoc(uid, {
      email, displayName, photoURL,
      role: defaultRole,
      source: 'domain',
    });
    await auth.setCustomUserClaims(uid, { role: defaultRole });

    await writeAuditLog({
      admin_id: uid,
      admin_email: email,
      collection: 'users',
      document_id: uid,
      action: 'login',
      field: null,
      previous_value: null,
      new_value: { role: defaultRole, source: 'domain' },
    });
    return;
  }

  // 4. No match — blocked user
  await createUserDoc(uid, {
    email, displayName, photoURL,
    role: null,
    source: 'manual',
  });

  await writeAuditLog({
    admin_id: uid,
    admin_email: email,
    collection: 'users',
    document_id: uid,
    action: 'login',
    field: null,
    previous_value: null,
    new_value: { role: null, source: 'blocked' },
  });
});

// === setUserRole ===
export const setUserRole = onCall(async (request) => {
  // Auth check
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Authentication required.');
  }
  if (request.auth.token.role !== 'super_admin') {
    throw new HttpsError('permission-denied', 'Only super_admin can assign roles.');
  }

  const { targetUid, newRole } = request.data;
  if (!targetUid || !VALID_ROLES.includes(newRole)) {
    throw new HttpsError('invalid-argument', 'Valid targetUid and role required.');
  }

  // Read target user
  const userRef = db.collection('users').doc(targetUid);
  const userSnap = await userRef.get();
  if (!userSnap.exists) {
    throw new HttpsError('not-found', 'Target user does not exist.');
  }

  const userData = userSnap.data();
  const previousRole = userData.role;

  // Bootstrap protection
  const bootstrap = checkBootstrap(userData.email);
  if (bootstrap.isBootstrap && ROLE_LEVELS[newRole] < ROLE_LEVELS[bootstrap.role]) {
    throw new HttpsError('failed-precondition', 'Cannot demote a bootstrap account.');
  }

  // Last super_admin guard
  if (previousRole === 'super_admin' && newRole !== 'super_admin') {
    const superAdmins = await db.collection('users')
      .where('role', '==', 'super_admin').get();
    if (superAdmins.size <= 1) {
      throw new HttpsError('failed-precondition', 'Cannot demote the last super_admin.');
    }
  }

  // Update role
  await userRef.update({
    role: newRole,
    updated_at: FieldValue.serverTimestamp(),
    role_history: FieldValue.arrayUnion({
      role: newRole,
      changed_by: request.auth.token.email,
      changed_at: Timestamp.now(),
      previous_role: previousRole,
    }),
  });

  // Update custom claims
  await auth.setCustomUserClaims(targetUid, { role: newRole });

  // Audit log
  await writeAuditLog({
    admin_id: request.auth.uid,
    admin_email: request.auth.token.email,
    collection: 'users',
    document_id: targetUid,
    action: 'role_change',
    field: 'role',
    previous_value: previousRole,
    new_value: newRole,
  });

  return { success: true, previousRole, newRole, targetUid };
});

// === migrateMyRole ===
export const migrateMyRole = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Authentication required.');
  }

  const token = request.auth.token;

  // Already migrated
  if (token.role) {
    throw new HttpsError('failed-precondition', 'Already has role claim — no migration needed.');
  }

  // Must have legacy admin claim
  if (token.admin !== true) {
    throw new HttpsError('failed-precondition', 'No legacy admin claim found.');
  }

  const uid = request.auth.uid;
  const email = token.email;

  // Determine role: bootstrap gets their assigned role, others get admin
  const bootstrap = checkBootstrap(email);
  const assignedRole = bootstrap.isBootstrap ? bootstrap.role : 'admin';

  // Create or update user doc
  const userRef = db.collection('users').doc(uid);
  const userSnap = await userRef.get();

  if (userSnap.exists && userSnap.data().role) {
    // Already has role in Firestore — just update claim
    const existingRole = userSnap.data().role;
    await auth.setCustomUserClaims(uid, { role: existingRole });
    return { success: true, migratedRole: existingRole, uid };
  }

  if (!userSnap.exists) {
    await createUserDoc(uid, {
      email,
      displayName: token.name || email.split('@')[0],
      photoURL: token.picture || null,
      role: assignedRole,
      source: bootstrap.isBootstrap ? 'bootstrap' : 'manual',
      isBootstrap: bootstrap.isBootstrap,
    });
  } else {
    await userRef.update({
      role: assignedRole,
      updated_at: FieldValue.serverTimestamp(),
      role_history: FieldValue.arrayUnion({
        role: assignedRole,
        changed_by: 'system',
        changed_at: Timestamp.now(),
        previous_role: 'legacy_admin',
      }),
    });
  }

  // Set new claim, remove legacy
  await auth.setCustomUserClaims(uid, { role: assignedRole });

  await writeAuditLog({
    admin_id: uid,
    admin_email: email,
    collection: 'users',
    document_id: uid,
    action: 'role_change',
    field: 'role',
    previous_value: 'legacy_admin',
    new_value: assignedRole,
  });

  return { success: true, migratedRole: assignedRole, uid };
});

// === inviteUser ===
export const inviteUser = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Authentication required.');
  }
  if (request.auth.token.role !== 'super_admin') {
    throw new HttpsError('permission-denied', 'Only super_admin can invite users.');
  }

  const { email, role } = request.data;
  if (!email || !['viewer', 'editor', 'admin'].includes(role)) {
    throw new HttpsError('invalid-argument', 'Valid email and role required.');
  }

  // Check if user already exists
  const usersSnap = await db.collection('users').where('email', '==', email.toLowerCase()).get();
  if (!usersSnap.empty) {
    throw new HttpsError('already-exists', 'User already has a CMS account.');
  }

  // Check for existing invite
  const inviteId = sanitizeEmail(email);
  const inviteRef = db.doc(`config/invites/${inviteId}`);
  const inviteSnap = await inviteRef.get();
  if (inviteSnap.exists && inviteSnap.data().status === 'pending') {
    throw new HttpsError('already-exists', 'Pending invite already exists for this email.');
  }

  // Create invite
  await inviteRef.set({
    email: email.toLowerCase(),
    role,
    invited_by: request.auth.token.email,
    invited_at: FieldValue.serverTimestamp(),
    status: 'pending',
  });

  await writeAuditLog({
    admin_id: request.auth.uid,
    admin_email: request.auth.token.email,
    collection: 'invites',
    document_id: inviteId,
    action: 'create',
    field: null,
    previous_value: null,
    new_value: { email: email.toLowerCase(), role },
  });

  return { success: true, email: email.toLowerCase(), role, inviteId };
});

// === removeUserAccess ===
export const removeUserAccess = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Authentication required.');
  }
  if (request.auth.token.role !== 'super_admin') {
    throw new HttpsError('permission-denied', 'Only super_admin can remove access.');
  }

  const { targetUid } = request.data;
  if (!targetUid) {
    throw new HttpsError('invalid-argument', 'targetUid required.');
  }

  const userRef = db.collection('users').doc(targetUid);
  const userSnap = await userRef.get();
  if (!userSnap.exists) {
    throw new HttpsError('not-found', 'Target user not found.');
  }

  const userData = userSnap.data();

  // Bootstrap protection
  const bootstrap = checkBootstrap(userData.email);
  if (bootstrap.isBootstrap) {
    throw new HttpsError('failed-precondition', 'Cannot remove a bootstrap account.');
  }

  // Last super_admin guard
  if (userData.role === 'super_admin') {
    const superAdmins = await db.collection('users')
      .where('role', '==', 'super_admin').get();
    if (superAdmins.size <= 1) {
      throw new HttpsError('failed-precondition', 'Cannot remove the last super_admin.');
    }
  }

  const removedRole = userData.role;
  await userRef.update({
    role: null,
    updated_at: FieldValue.serverTimestamp(),
    role_history: FieldValue.arrayUnion({
      role: null,
      changed_by: request.auth.token.email,
      changed_at: Timestamp.now(),
      previous_role: removedRole,
    }),
  });

  await auth.setCustomUserClaims(targetUid, {});

  await writeAuditLog({
    admin_id: request.auth.uid,
    admin_email: request.auth.token.email,
    collection: 'users',
    document_id: targetUid,
    action: 'role_change',
    field: 'role',
    previous_value: removedRole,
    new_value: null,
  });

  return { success: true, targetUid, removedRole };
});

// === cleanupExpiredAudit ===
export const cleanupExpiredAudit = onSchedule('every day 03:00', async () => {
  let totalDeleted = 0;
  let batchSize;

  do {
    const expired = await db.collection('audit_log')
      .where('ttl', '<', Timestamp.now())
      .limit(500)
      .get();

    batchSize = expired.size;
    if (batchSize === 0) break;

    const batch = db.batch();
    expired.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();
    totalDeleted += batchSize;
  } while (batchSize === 500);

  console.log(`cleanupExpiredAudit: deleted ${totalDeleted} expired entries.`);
});
