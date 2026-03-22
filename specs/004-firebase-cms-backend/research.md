# Research: Firebase CMS Backend

**Feature**: 004-firebase-cms-backend
**Date**: 2026-03-22

## R1: Firebase SDK Loading Strategy

**Question**: How to load Firebase JS SDK in a vanilla (no-bundler) site?

**Decision**: ES module imports via CDN with `<script type="module">`

**Rationale**: Firebase JS SDK v10+ supports modular tree-shakeable imports. Using `https://www.gstatic.com/firebasejs/10.x/firebase-*.js` as ES modules avoids a build step while keeping bundle size minimal. Only `firebase/app`, `firebase/firestore`, and `firebase/auth` are loaded (~45KB gzipped total).

**Alternatives considered**:
- **Compat SDK** (`firebase/compat`): Larger bundle (~120KB), deprecated API pattern. Rejected.
- **npm + bundler**: Would require adding a build step (Vite/Rollup). Violates Constitution I ("build step is a development convenience, not a runtime dependency"). Rejected for the public site; acceptable for admin if needed in future.

**Browser support**: ES modules supported in Chrome 61+, Firefox 60+, Safari 11+, Edge 79+. All within target browser matrix.

## R2: Client-Side Cache Strategy

**Question**: How to cache Firestore content for offline resilience (Constitution VIII)?

**Decision**: IndexedDB via the `idb` library with a stale-while-revalidate pattern.

**Rationale**:
- IndexedDB supports structured data, async API, and ~50MB+ capacity per origin
- `idb` is a 1KB gzipped wrapper that provides a Promise-based API
- Pattern: read from IndexedDB immediately (instant render), then fetch from Firestore in background. If Firestore returns newer data, update IndexedDB and re-render affected elements.
- TTL: each cached entry stores a `cachedAt` timestamp. On page load, if `Date.now() - cachedAt > TTL`, trigger background refresh.

**Alternatives considered**:
- **localStorage**: 5MB limit shared across all keys; synchronous API blocks main thread; no structured queries. Works for small payloads but not future-proof. Rejected.
- **Cache API (Service Worker)**: Overkill for document-level caching; requires service worker registration; adds complexity for 3 collections. Rejected for v1; viable for future PWA evolution.
- **Firestore offline persistence**: Built-in but increases SDK size (~20KB), uses IndexedDB internally anyway, and gives less control over cache eviction. Rejected for explicit control.

## R3: Authentication & Authorization

**Question**: How to implement admin-only write access?

**Decision**: Firebase Authentication (Google provider) + custom claims (`{ admin: true }`)

**Rationale**:
- Firebase Auth is managed identity — no password storage, no session management
- Custom claims are embedded in the ID token and checked by Firestore security rules server-side
- Admin provisioning via CLI script (`scripts/set-admin-claim.js`) using Firebase Admin SDK
- 1-3 admins makes CLI provisioning practical; no admin management UI needed in v1

**Alternatives considered**:
- **Email/password auth**: Requires password management, reset flows. Unnecessary complexity for 1-3 internal users. Rejected.
- **Firebase App Check**: Complements auth (prevents API abuse) but doesn't replace role-based authorization. Consider for future hardening.

## R4: i18n Integration Approach

**Question**: How to make `i18n.js` fetch from Firestore without breaking the `data-i18n` contract?

**Decision**: Adapter pattern — inject a Firestore-backed data source into the existing i18n module.

**Rationale**:
- Current `i18n.js` loads translations via XHR from `js/i18n/{lang}.json`
- Modify the `fetchJSON` function to: (1) check IndexedDB cache, (2) fetch from Firestore if stale/missing, (3) fall back to static JSON as last resort
- The `data-i18n` attribute contract, `translateDOM`, and `translateElement` functions remain untouched
- Public API (`i18n.init`, `i18n.setLang`, `i18n.t`) remains unchanged

**Migration path**: During migration, Firestore translations may be incomplete. The resolver merges Firestore translations over static JSON — Firestore keys take precedence, missing keys fall back to static file.

## R5: Admin UI Architecture

**Question**: Framework for the admin content editor?

**Decision**: Vanilla JS with HTML templates, consistent with the existing site.

**Rationale**:
- The admin interface is a single-page editor with 3 tabs (programs, prices, translations)
- Maximum 6 program cards, ~10 price rows, ~1100 translation keys per language
- For 1-3 admins editing text content, a React/Vue app adds 100KB+ of framework code with no proportional benefit
- Vanilla JS form handling, validation, and Firestore writes are straightforward

**Alternatives considered**:
- **React/Preact SPA**: Better DX for complex UIs, but this is a simple form-based CRUD interface. Premature for v1. Rejected.
- **Firebase Extensions (Content Management)**: No official CMS extension exists. Third-party options (Flamelink, FireCMS) add vendor lock-in and cost. Rejected.

## R6: Firestore Data Structure

**Question**: Nested documents vs flat collections?

**Decision**: Flat top-level collections with bilingual documents.

**Rationale**:
- `programs/{programId}` — one document per program, fields include `title_es`, `title_en`, etc.
- `pricing/{category}` — one document per pricing category (b2c_base, b2b_multipliers, premium)
- `translations/{lang}` — one document per language with nested key-value structure matching current JSON
- `audit_log/{autoId}` — append-only collection for change tracking

Flat structure is simpler for security rules (per-collection access patterns) and avoids subcollection query limitations.

**Alternatives considered**:
- **Subcollections** (`programs/{id}/translations/{lang}`): More normalized but requires multiple reads per program. With only 6 programs, a single read returning all data is faster. Rejected.
- **Separate collections per language** (`programs_es/`, `programs_en/`): Violates FR-019 (bilingual content stored together). Rejected.

## R7: Deployment & Hosting

**Question**: Where does the admin page live? How are security rules deployed?

**Decision**: Admin page served from the same Firebase Hosting deployment as the main site. Security rules deployed via `firebase deploy --only firestore:rules`.

**Rationale**:
- The site is already static HTML. Adding `/admin/index.html` to Firebase Hosting requires zero infrastructure changes.
- Firebase Hosting serves static files with CDN caching and HTTPS — matches Constitution I.
- Security rules are in `firebase/firestore.rules`, version-controlled in the repo, and deployed via Firebase CLI.

**Note**: The site currently uses an unspecified hosting provider. Firebase Hosting adoption is optional — the admin page and Firestore work regardless of where the HTML is hosted. The content service uses the Firestore REST/SDK endpoint directly.
