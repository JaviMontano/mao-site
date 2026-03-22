# Implementation Plan: Firebase CMS Backend

**Branch**: `004-firebase-cms-backend` | **Date**: 2026-03-22 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-firebase-cms-backend/spec.md`

## Summary

Migrate editable site content (program catalogs, pricing, translations) from hardcoded HTML/JS to Firebase Firestore with a client-side admin interface. [DOC] The existing vanilla JS site gains a centralized content service that reads from Firestore, caches in IndexedDB, and falls back to static content during the migration period. [INFERENCE] An admin page at `/admin/` uses Firebase Authentication with custom claims for role-based access. [DOC]

## Technical Context

**Language/Version**: JavaScript ES2020+ (vanilla, no transpiler — matches existing codebase) [CODE]
**Primary Dependencies**: Firebase JS SDK v10 (modular/tree-shakeable: `firebase/app`, `firebase/firestore`, `firebase/auth`), `idb` (IndexedDB wrapper, ~1KB gzipped) [DOC]
**Storage**: Cloud Firestore (document store) + IndexedDB (client-side cache) [DOC]
**Testing**: Playwright (existing, for E2E), Firebase Emulator Suite (security rules + integration), Vitest (unit tests for content service) [INFERENCE]
**Target Platform**: Modern browsers (Chrome 90+, Firefox 90+, Safari 15+, Edge 90+) [INFERENCE]
**Project Type**: Web application (existing static site + new admin SPA) [CODE]
**Performance Goals**: Firestore content renders within 2s on 3G (SC-011), Lighthouse >= 90 (SC-010) [DOC]
**Constraints**: Offline-capable (Constitution VIII), no custom servers (Constitution I), data-layer security (Constitution VII), zero secrets in client code (FR-015) [DOC]
**Scale/Scope**: 63+ pages, 6 programs × 2 audiences × 2 languages, ~15K translation tokens, 1-3 admins [CODE]

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*
*Updated for Constitution v4.0.0 (16 principles).*

| Principle | Status | How Addressed |
|-----------|--------|---------------|
| I. Client-Rendered, Cloud-Backed | PASS | Firebase is a managed BaaS; no custom servers; browser renders content fetched from Firestore [DOC] |
| II. Accessibility-First | PASS | Admin interface must meet ARIA/keyboard standards (FR-022); public site unchanged [DOC] |
| III. SEO Integrity | PASS | Content renders within 2s DOM timeout (FR-021); Firestore fetch is faster than crawl timeout [INFERENCE] |
| IV. Component Consistency | PASS | Centralized content service module (FR-016); single `data-i18n` contract preserved (FR-004) [DOC] |
| V. Brand Separation | PASS | No external brand references; admin may show "powered by Firebase" subtly per constitution [DOC] |
| VI. Content Authority | PASS | Single source of truth per content piece; dual-source during migration with clear ownership (FR-017, FR-018) [DOC] |
| VII. Secure by Default | PASS | Firestore security rules enforce read/write at data layer (FR-012, FR-013); custom claims for admin role [DOC] |
| VIII. Offline Resilience | PASS | IndexedDB cache with configurable TTL (FR-005, FR-007); last-known-good content on failure (FR-006) [DOC] |
| IX. Test-Driven Development | PASS | TDD/ATDD mandatory; Playwright for E2E, Vitest for unit, Emulator for security rules; hash-locked .feature files [DOC] |
| X. Design System Governance | PASS | Admin UI uses existing design tokens (CSS custom properties); no new palette or typography [INFERENCE] |
| XI. Brand Voice Integrity | PASS | Admin UI is internal tooling — brand voice applies to public content managed through the CMS, not the CMS UI itself [INFERENCE] |
| XII. Code Sustainability | PASS | Business-readable naming, flat `js/cms/` scaffolding, README per module, documented contracts [DOC] |
| XIII. Think First, Act Next | PASS | Spec → Plan → Testify → Tasks phase order enforced; evidence tags on all claims in this document [DOC] |
| XIV. Simple First, Robust Next | PASS | Vanilla JS (no framework for admin), flat directory structure, sequential migration waves [DOC] |
| XV. BDD Full-Spectrum Quality | PASS | BDD scenarios expand to cover all quality angles: functional, security, offline, UX, UI, data, DevSecOps, CI/CD [DOC] |
| XVI. Parallel-Ready Workflow | PASS | Migration waves are sequential (XIV governs); each wave is an atomic, mergeable unit; worktrees available for non-wave tasks [DOC] |

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
  README.md            # Module purpose, API overview, extension guide
  firebase-config.js   # Firebase app initialization (public config only)
  content-service.js   # Centralized Firestore read + cache + fallback
  cache-manager.js     # IndexedDB wrapper with TTL logic
  auth-service.js      # Firebase Auth wrapper (login, role check)
  admin-api.js         # Admin write operations (edit, validate, audit log)
  migration-bridge.js  # Dual-source resolver (Firestore-first, static fallback)

admin/
  README.md            # Admin interface purpose, access, extension guide
  index.html           # Admin SPA shell (protected route)
  js/
    admin-app.js       # Admin UI controller
    program-editor.js  # Program catalog editor component
    price-editor.js    # Pricing editor component
    i18n-editor.js     # Translation editor component

firebase/
  README.md            # Firebase project setup, emulator usage, deploy guide
  firestore.rules      # Security rules (version-controlled)
  firestore.indexes.json
  firebase.json        # Firebase project config (hosting + emulators)
  .firebaserc          # Project alias

scripts/
  README.md            # Script inventory, usage, prerequisites
  set-admin-claim.js   # CLI script to set admin custom claims (Firebase Admin SDK)
  seed-firestore.js    # Seed Firestore with current hardcoded data

tests/
  README.md            # Test strategy, running tests, adding new tests
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

**Structure Decision**: Flat `js/cms/` directory within the existing site root — no monorepo, no build framework. [CODE] This preserves the vanilla JS architecture (Constitution I) and aligns with the existing `js/` convention. [INFERENCE] The `admin/` directory is a standalone HTML page with its own JS, consistent with the existing page-per-route pattern. [CODE] Firebase config lives in `firebase/` at repo root, matching standard Firebase CLI conventions. [DOC] Every new directory includes a README per Constitution XII. [DOC]

## Migration Strategy

Content migrates in 3 **sequential** waves, each independently deployable. Sequential execution is mandated by Constitution XIV (Simple First) — the shared content service module requires each wave to validate before the next begins. [DOC]

| Wave | Content | Source Today | Files Affected |
|------|---------|-------------|----------------|
| 1 | Program catalogs | `empresas/index.html:360-403`, `personas/index.html:412-455` [CODE] | 2 HTML files |
| 2 | Pricing | `ruta/cotizador.html` (data-price attrs), `ruta/js/cotizador.js` (B2B_MULTIPLIERS, detailsData) [CODE] | 3 HTML + 1 JS |
| 3 | Translations | `js/i18n/es.json`, `js/i18n/en.json` (1132 lines each) [CODE] | 2 JSON + `js/i18n/i18n.js` |

Each wave follows: seed Firestore → deploy content service integration → verify E2E → remove hardcoded source. [INFERENCE]

During migration, `migration-bridge.js` resolves content by checking a `migrated_collections` config in Firestore. [INFERENCE] Collections not yet migrated fall back to static sources transparently. [DOC]

**Wave sequencing rationale** (XIV compliance): Wave 1 establishes the content service pattern (fetch → cache → fallback). Waves 2 and 3 reuse it. Running them in parallel would require agreeing on the internal content-service API before any wave starts, adding coordination overhead that exceeds the time saved. For a 1-person + AI team, sequential is faster. [INFERENCE]

## Key Technical Decisions

| Decision | Choice | Rationale | Evidence |
|----------|--------|-----------|----------|
| Firebase SDK loading | Modular imports via ES modules (`<script type="module">`) | Tree-shakeable; only loads Auth + Firestore; ~45KB gzipped total | [DOC] Firebase docs state modular SDK is ~40-50KB for auth+firestore |
| Cache layer | IndexedDB via `idb` library | Larger capacity than localStorage; async API; supports structured data | [DOC] MDN: IndexedDB has no practical size limit vs 5MB localStorage |
| Admin UI framework | Vanilla JS (no React/Vue) | Consistency with existing codebase; 1-3 admins don't justify a framework dependency (XIV: Simple First) | [INFERENCE] Based on team size and admin complexity |
| i18n integration | Modify `i18n.js` to accept a Firestore data source while keeping `data-i18n` contract | FR-004 requires zero changes to page HTML | [DOC] Spec FR-004 |
| Auth provider | Firebase Auth with Google sign-in | Managed identity; custom claims for role-based access; no password management | [DOC] Firebase Auth docs |
| Audit log storage | Firestore `audit_log` collection with TTL field | 90-day retention via scheduled cleanup or Firestore TTL; co-located with content | [DOC] Firestore TTL policy docs |
| Migration sequencing | Sequential waves (not parallel) | Shared content service module; each wave validates pattern before next starts (XIV: Simple First) | [DOC] Clarification 2026-03-22 Q1 |

## Complexity Tracking

> No constitution violations detected. All decisions align with principles I-XVI.

| Decision | Justification | Simpler Alternative Considered |
|----------|---------------|-------------------------------|
| IndexedDB over localStorage | Translation dictionaries are ~30KB per language [CODE]; localStorage has 5MB limit shared with other data [DOC]; IndexedDB provides key-value store with structured cloning [DOC] | localStorage would work initially but risks quota issues as content grows [INFERENCE] |
| Separate `migration-bridge.js` | Clean separation of migration logic from permanent content service; removable after migration complete [INFERENCE] | Inline conditionals in content-service.js would work but mix temporary and permanent code [INFERENCE] |

## Clarifications

### Session 2026-03-22

- Q: Are the 3 migration waves parallelizable or sequential? -> A: Sequential. Shared content service module requires each wave to validate before next starts. XIV (Simple First) governs — sequential is faster for a 1-person + AI team. [Migration Strategy, XVI, XIV]
- Q: Should BDD scenarios expand to full-spectrum coverage (XV) before tasks? -> A: Yes — expand now via testify re-run. Full-spectrum BDD coverage required before generating tasks. [XV, Testify, Tasks]
- Q: Should evidence tags be applied retroactively to spec and plan? -> A: Yes — full retroactive tagging on both spec and plan for XIII compliance. [XIII, Spec, Plan]
