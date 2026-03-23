# Cloud Functions API Contracts

**Runtime**: Node.js 20 | **SDK**: firebase-functions v2 | **Region**: us-central1

## setUserRole

**Type**: `onCall` (HTTPS callable)
**Caller**: super_admin only

### Request
```json
{
  "data": {
    "targetUid": "string (required) — Firebase Auth UID of target user",
    "newRole": "string (required) — enum: super_admin | admin | editor | viewer"
  }
}
```

### Response (success)
```json
{
  "success": true,
  "previousRole": "viewer",
  "newRole": "editor",
  "targetUid": "abc123"
}
```

### Errors
| Code | Condition |
|------|-----------|
| `unauthenticated` | No auth token |
| `permission-denied` | Caller is not super_admin |
| `invalid-argument` | Missing targetUid or invalid role |
| `failed-precondition` | Target is bootstrap account (cannot demote) |
| `failed-precondition` | Target is last super_admin (cannot demote) |
| `not-found` | Target user does not exist |

### Logic
1. Verify `context.auth.token.role === 'super_admin'`
2. Read `users/{targetUid}` — verify exists
3. Read bootstrap accounts from env config (`functions.config().bootstrap.accounts`). If target email is in bootstrap list AND `newRole` < current role → reject
4. If target is last super_admin AND `newRole` !== 'super_admin' → reject (count super_admins)
5. Write `users/{targetUid}.role = newRole`, update `role_history`, `updated_at`
6. Set custom claim `{ role: newRole }` via Admin SDK
7. Write audit_log entry (action: role_change)
8. Return success with previous/new role

---

## inviteUser

**Type**: `onCall` (HTTPS callable)
**Caller**: super_admin only

### Request
```json
{
  "data": {
    "email": "string (required) — email to invite",
    "role": "string (required) — enum: viewer | editor | admin"
  }
}
```

### Response (success)
```json
{
  "success": true,
  "email": "partner@aliado.com",
  "role": "editor",
  "inviteId": "hash123"
}
```

### Errors
| Code | Condition |
|------|-----------|
| `unauthenticated` | No auth token |
| `permission-denied` | Caller is not super_admin |
| `invalid-argument` | Invalid email or role |
| `already-exists` | User already has a CMS account |
| `already-exists` | Pending invite already exists for this email |

### Logic
1. Verify caller is super_admin
2. Check if email already exists in `users` collection → reject if found
3. Check if pending invite exists → reject if found
4. Create `config/invites/{emailHash}` doc
5. Write audit_log entry (action: create, collection: invites)
6. Return invite confirmation

---

## removeUserAccess

**Type**: `onCall` (HTTPS callable)
**Caller**: super_admin only

### Request
```json
{
  "data": {
    "targetUid": "string (required) — Firebase Auth UID"
  }
}
```

### Response (success)
```json
{
  "success": true,
  "targetUid": "abc123",
  "removedRole": "editor"
}
```

### Errors
| Code | Condition |
|------|-----------|
| `permission-denied` | Caller is not super_admin |
| `failed-precondition` | Target is bootstrap account |
| `failed-precondition` | Target is last super_admin |
| `not-found` | Target user not found |

### Logic
1. Verify caller is super_admin
2. Verify target is not bootstrap and not last super_admin
3. Set `users/{targetUid}.role = null`, clear custom claims
4. Write audit_log entry (action: role_change, new_value: null)
5. User will be denied access on next token refresh

---

## migrateMyRole

**Type**: `onCall` (HTTPS callable)
**Caller**: any authenticated user with legacy `admin: true` claim

### Request
```json
{
  "data": {}
}
```

### Response (success)
```json
{
  "success": true,
  "migratedRole": "admin",
  "uid": "abc123"
}
```

### Errors
| Code | Condition |
|------|-----------|
| `unauthenticated` | No auth token |
| `failed-precondition` | Caller already has `role` claim (no migration needed) |
| `failed-precondition` | Caller does not have legacy `admin: true` claim |

### Logic
1. Verify `context.auth.token.admin === true && !context.auth.token.role`
2. Check bootstrap_accounts: if email matches → assign bootstrap role
3. Otherwise → assign `admin` role (preserving existing privilege level)
4. Create `users/{uid}` doc if not exists
5. Set custom claim `{ role: assignedRole }` + remove legacy `{ admin: true }`
6. Write audit_log entry (action: role_change, previous_value: "legacy_admin")
7. Return migrated role

### Notes
- Self-healing: called automatically by client when legacy claim detected
- Idempotent: if user doc already exists with role, returns success without changes
- Temporary: remove after all users have migrated (1 week post-deploy)

---

## onUserFirstLogin

**Type**: `auth.user().onCreate` (Auth trigger)
**Caller**: system (triggered by Firebase Auth)

### Trigger Input
```json
{
  "uid": "string",
  "email": "string",
  "displayName": "string | null",
  "photoURL": "string | null"
}
```

### Logic
1. Read bootstrap accounts from environment config (`functions.config().bootstrap.accounts`) — per Constitution XXI, never hardcoded
2. Check bootstrap accounts: if email matches → create user doc with bootstrap role + `is_bootstrap: true`, set custom claim
3. Check `config/invites` for pending invite: if found → create user doc with invited role, mark invite accepted, set custom claim
4. Read `config/access` — get allowed_domains
5. Check allowed_domains: if email domain matches → create user doc with default_role (viewer), set custom claim
6. None matched → create user doc with `role: null` (blocked), no custom claim
7. Lazy-sync: write bootstrap accounts to `config/access.bootstrap_accounts` for UI display (if missing or divergent)
8. Write audit_log entry (action: login, first login)

### User Doc Created (by onUserFirstLogin)

```json
{
  "uid": "<uid>",
  "email": "<email>",
  "display_name": "<displayName or email prefix>",
  "avatar_url": "<photoURL or null>",
  "role": "<determined role or null>",
  "preferred_language": "es",
  "source": "bootstrap | invite | domain | manual",
  "is_bootstrap": false,
  "created_at": "serverTimestamp",
  "updated_at": "serverTimestamp",
  "last_login": "serverTimestamp",
  "total_sessions": 1,
  "role_history": [{"role": "<role>", "changed_by": "system", "changed_at": "serverTimestamp", "previous_role": null}]
}
```

---

## cleanupExpiredAudit

**Type**: `onSchedule` (Scheduled Function)
**Caller**: system (runs daily at 03:00 UTC)

### Schedule
```
every day 03:00
```

### Logic
1. Query `audit_log` where `ttl < Timestamp.now()`, limit 500
2. Batch delete all matched documents
3. If 500 deleted (batch full), re-run query (loop until < 500 returned)
4. Log total deleted count

### Notes
- No auth check — system-triggered, runs with admin privileges
- Batch limit of 500 matches Firestore batch write limit
- Runs at 03:00 UTC (low-traffic window for LatAm)
- If zero expired entries, exits silently
- Cost: ~1 read per expired doc + 1 delete per doc. At 1-10 users, negligible
