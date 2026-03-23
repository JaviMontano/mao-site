# Cloud Functions — MetodologIA CMS RBAC

## Overview

Cloud Functions for the CMS RBAC system. Handles privileged operations that cannot run client-side.

## Functions

| Function | Type | Trigger | Purpose |
|----------|------|---------|---------|
| `onUserFirstLogin` | Auth trigger | `beforeUserCreated` | Auto-provision roles (bootstrap, invite, domain) |
| `setUserRole` | Callable | `onCall` | Role assignment by super_admin |
| `migrateMyRole` | Callable | `onCall` | Legacy `admin:true` → `role:x` self-migration |
| `inviteUser` | Callable | `onCall` | Create pending invite for external user |
| `removeUserAccess` | Callable | `onCall` | Revoke user access |
| `cleanupExpiredAudit` | Scheduled | Daily 03:00 UTC | Delete expired audit_log entries (90-day TTL) |

## Environment Config

Bootstrap accounts are configured via environment variables (Constitution XXI):

```bash
# Set via Firebase Functions config
firebase functions:config:set bootstrap.accounts='[{"email":"...","role":"super_admin"}]'

# Or via .env file (see .env.example)
```

## Deploy

```bash
cd functions
npm install
firebase deploy --only functions --project metodologia-pristino-10x
```

## Local Development

```bash
firebase emulators:start --only functions,auth,firestore
```
