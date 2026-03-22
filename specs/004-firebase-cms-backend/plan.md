# Implementation Plan: Firebase CMS Backend

**Branch**: `004-firebase-cms-backend` | **Date**: 2026-03-22 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-firebase-cms-backend/spec.md`

## Summary

Migrate editable site content (program catalogs, pricing, translations) from hardcoded HTML/JS to Firebase Firestore with a client-side admin interface. The existing vanilla JS site gains a centralized content service that reads from Firestore, caches in IndexedDB, and falls back to static content during the migration period. An admin page at `/admin/` uses Firebase Authentication with custom claims for role-based access.

## Technical Context

**Language/Version**: JavaScript ES2020+ (vanilla, no transpiler — matches existing codebase)
**Primary Dependencies**: Firebase JS SDK v10 (modular/tree-shakeable: `firebase/app`, `firebase/firestore`, `firebase/auth`), `idb` (IndexedDB wrapper, ~1KB gzipped)
**Storage**: Cloud Firestore (document store) + IndexedDB (client-side cache)
**Testing**: Playwright (existing, for E2E), Firebase Emulator Suite (security rules + integration), Vitest (unit tests for content service)
**Target Platform**: Modern browsers (Chrome 90+, Firefox 90+, Safari 15+, Edge 90+)
**Project Type**: Web application (existing static site + new admin SPA)
**Performance Goals**: Firestore content renders within 2s on 3G (SC-011), Lighthouse >= 90 (SC-010)
**Constraints**: Offline-capable (Constitution VIII), no custom servers (Constitution I), data-layer security (Constitution VII), zero secrets in client code (FR-015)
**Scale/Scope**: 63+ pages, 6 programs × 2 audiences × 2 languages, ~15K translation tokens, 1-3 admins

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | How Addressed |
|-----------|--------|---------------|
| I. Client-Rendered, Cloud-Backed | PASS | Firebase is a managed BaaS; no custom servers; browser renders content fetched from Firestore |
| II. Accessibility-First | PASS | Admin interface must meet ARIA/keyboard standards (FR-022); public site unchanged |
| III. SEO Integrity | PASS | Content renders within 2s DOM timeout (FR-021); Firestore fetch is faster than crawl timeout |
| IV. Component Consistency | PASS | Centralized content service module (FR-016); single `data-i18n` contract preserved (FR-004) |
| V. Brand Separation | PASS | No external brand references; admin may show "powered by Firebase" subtly per constitution |
| VI. Content Authority | PASS | Single source of truth per content piece; dual-source during migration with clear ownership (FR-017, FR-018) |
| VII. Secure by Default | PASS | Firestore security rules enforce read/write at data layer (FR-012, FR-013); custom claims for admin role |
| VIII. Offline Resilience | PASS | IndexedDB cache with configurable TTL (FR-005, FR-007); last-known-good content on failure (FR-006) |

## Architecture

```
+------------------+     +-------------------+     +------------------+
|                  |     |                   |     |                  |
|  Browser (SPA)   |---->| Content Service   |---->| Cloud Firestore  |
|  Public Pages    |     | (js/cms/)         |     | (programs,       |
|  + Admin Page    |     |  - fetch          |     |  prices,         |
|                  |     |  - cache (IDB)    |     |  translations,   |
+------------------+     |  - fallback       |     |  audit_log)      |
        |                +-------------------+     +------------------+
        |                        |                         |
        v                        v                         |
+------------------+     +-------------------+             |
| Firebase Auth    |     | IndexedDB Cache   |             |
| (Google sign-in  |     | (offline content) |             |
|  + admin claim)  |     +-------------------+             |
+------------------+                                       |
        |                                                  |
        v                                                  v
+------------------+                              +------------------+
| Admin UI         |                              | Security Rules   |
| (/admin/)        |                              | (firestore.rules)|
| - program editor |                              | - public read    |
| - price editor   |                              | - admin write    |
| - i18n editor    |                              | - schema valid.  |
+------------------+                              +------------------+
```

## Project Structure

### Documentation (this feature)

```text
specs/004-firebase-cms-backend/
  plan.md              # This file
  research.md          # Technology decisions and rationale
  data-model.md        # Firestore collections and document schemas
  quickstart.md        # Developer setup and test scenarios
  contracts/           # Content service API contracts
  tasks.md             # Task breakdown (created by /iikit-tasks)
```

### Source Code (repository root)

```text
js/cms/
  firebase-config.js   # Firebase app initialization (public config only)
  content-service.js   # Centralized Firestore read + cache + fallback
  cache-manager.js     # IndexedDB wrapper with TTL logic
  auth-service.js      # Firebase Auth wrapper (login, role check)
  admin-api.js         # Admin write operations (edit, validate, audit log)
  migration-bridge.js  # Dual-source resolver (Firestore-first, static fallback)

admin/
  index.html           # Admin SPA shell (protected route)
  js/
    admin-app.js       # Admin UI controller
    program-editor.js  # Program catalog editor component
    price-editor.js    # Pricing editor component
    i18n-editor.js     # Translation editor component

firebase/
  firestore.rules      # Security rules (version-controlled)
  firestore.indexes.json
  firebase.json        # Firebase project config (hosting + emulators)
  .firebaserc          # Project alias

scripts/
  set-admin-claim.js   # CLI script to set admin custom claims (Firebase Admin SDK)
  seed-firestore.js    # Seed Firestore with current hardcoded data

tests/
  unit/
    content-service.test.js
    cache-manager.test.js
  integration/
    firestore-rules.test.js  # Security rules against emulator
  e2e/
    admin-flow.spec.js       # Playwright: admin login + edit + verify
    public-content.spec.js   # Playwright: content loads from Firestore
    offline-resilience.spec.js
```

**Structure Decision**: Flat `js/cms/` directory within the existing site root — no monorepo, no build framework. This preserves the vanilla JS architecture (Constitution I) and aligns with the existing `js/` convention. The `admin/` directory is a standalone HTML page with its own JS, consistent with the existing page-per-route pattern. Firebase config lives in `firebase/` at repo root, matching standard Firebase CLI conventions.

## Migration Strategy

Content migrates in 3 waves, each independently deployable:

| Wave | Content | Source Today | Files Affected |
|------|---------|-------------|----------------|
| 1 | Program catalogs | `empresas/index.html:360-403`, `personas/index.html:412-455` | 2 HTML files |
| 2 | Pricing | `ruta/cotizador.html` (data-price attrs), `ruta/js/cotizador.js` (B2B_MULTIPLIERS, detailsData) | 3 HTML + 1 JS |
| 3 | Translations | `js/i18n/es.json`, `js/i18n/en.json` (1132 lines each) | 2 JSON + `js/i18n/i18n.js` |

Each wave follows: seed Firestore → deploy content service integration → verify E2E → remove hardcoded source.

During migration, `migration-bridge.js` resolves content by checking a `migrated_collections` config in Firestore. Collections not yet migrated fall back to static sources transparently.

## Key Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Firebase SDK loading | Modular imports via ES modules (`<script type="module">`) | Tree-shakeable; only loads Auth + Firestore; ~45KB gzipped total |
| Cache layer | IndexedDB via `idb` library | Larger capacity than localStorage; async API; supports structured data |
| Admin UI framework | Vanilla JS (no React/Vue) | Consistency with existing codebase; 1-3 admins don't justify a framework dependency |
| i18n integration | Modify `i18n.js` to accept a Firestore data source while keeping `data-i18n` contract | FR-004 requires zero changes to page HTML |
| Auth provider | Firebase Auth with Google sign-in | Managed identity; custom claims for role-based access; no password management |
| Audit log storage | Firestore `audit_log` collection with TTL field | 90-day retention via scheduled cleanup or Firestore TTL; co-located with content |

## Complexity Tracking

> No constitution violations detected. All decisions align with principles I-VIII.

| Decision | Justification | Simpler Alternative Considered |
|----------|---------------|-------------------------------|
| IndexedDB over localStorage | Translation dictionaries are ~30KB per language; localStorage has 5MB limit shared with other data; IndexedDB provides key-value store with structured cloning | localStorage would work initially but risks quota issues as content grows |
| Separate `migration-bridge.js` | Clean separation of migration logic from permanent content service; removable after migration complete | Inline conditionals in content-service.js would work but mix temporary and permanent code |
