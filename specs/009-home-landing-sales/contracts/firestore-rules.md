# Firestore Security Rules Contract — 009

Declarative contract that drives `firebase/firestore.rules`. Only the collections touched by feature 009 are specified here; the full CMS ruleset (pages, blocks, assets, settings, audit…) is the responsibility of feature 010.

## Core invariants

1. **Append-only PII** (Constitution XXII): `leads/` and `diagnostics/` accept `create` only; `update` and `delete` are denied from client.
2. **Public read published content** (Constitution VI): `programs/`, `resources/`, `testimonials/` readable if `resource.data.status == "published"`, regardless of auth state.
3. **Auth required for PII write**: `request.auth != null` and `request.auth.uid` must match the doc id.
4. **App Check required for PII write**: `request.app != null` (App Check token attached).
5. **Deny-by-default**: anything not in this contract is denied.

## Per-collection rules

### `programs/{programId}`

```javascript
match /programs/{programId} {
  allow read: if resource.data.status == 'published';
  allow write: if false;  // managed by feature 010 backoffice
}
```

### `resources/{resourceId}`

```javascript
match /resources/{resourceId} {
  allow read: if resource.data.status == 'published';
  allow write: if false;
}
```

### `testimonials/{testimonialId}`

```javascript
match /testimonials/{testimonialId} {
  allow read: if resource.data.status == 'published';
  allow write: if false;
}
```

### `leads/{uid}`

```javascript
match /leads/{uid} {
  allow read: if request.auth != null && request.auth.uid == uid;
  allow create: if request.auth != null
                && request.app != null
                && request.auth.uid == uid
                && request.resource.data.uid == uid
                && request.resource.data.email is string
                && request.resource.data.email.size() > 3
                && request.resource.data.email.size() < 255
                && request.resource.data.name is string
                && request.resource.data.consent.pii == true
                && request.resource.data.segmento in ['persona','lider_equipo','fundador','directivo']
                && request.resource.data.locale in ['es','en']
                && request.resource.data.createdAt == request.time;
  allow update: if false;
  allow delete: if false;
}
```

### `diagnostics/{uid}`

```javascript
match /diagnostics/{uid} {
  allow read: if request.auth != null && request.auth.uid == uid;
  allow create: if request.auth != null
                && request.app != null
                && request.auth.uid == uid
                && request.resource.data.uid == uid
                && request.resource.data.leadUid == uid
                && request.resource.data.status == 'completed'
                && request.resource.data.steps is list
                && request.resource.data.steps.size() == 5
                && request.resource.data.resultado.nivel_id in ['explorer','builder','strategist']
                && request.resource.data.resultado.score is number
                && request.resource.data.resultado.score >= 0
                && request.resource.data.resultado.score <= 15
                && request.resource.data.locale in ['es','en']
                && request.resource.data.completedAt == request.time;
  allow update: if false;
  allow delete: if false;
}
```

### `pages/{pageSlug}` (optional read for pages/home only)

```javascript
match /pages/{pageSlug} {
  allow read: if resource.data.status == 'published';
  allow write: if false;
}
```

### `blocks/{blockId}` (optional, referenced by pages/home blocks[])

```javascript
match /blocks/{blockId} {
  allow read: if resource.data.status == 'published';
  allow write: if false;  // managed by feature 010 backoffice
}
```

## Deny-all fallback

```javascript
match /{document=**} {
  allow read, write: if false;
}
```

## Test coverage (→ `tests/integration/security-rules.spec.js`)

| Case | Expected | Maps to |
|---|---|---|
| Unauth read `programs` where status=published | allow | FR-063, FR-095 |
| Unauth read `programs` where status=draft | deny | FR-063 |
| Anon auth create `leads/{uid}` with valid shape + App Check | allow | FR-013, FR-017 |
| Anon auth create `leads/{uid}` with mismatching uid | deny | XXII |
| Anon auth create `leads/{uid}` without App Check | deny | VII |
| Anon auth create `leads/{uid}` without `consent.pii==true` | deny | FR-012 |
| Anon auth update `leads/{uid}` | deny | XXII |
| Anon auth delete `leads/{uid}` | deny | XXII |
| Anon auth create `diagnostics/{uid}` with 4 steps | deny | §4.5 |
| Anon auth create `diagnostics/{uid}` with score=16 | deny | §4.5 |
| Anon auth create `diagnostics/{uid}` with valid 5-step payload | allow | FR-013, §4.5 |
| Write any other collection from client | deny | deny-by-default |
