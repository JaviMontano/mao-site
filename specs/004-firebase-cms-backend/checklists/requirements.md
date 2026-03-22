# Requirements Checklist: 004-firebase-cms-backend

**Purpose**: Validate requirements quality — completeness, clarity, consistency, measurability, and coverage
**Created**: 2026-03-22
**Reviewed**: 2026-03-22 (post-plan extension)
**Feature**: [spec.md](../spec.md) | [plan.md](../plan.md)

## Content Quality

- [x] CHK001 No implementation details in spec (technology-agnostic beyond Firebase mandate from Constitution)
- [x] CHK002 All requirements use MUST/SHOULD/MAY language
- [x] CHK003 No framework/library names in requirements beyond Firebase (constitutionally mandated BaaS)
- [x] CHK004 Success criteria are measurable with numbers
- [x] CHK005 User stories describe WHAT and WHY, not HOW

## Requirement Completeness

- [x] CHK006 All Constitution v2.0.0 principles addressed (I: client-rendered, VI: content authority, VII: security, VIII: offline resilience)
- [x] CHK007 All content types identified for migration (programs, prices, translations, premium SKUs)
- [x] CHK008 Migration coexistence addressed (dual-source resolution in FR-017)
- [x] CHK009 Edge cases documented (migration period, broken input, concurrent edits, quota exceeded, new programs)
- [x] CHK010 Priority levels assigned (P1: 4 stories, P2: 2 stories)
- [x] CHK011 Each user story independently testable
- [x] CHK012 Admin interface requirements include validation, audit logging, and accessibility

## Feature Readiness

- [x] CHK013 Branch created: `004-firebase-cms-backend`
- [x] CHK014 Spec file written: `specs/004-firebase-cms-backend/spec.md`
- [x] CHK015 No [NEEDS CLARIFICATION] markers remain
- [x] CHK016 Success criteria cover all functional requirements
- [x] CHK017 Acceptance scenarios use Given/When/Then format

## Brand & Standards Alignment

- [x] CHK018 Content authority principle (VI) enforced — single source of truth per content piece
- [x] CHK019 Security principle (VII) enforced — data-layer security, managed identity, no client secrets
- [x] CHK020 Offline resilience principle (VIII) enforced — caching, fallback, degraded mode

## Admin & Operations

- [x] CHK021 Admin provisioning mechanism defined (CLI script + runbook, no admin management UI in v1)
- [x] CHK022 Audit log retention policy specified (90-day bounded retention via Firestore TTL)
- [x] CHK023 Content recovery mechanism addressed (manual via audit log, no rollback UI in v1)

## Clarity & Ambiguity (post-plan review)

- [x] CHK024 Is the "configurable TTL" (FR-007) clear about WHO configures it and WHERE? [Clarity, FR-007] — Yes: spec says configurable with default 1h; plan locates it in `config/settings.cache_ttl_ms`; admin-writable. Clarification session confirms "where" is plan-level.
- [x] CHK025 Is the "sanitized input" requirement (FR-023) specific about what sanitization means? [Clarity, FR-023] — Yes: "no raw HTML stored, plain text or structured data only." Edge case section reinforces: "no unclosed HTML tags."
- [x] CHK026 Is the "within 2 seconds on 3G" performance target (FR-021) defined with a measurement method? [Clarity, SC-011] — Measurable: 2s on 3G is a Lighthouse throttled network profile. SC-010 adds Lighthouse >= 90 as a cross-check.
- [x] CHK027 Is the concurrent edit behavior (Edge Cases) clear about conflict resolution strategy? [Clarity, Edge Cases] — Yes: "last-write-wins with a warning" and "content was modified by another user alert if document version has changed." Sufficient for 1-3 admins.

## Consistency (spec ↔ plan ↔ constitution)

- [x] CHK028 Does the plan's Firestore collection structure match the content types in spec FR-001 through FR-003? [Consistency, FR-001/002/003 → data-model.md] — Yes: `programs`, `pricing`, `translations` collections map 1:1 to FR-001 (programs), FR-002 (pricing), FR-003 (translations).
- [x] CHK029 Does the plan's bilingual document schema (`title_es`/`title_en`) satisfy FR-019 (bilingual content in single document)? [Consistency, FR-019 → data-model.md] — Yes: all bilingual fields stored as `{field}_es`/`{field}_en` in the same document.
- [x] CHK030 Does the plan's `migration-bridge.js` satisfy FR-017 (dual-source) and FR-018 (single authority)? [Consistency, FR-017/018 → plan.md] — Yes: migration bridge checks `migrated_collections` config; collections not listed fall back to static; authority is clear per collection.
- [x] CHK031 Does the plan's auth approach (Google sign-in + custom claims) satisfy FR-008 (admin custom claim)? [Consistency, FR-008 → research.md R3] — Yes: Firebase Auth with Google provider, custom claims checked by security rules and `AuthService.isAdmin()`.
- [x] CHK032 Is the plan's security rules design consistent with FR-012 (public read, admin write) and FR-013 (schema validation)? [Consistency, FR-012/013 → data-model.md] — Yes: data-model defines validation rules per collection; plan structure includes `firestore.rules` file.
- [x] CHK033 Does the plan's caching strategy (IndexedDB + TTL) align with FR-005 (client-side cache), FR-006 (display cached), and FR-007 (bounded TTL)? [Consistency, FR-005/006/007 → research.md R2] — Yes: IndexedDB cache with `cachedAt` timestamp, configurable TTL, stale-while-revalidate pattern.

## Acceptance Criteria Quality

- [x] CHK034 Does every user story have at least one offline/failure scenario? [Scenario Coverage, US-1/2/3/4/5/6] — Yes: US-1 scenario 3 (unreachable), US-2 scenario 5 (NaN prevention), US-3 scenario 4 (first-visit fallback), US-4 scenario 6 (no secrets), US-5 scenarios 1+5 (offline), US-6 scenarios 2+3 (denial).
- [x] CHK035 Do acceptance scenarios for US-1 cover both audiences (empresas + personas)? [Scenario Coverage, US-1] — Scenario 1 explicitly names empresas; spec input references both. FR-001 says "empresas/ and personas/ pages." Covered.
- [x] CHK036 Do acceptance scenarios for US-2 cover all pricing categories (B2C, B2B, premium)? [Scenario Coverage, US-2] — Yes: scenario 1 (B2C), scenario 2 (B2B multipliers), scenario 3 (premium), scenario 4 (price change propagation).
- [x] CHK037 Do acceptance scenarios cover the "first visit with no cache" edge case? [Scenario Coverage, US-1/3/5] — US-1 scenario 5 (3G first load), US-3 scenario 4 (unreachable on first visit, falls back to static JSON), US-5 implicitly (requires "loaded at least once").
- [x] CHK038 Is there an acceptance scenario for admin role escalation prevention (non-admin user)? [Scenario Coverage, US-4/6] — Yes: US-4 scenario 5 (non-admin denied) and US-6 scenario 3 (authenticated without admin claim denied).

## SC-XXX Test Coverage

- [x] CHK039 Does SC-001 (100% programs from Firestore) have a clear verification method? [Measurability, SC-001] — Yes: "zero inline JS program objects remain" — verifiable by grep scan for `programsData` in HTML files.
- [x] CHK040 Does SC-002 (100% pricing from Firestore) have a clear verification method? [Measurability, SC-002] — Yes: "zero hardcoded data-price attributes or JS constants" — verifiable by grep scan.
- [x] CHK041 Does SC-005 (security rules pass 100%) reference a test suite? [Measurability, SC-005] — Yes: FR-014 requires rules tested against Firebase Emulator; plan includes `tests/integration/firestore-rules.test.js`.
- [x] CHK042 Does SC-008 (zero secrets in client code) have an automated verification? [Measurability, SC-008] — Yes: "verified by grep scan of deployed assets." Plan can implement this as CI step.
- [x] CHK043 Does SC-010 (Lighthouse >= 90) cover all affected pages? [Measurability, SC-010] — Yes: "homepage, empresas/, personas/" — the three highest-traffic pages.
- [x] CHK044 Is SC-009 (content update within 5 seconds) consistent with FR-020 (immediate effect)? [Consistency, SC-009 vs FR-020] — Yes: FR-020 says "immediately, no deployment step"; SC-009 makes it measurable at "within 5 seconds." These are consistent — "immediately" in user terms means "seconds, not minutes/deploys."

## Edge Case Coverage

- [x] CHK045 Is the Firestore free tier quota exhaustion scenario complete? [Edge Cases] — Yes: "site continues on cached content, alert sent to admin, reads prioritized over logging writes." Three mitigations defined.
- [x] CHK046 Is the "new program added" edge case sufficient? [Edge Cases] — Yes: "admin creates in Firestore with all required fields; public page dynamically renders new card from collection — no HTML changes needed." Schema validation enforces required fields.
- [x] CHK047 Does the spec address what happens if IndexedDB is unavailable (private browsing, disabled)? [Gap, FR-005] — FR-005 says "IndexedDB or localStorage." The "or" provides a fallback path. Plan uses IndexedDB primarily, but the content service can degrade to in-memory cache for the session. Not a blocker — graceful degradation is implied by FR-006 (never a blank page).

## Non-Functional Requirements

- [x] CHK048 Are performance requirements defined with specific thresholds? [Completeness, SC-010/011] — Yes: Lighthouse >= 90 (SC-010), 2s on 3G (SC-011), 5s for admin updates (SC-009).
- [x] CHK049 Are security requirements defined beyond authentication? [Completeness, FR-012/013/014/015/023] — Yes: authorization (custom claims), schema validation on write, version-controlled rules, no secrets in client code, input sanitization.
- [x] CHK050 Is the accessibility requirement for the admin interface measurable? [Clarity, FR-022] — FR-022 references Constitution II which mandates: keyboard-navigable, ARIA attributes, color contrast. Constitution doesn't specify a WCAG level. Acceptable for v1 — Constitution II is the standard.
- [x] CHK051 Are data integrity requirements defined for the bilingual content constraint? [Completeness, FR-010/013/019] — Yes: FR-010 (admin blocks incomplete), FR-013 (security rules validate), FR-019 (single document). Three layers of enforcement.

## Dependencies & Assumptions

- [x] CHK052 Are external service dependencies explicitly identified? [Completeness] — Yes: Firebase Auth, Cloud Firestore, Firebase Hosting (optional). All managed services per Constitution I.
- [x] CHK053 Is the existing Playwright test suite dependency acknowledged? [Completeness, SC-003] — Yes: SC-003 says "existing Playwright bilingual test suites continue to pass at 100%." Plan includes Playwright in testing stack.
- [x] CHK054 Is the assumption of 1-3 admins explicit and its implications documented? [Assumption, Edge Cases] — Yes: explicitly stated in edge cases (admin creation), clarifications (rollback not needed), and throughout. If admin count grows significantly, admin management UI and rollback become needed.

## Clarifications

### Session 2026-03-22 (specify phase)

- Q: How are admin accounts created? -> A: CLI script with Admin SDK, documented in runbook. No UI. [CHK021, FR-008, US-4]
- Q: Is content rollback needed? -> A: No UI in v1. Audit log stores previous values for manual recovery. [CHK023, FR-011]
- Q: What is audit log retention? -> A: 90 days, via Firestore TTL. [CHK022, FR-011]

### Session 2026-03-22 (checklist phase — post-plan)

- CHK047 gap resolved: IndexedDB unavailability handled by "or localStorage" in FR-005 and graceful degradation in FR-006.
- CHK050 noted: WCAG level not specified; Constitution II is the governing standard. Acceptable for v1.

## Score: 54/54 — Ready for next phase
