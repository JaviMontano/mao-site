# Tasks: Firebase CMS Backend

**Input**: Design documents from `/specs/004-firebase-cms-backend/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md, tests/features/
**Constitution**: v5.2.0 (TDD mandatory — IX, Sequential-first — XVI)
**Migration**: Sequential waves per XIV (Simple First) + XVI (Sequential-First, WIP ≤ 3)

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[USn]**: Which user story this task belongs to
- Test tasks reference .feature scenario IDs (TS-xxx)
- File paths follow plan.md project structure

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Firebase project scaffolding and dependency management

- [x] T001 Create `firebase/` directory with `firebase.json`, `.firebaserc`, and `firebase/README.md`
- [x] T002 Create `js/cms/` directory with placeholder `js/cms/README.md` (module purpose + planned API surface — full documentation deferred to T087)
- [x] T003 [P] Create `admin/` directory structure: `admin/index.html`, `admin/js/`, `admin/README.md`
- [x] T004 [P] Create `scripts/` directory with `scripts/README.md` (script inventory, usage, prerequisites)
- [x] T005 [P] Create `tests/` directory structure: `tests/unit/`, `tests/integration/`, `tests/e2e/`, `tests/README.md`
- [x] T006 Add Firebase SDK (`firebase`), `idb`, and Vitest (dev) to `package.json`
- [x] T007 Configure Firebase Emulator Suite (Auth + Firestore) in `firebase/firebase.json`

**Checkpoint**: Project skeleton exists, dependencies installed, emulators configurable

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core modules that ALL user stories depend on. No story work begins until this phase completes.

**CRITICAL**: Content service, cache manager, auth service, and security rules are shared infrastructure.

### Tests (TDD — write first, verify they fail)

- [x] T008 [P] Write unit tests for CacheManager (get, set, isStale, TTL logic) in `tests/unit/cache-manager.test.js`
- [x] T009 [P] Write unit tests for ContentService (init, getPrograms, getPricing, getTranslations, isReady, onReady, fallback chain) in `tests/unit/content-service.test.js`
- [x] T009b [P] Write unit tests for MigrationBridge (dual-source resolve, `migrated_collections` check, Firestore-first with static fallback, null when both fail) in `tests/unit/migration-bridge.test.js`
- [x] T009c [P] Write unit tests for AuthService (`isAdmin` claim check, `onAuthStateChanged` subscription, sign-out cleanup) in `tests/unit/auth-service.test.js`

### Implementation

- [x] T010 Implement Firebase app initialization in `js/cms/firebase-config.js` (public config only, ES module, no secrets) [TS-022]
- [x] T011 Implement CacheManager (IndexedDB via `idb`, get/set/isStale with TTL, structured stores for programs/pricing/translations) in `js/cms/cache-manager.js` — must pass T008
- [x] T012 Implement ContentService core (init, Firestore instance, `config/settings` read, `migrated_collections` check, ready state) in `js/cms/content-service.js` — must pass T009
- [x] T013 [P] Implement AuthService (Google sign-in, `isAdmin` via custom claims, `onAuthStateChanged`, `signOut`) in `js/cms/auth-service.js` — must pass T009c
- [x] T014 [P] Write Firestore security rules in `firebase/firestore.rules` (public read on programs/pricing/translations, admin-only write with schema validation, audit_log append-only, config admin-only)
- [x] T015 [P] Create Firestore indexes in `firebase/firestore.indexes.json` (programs: audience + is_published + sort_order)
- [x] T016 Write security rules integration tests in `tests/integration/firestore-rules.test.js` — positive and negative scenarios for all collections [TS-032, TS-033, TS-034, TS-035, TS-036, TS-037, TS-038, TS-039]
- [x] T017 [P] Create seed script scaffold `scripts/seed-firestore.js` (base structure with Firestore emulator connection, collection iteration, CLI args — collection-specific extractors added by T033/T044/T068)
- [x] T018 [P] Create admin claim script `scripts/set-admin-claim.js` (Firebase Admin SDK, `--emulator` flag, `--email` arg)
- [x] T019 Implement MigrationBridge (dual-source resolver: check `migrated_collections`, Firestore-first → cache → `null` terminal fallback — content-agnostic, consumers handle `null`) in `js/cms/migration-bridge.js` — must pass T009b [TS-030]

**Checkpoint**: Core infrastructure tested and working. `npm test` passes. Emulator security rules validated.

---

## Phase 3: User Story 6 — Security Rules & Access Control (Priority: P1)

**Goal**: Firestore security rules enforce least-privilege access with schema validation.
**Independent Test**: Attempt unauthenticated write to Firestore — denied.

> Security rules are implemented in Phase 2 (T014, T016) as foundational infrastructure.
> This phase validates the full security contract and adds the codebase scan.

- [x] T020 [US6] Verify all security rule tests pass against emulator (run T016 test suite) [TS-032, TS-033, TS-034, TS-035, TS-036, TS-037, TS-038, TS-039]
- [x] T021 [US6] Verify no wildcard or open permissions in `firebase/firestore.rules` (manual review + grep) [TS-037]
- [x] T022 [US6] Verify audit_log is append-only (no update/delete for any role) [TS-039]
- [x] T023 [US6] Add codebase scan test: zero direct Firestore queries outside `js/cms/` [TS-040]

**Checkpoint**: Security rules fully validated. All TS-032 through TS-040 pass.

---

## Phase 4: User Story 1 — Program Catalog from Cloud (Priority: P1, Wave 1)

**Goal**: Program catalogs on empresas/ and personas/ served from Firestore with fallback.
**Independent Test**: Update program description in admin, refresh public page, see new text.

### Tests (TDD)

- [x] T024 [P] [US1] Write E2E test: program card displays Firestore content on empresas page in `tests/e2e/public-content.spec.js` [TS-001]
- [x] T025 [P] [US1] Write E2E test: program card displays Firestore content on personas page in `tests/e2e/public-content.spec.js` [TS-002]
- [x] T026 [P] [US1] Write E2E test: cached content shown when Firestore unreachable in `tests/e2e/offline-resilience.spec.js` [TS-004]
- [x] T027 [P] [US1] Write E2E test: language toggle uses bilingual Firestore content in `tests/e2e/public-content.spec.js` [TS-005]
- [x] T028 [P] [US1] Write E2E test: first load on 3G renders within 2s or falls back in `tests/e2e/public-content.spec.js` [TS-006]

### Implementation

- [x] T029 [US1] Implement `ContentService.getPrograms(audience)` method — Firestore query (audience + is_published, ordered by sort_order) → cache → null fallback chain
- [x] T030 [US1] Integrate content service into `empresas/index.html` — replace inline JS program objects with `ContentService.getPrograms('empresas')` call, render program cards from Firestore data
- [x] T031 [US1] Integrate content service into `personas/index.html` — replace inline JS program objects with `ContentService.getPrograms('personas')` call
- [x] T032 [US1] Implement program-specific null handler — when MigrationBridge returns `null` for programs, preserve existing inline HTML rendering (no-op: skip card re-render, keep DOM intact)
- [x] T033 [US1] Extend `scripts/seed-firestore.js` with program extractor — parse program data using semantic selectors (DOM structure, data attributes, or regex patterns on JS objects), verify seeded data in emulator
- [x] T034 [US1] Run E2E tests T024-T028, verify all pass [TS-001, TS-002, TS-004, TS-005, TS-006]

**Checkpoint**: Wave 1 complete. Programs load from Firestore on both audience pages. Offline fallback works. Existing bilingual behavior preserved.

---

## Phase 5: User Story 2 — Pricing from Cloud (Priority: P1, Wave 2)

**Goal**: All pricing data (B2C, B2B multipliers, premium) served from Firestore.
**Independent Test**: Change a price in admin, reload cotizador, confirm new price in calculations.

### Tests (TDD)

- [x] T035 [P] [US2] Write E2E test: cotizador uses B2C prices from Firestore in `tests/e2e/public-content.spec.js` [TS-007]
- [x] T036 [P] [US2] Write E2E test: empresas cotizador uses B2B multipliers from Firestore in `tests/e2e/public-content.spec.js` [TS-008]
- [x] T037 [P] [US2] Write E2E test: premium catalog displays Firestore prices in `tests/e2e/public-content.spec.js` [TS-009]
- [x] T038 [P] [US2] Write E2E test: cotizador works with cached prices when Firestore unreachable in `tests/e2e/offline-resilience.spec.js` [TS-011]

### Implementation

- [x] T039 [US2] Implement `ContentService.getPricing(category)` method — Firestore read → cache → null fallback
- [x] T040 [US2] Integrate content service into `ruta/cotizador.html` — replace `data-price` attributes with Firestore B2C prices
- [x] T041 [US2] Integrate content service into `ruta/js/cotizador.js` — replace `B2B_MULTIPLIERS` constant with Firestore data
- [x] T042 [US2] Integrate content service into `ruta/cotizador-empresas.html` — B2B multipliers from Firestore
- [x] T043 [US2] Integrate content service into `recursos/premium/index.html` — replace hardcoded premium pricing table with Firestore data
- [x] T044 [US2] Extend `scripts/seed-firestore.js` with pricing extractor — parse B2C from `[data-price]` attributes, B2B from `B2B_MULTIPLIERS` object pattern in `cotizador.js`, premium from pricing table structure in `recursos/premium/index.html`, verify seeded data in emulator
- [x] T045 [US2] Run E2E tests T035-T038, verify all pass [TS-007, TS-008, TS-009, TS-011]

**Checkpoint**: Wave 2 complete. All pricing flows use Firestore. Cotizador calculations verified with dynamic data.

---

## Phase 6: User Story 4 — Admin Interface (Priority: P1)

**Goal**: Authenticated admin editor at `/admin/` for programs, prices, and translations.
**Independent Test**: Login as admin, edit program, save, verify on public page.

### Tests (TDD — E2E)

- [x] T046 [P] [US4] Write E2E test: unauthenticated user sees login screen in `tests/e2e/admin-flow.spec.js` [TS-017]
- [x] T047 [P] [US4] Write E2E test: admin sees all programs with bilingual content in `tests/e2e/admin-flow.spec.js` [TS-018]
- [x] T048 [P] [US4] Write E2E test: save blocked when language variant missing in `tests/e2e/admin-flow.spec.js` [TS-019]
- [x] T049 [P] [US4] Write E2E test: change log entry created on valid edit in `tests/e2e/admin-flow.spec.js` [TS-020]
- [x] T050 [P] [US4] Write E2E test: non-admin user denied access in `tests/e2e/admin-flow.spec.js` [TS-021]
- [x] T051 [P] [US4] Write E2E test: no secrets in client-side code in `tests/e2e/admin-flow.spec.js` [TS-022]
- [x] T052 [P] [US4] Write E2E test: admin interface accessibility in `tests/e2e/admin-flow.spec.js` [TS-023]
- [x] T053 [P] [US4] Write E2E test: admin input sanitized before storage in `tests/e2e/admin-flow.spec.js` [TS-024]

### Tests (TDD — Unit)

- [x] T053a [P] [US4] Write unit tests for AdminAPI (updateProgram, updatePricing, updateTranslations, audit log creation, input sanitization) in `tests/unit/admin-api.test.js` [TS-020, TS-024]
- [x] T053b [P] [US4] Write unit tests for program-editor (program list rendering, bilingual validation, save-with-audit flow) in `tests/unit/program-editor.test.js` [TS-018, TS-019]
- [x] T053c [P] [US4] Write unit tests for price-editor (numeric validation, B2C/B2B/premium field mapping) in `tests/unit/price-editor.test.js`
- [x] T053d [P] [US4] Write unit tests for i18n-editor (key browsing, search/filter, side-by-side rendering) in `tests/unit/i18n-editor.test.js`

### Implementation

- [x] T054 [US4] Implement AdminAPI module (updateProgram, updatePricing, updateTranslations, audit log creation, input sanitization) in `js/cms/admin-api.js` — must pass T053a [TS-020, TS-024]
- [x] T055a [US4] Build admin shell page `admin/index.html` — login screen, auth gate (show login when unauthenticated, deny non-admin), basic page structure [TS-017, TS-021]
- [x] T055b [US4] Add tab navigation (Programs/Prices/Translations), ARIA roles (tablist, tab, tabpanel), and keyboard navigation (arrow keys, Home/End) to `admin/index.html` [TS-023]
- [x] T056 [US4] Implement admin-app.js — auth state handling, tab routing, admin claim check, non-admin denial in `admin/js/admin-app.js`
- [x] T057 [US4] Implement program-editor.js — 6-program list, side-by-side ES/EN editing, bilingual validation, save with audit log in `admin/js/program-editor.js` — must pass T053b [TS-018, TS-019]
- [x] T058 [US4] Implement price-editor.js — B2C/B2B/premium editing, numeric validation in `admin/js/price-editor.js` — must pass T053c
- [x] T059 [US4] Implement i18n-editor.js — translation key browser, search/filter, side-by-side editing in `admin/js/i18n-editor.js` — must pass T053d
- [x] T061a [US4] Run admin-only E2E tests T046-T053, verify all pass [TS-017, TS-018, TS-019, TS-020, TS-021, TS-022, TS-023, TS-024]

**Checkpoint A**: Admin interface functional (standalone). Login, edit, save, audit log, validation — all verified. Can complete in parallel with Phase 4.

### Integration Tests (requires Phase 4 complete)

- [x] T060 [US4] Write E2E test: admin edit propagates to public page in `tests/e2e/admin-flow.spec.js` [TS-003, TS-010]
- [x] T061b [US4] Run integration E2E tests T060, verify admin edits propagate to public pages [TS-003, TS-010] — **depends on T030, T031 (Phase 4)**

**Checkpoint B**: Admin-to-public integration verified. Full Phase 6 complete.

---

## Phase 7: User Story 3 — Translations from Cloud (Priority: P2, Wave 3)

**Goal**: i18n dictionaries fetched from Firestore with `data-i18n` contract preserved.
**Independent Test**: Update a translation in admin, reload page, see new text.

### Tests (TDD)

- [x] T062 [P] [US3] Write E2E test: i18n module fetches from Firestore in `tests/e2e/public-content.spec.js` [TS-012]
- [x] T063 [P] [US3] Write E2E test: data-i18n contract preserved in `tests/e2e/public-content.spec.js` [TS-013]
- [x] T064 [P] [US3] Write E2E test: first visit falls back to static JSON when Firestore unreachable in `tests/e2e/offline-resilience.spec.js` [TS-015]
- [x] T065 [P] [US3] Write E2E test: cached translations refresh after TTL in `tests/e2e/offline-resilience.spec.js` [TS-016]

### Implementation

- [x] T066 [US3] Implement `ContentService.getTranslations(lang)` method — Firestore read, strip `_meta`, cache, null fallback
- [x] T067 [US3] Modify `js/i18n/i18n.js` — adapter pattern: use ContentService when available, fall back to XHR JSON fetch when not (FR-004 contract preserved)
- [x] T068 [US3] Extend `scripts/seed-firestore.js` with translation importer — import from `js/i18n/es.json` and `js/i18n/en.json`, verify seeded data in emulator
- [x] T069 [US3] Write E2E test: admin translation edit appears on reload in `tests/e2e/admin-flow.spec.js` [TS-014]
- [x] T070 [US3] Run E2E tests T062-T065 and T069, verify all pass [TS-012, TS-013, TS-014, TS-015, TS-016]
- [x] T071 [US3] Run existing Playwright bilingual test suites — verify 100% still pass (SC-003)

**Checkpoint**: Wave 3 complete. Translations served from Firestore. `data-i18n` contract intact. Existing bilingual tests pass.

---

## Phase 8: User Story 5 — Offline Resilience & Caching (Priority: P2)

**Goal**: Full offline operation after first visit, TTL-bounded cache, graceful mid-session failure.
**Independent Test**: Load site, disconnect, reload — cached content appears.

### Tests (TDD)

- [x] T072 [P] [US5] Write E2E test: full offline operation after first visit in `tests/e2e/offline-resilience.spec.js` [TS-025]
- [x] T073 [P] [US5] Write E2E test: stale cache triggers background refresh in `tests/e2e/offline-resilience.spec.js` [TS-026]
- [x] T074 [P] [US5] Write E2E test: fresh cache served without Firestore fetch in `tests/e2e/offline-resilience.spec.js` [TS-027]
- [x] T075 [P] [US5] Write E2E test: updated prices propagate after TTL expiry in `tests/e2e/offline-resilience.spec.js` [TS-028]
- [x] T076 [P] [US5] Write E2E test: mid-session Firestore failure handled gracefully in `tests/e2e/offline-resilience.spec.js` [TS-029]
- [x] T077 [P] [US5] Write E2E test: non-migrated content from static source in `tests/e2e/offline-resilience.spec.js` [TS-030]

### Implementation

- [x] T078 [US5] Implement stale-while-revalidate pattern in ContentService — serve cached immediately, background fetch when stale, update cache + re-render on fresh data
- [x] T079 [US5] Implement graceful mid-session failure handling — catch Firestore errors, log to `console.warn` for developer observability, serve from cache, no user-visible errors (no toasts/banners)
- [x] T080 [US5] Verify `config/settings.cache_ttl_ms` is respected across all content types (programs, pricing, translations)
- [x] T081 [US5] Run E2E tests T072-T077, verify all pass [TS-025, TS-026, TS-027, TS-028, TS-029, TS-030]

**Checkpoint**: Offline resilience complete. Site fully functional without connectivity after first visit.

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Performance validation, documentation, cleanup

- [x] T082 [P] Run Lighthouse on homepage, empresas/, personas/ — verify Performance >= 90 [TS-031]
- [x] T083 [P] Run grep scan on deployed assets — verify zero API keys or secrets in client code [TS-022]
- [x] T084 [P] Verify all 40 .feature scenarios pass (full test suite run)
- [x] T085 Update Firestore document `config/settings` field `migrated_collections` to `["programs", "pricing", "translations"]` via seed script or Firebase Console — signals MigrationBridge to stop static fallback
- [x] T086 Run quickstart.md validation — execute all 7 test scenarios (T1-T7) from quickstart.md
- [x] T087 [P] Update `js/cms/README.md` with complete API documentation, usage examples, and extension guide (replaces Phase 1 placeholder from T002)
- [x] T088 [P] Write `admin/README.md` (admin interface purpose, access requirements, adding new editors)
- [x] T089 [P] Write `firebase/README.md` (Firebase project setup, emulator usage, deploy guide)
- [x] T090 [P] Write `scripts/README.md` (script inventory, usage, prerequisites)
- [x] T091 [P] Write `tests/README.md` (test strategy, running tests, adding new tests)

**Checkpoint**: All 40 .feature scenarios pass. Lighthouse >= 90. Zero secrets exposed. Documentation complete.

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup) ─────────────────────────────────> no deps
Phase 2 (Foundational) ──────────────────────────> depends on Phase 1
Phase 3 (US6: Security Rules) ───────────────────> depends on Phase 2
Phase 4 (US1: Programs — Wave 1) ────────────────> depends on Phase 2
Phase 5 (US2: Pricing — Wave 2) ─────────────────> depends on Phase 4 (sequential waves)
Phase 6a (US4: Admin UI — T046-T061a) ──────────> depends on Phase 2 (runs parallel with Phase 4)
Phase 6b (US4: Integration — T060-T061b) ───────> depends on Phase 4 (admin-to-public propagation)
Phase 7 (US3: Translations — Wave 3) ────────────> depends on Phase 5 (sequential waves)
Phase 8 (US5: Offline Resilience) ───────────────> depends on Phases 4, 5, 7 (all waves)
Phase 9 (Polish) ────────────────────────────────> depends on all prior phases
```

### Parallel Opportunities

| Batch | Tasks | Rationale |
|-------|-------|-----------|
| Phase 1 parallel | T003, T004, T005 | Independent directory creation |
| Phase 2 parallel (tests) | T008, T009 | Independent test files |
| Phase 2 parallel (impl) | T013, T014, T015, T017, T018 | Independent modules |
| Phase 3 + Phase 6a | US6 validation + US4 admin UI | No dependency between them after Phase 2 |
| Phase 6b after Phase 4 | US4 integration tests | T060 needs public page rendering from Phase 4 |
| Phase 4 tests | T024, T025, T026, T027, T028 | Independent E2E test scenarios |
| Phase 5 tests | T035, T036, T037, T038 | Independent E2E test scenarios |
| Phase 6 tests | T046-T053 | Independent E2E test scenarios |
| Phase 7 tests | T062, T063, T064, T065 | Independent E2E test scenarios |
| Phase 8 tests | T072-T077 | Independent E2E test scenarios |
| Phase 9 docs | T087, T088, T089, T090, T091 | Independent README files |

### Critical Path

```
T001 → T006 → T010 → T011 → T012 → T029 → T030 → T039 → T040 → T066 → T067 → T078 → T084
```

13 tasks on critical path. Estimated parallel batch count: ~15 batches (vs 91 sequential).

### MVP Scope Suggestion

**MVP = Phases 1-4 + Phase 6** (Setup + Foundation + Security + Programs + Admin)
- Delivers: program catalog from Firestore, admin editor, security rules, offline cache
- 61 tasks, covers US1 + US4 + US6 (all P1 stories)
- Waves 2-3 and offline polish can follow as increments

---

## Notes

- [P] tasks = different files, no dependencies
- [USn] label maps task to specific user story for traceability
- Migration waves are SEQUENTIAL per Constitution XIV — Phase 4 → Phase 5 → Phase 7
- Phase 6a (Admin UI) can run in parallel with Waves; Phase 6b (integration tests) requires Phase 4 complete
- TDD mandatory (Constitution IX): test tasks always precede implementation
- Implementation auto-commits after each task
- Stop at any checkpoint to validate story independently

---

## Clarifications

### Session 2026-03-22

- Q: Can Phase 6 truly run parallel with Phase 4 given T060 depends on T030/T031? -> A: Split Phase 6 into 6a (admin UI, parallel) and 6b (integration tests, post-Phase 4). T061 split into T061a + T061b. [T060, T061, Phase 6, Dependency Table]
- Q: Do T033/T044/T068 extend the seed script or run it? -> A: Extend + verify. T017 creates scaffold; T033/T044/T068 add collection-specific extractors and verify seeded data. [T017, T033, T044, T068]
- Q: Is T002 (README) duplicated by T087? -> A: No — T002 creates placeholder (planned API), T087 updates with complete documentation post-implementation. [T002, T087]
- Q: Where is config/settings.migrated_collections stored? -> A: Firestore document `config/settings`, updated via seed script or Firebase Console. [T085, T012, T019]
- Q: Can T061 complete if Phase 6 runs parallel with Phase 4? -> A: Split T061 into T061a (admin-only tests, completes with Phase 6a) and T061b (integration tests, completes after Phase 4). [T061, T060, Phase 6]
- Q: Are migration waves (Phase 4→5→7) sequential by technical dependency or by choice? -> A: Intentional risk control (Constitution XIV + XVI). Sequential execution reduces debugging surface — one content type fully validated before starting next. Not a technical dependency; the methods are independent. Sequential-first is the default (XVI v5.2.0). [Phase 4, Phase 5, Phase 7, Dependency Table, Critical Path]
- Q: Is T055 (admin shell) too large for a single task? -> A: Yes. Split into T055a (shell + auth gate) and T055b (tab nav + ARIA + keyboard). One concern per task, one TDD cycle per task. Task atomicity rule added to Constitution XIV. [T055, T055a, T055b, Phase 6]
- Q: Are hardcoded line numbers in T033/T044 fragile? -> A: Yes. Replace with semantic selectors (DOM structure, data attributes, regex on named patterns like `B2B_MULTIPLIERS`). Line numbers break when upstream tasks modify the same files. [T033, T044]
- Q: Should admin editors (T057-T059) and AdminAPI (T054) have unit tests, or are E2E tests sufficient? -> A: C-full — unit tests for all 4 modules (T053a-T053d). Socratic debate confirmed: AdminAPI (sanitization, audit) and program-editor (bilingual validation) are high-risk logic that E2E doesn't isolate. price-editor and i18n-editor are marginal but kept for IX/XV consistency — low effort, complete TDD coverage. XIV tension resolved: E2E tests cover journeys, not edge cases of isolated logic. [T053a, T053b, T053c, T053d, T054, T057, T058, T059, Phase 6]
- Q: MigrationBridge (T019) has no unit test — TDD violation? -> A: Add T009b for MigrationBridge unit tests (dual-source resolve, migrated_collections check, static fallback, null-when-both-fail). T019 must pass T009b. TS-030 E2E coverage in Phase 8 is insufficient for TDD compliance. [T009b, T019, T077, Phase 2]
- Q: AuthService (T013) has no unit test — TDD violation? -> A: Add T009c for AuthService unit tests (isAdmin claim check, onAuthStateChanged subscription, sign-out cleanup). T013 must pass T009c. Consistent with IX/XV reasoning from T053a-d session. [T009c, T013, Phase 2]
- Q: T019 and T032 both mention "static fallback in MigrationBridge" — scope overlap? -> A: Clarify boundary: T019 is content-agnostic data resolver (Firestore → cache → null). T032 is program-specific null handler (preserve inline HTML when null). MigrationBridge never touches DOM — consumers decide what null means. Socratic debate confirmed: separation of concerns (data vs render), XIV atomicity, and Phase 2/4 dependency direction all favor B. [T019, T032, Phase 2, Phase 4]
- Q: T079 "catch Firestore errors silently" — does "silently" mean no logging? -> A: No. "Silently" = no user-visible errors (no toasts, banners, error screens). Errors MUST log to console.warn for developer observability. Cache fallback is the user-facing behavior; console.warn is the developer-facing signal. [T079, Phase 8]
