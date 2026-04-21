# Spec Quality Checklist — 009-home-landing-sales (v7 re-specify)

**Generated**: 2026-04-14
**Extended**: 2026-04-21 (plan v5 + cross-artifact consistency)
**Constitution**: v7.0.0 (synchronized)
**Spec Version**: v7 (post-robustness consolidation)

---

## A. Content Quality (No Implementation Details in Spec Phase)

- [x] **CQ-01**: No framework/library installation commands in spec
- [x] **CQ-02**: No database schema definitions (data model is entity-level, not column-level)
- [x] **CQ-03**: No code snippets prescribing implementation logic
- [x] **CQ-04**: File references to existing repo assets are constraints, not prescriptions
- [x] **CQ-05**: Architecture section (§9) describes WHAT the system does, not HOW to build it
- [x] **CQ-06**: NFRs reference tools (Vitest, Playwright) as quality contracts, not implementation
- [x] **CQ-07**: Sequence diagrams describe behavioral flows, not code paths

## B. Requirement Completeness

- [x] **RC-01**: All User Stories have priorities (P1-P3) — 7 US total (US-1..US-7)
- [x] **RC-02**: All User Stories have independent testability statements
- [x] **RC-03**: All User Stories have ≥1 Given/When/Then acceptance scenario
- [x] **RC-04**: Total Functional Requirements: ~100+ (FR-001..FR-120, FR-200..FR-232)
- [x] **RC-05**: All FRs use MUST/SHOULD/MAY language consistently
- [x] **RC-06**: Non-Functional Requirements defined: NFR-001..NFR-013
- [x] **RC-07**: Success Criteria defined and measurable: SC-001..SC-019
- [x] **RC-08**: Edge cases documented (§2 Edge Cases: 10 scenarios)
- [x] **RC-09**: Constraints documented: C-001..C-006
- [x] **RC-10**: Assumptions documented: A-001..A-006
- [x] **RC-11**: Out of Scope explicitly declared (§7): 8 items
- [x] **RC-12**: Risks documented with mitigations: R-01..R-10
- [x] **RC-13**: Key Entities defined: 17 entities with attributes
- [x] **RC-14**: Clarification log maintained (§12): 6 sessions documented

## C. Constitutional Alignment (v7.0.0)

- [x] **CA-01**: §4.4 v7 Constitutional Alignment section present
- [x] **CA-02**: Firebase services declared per Constitution I (BaaS-First)
- [x] **CA-03**: Collections declared per Constitution XXIII (Feature-Bounded)
- [x] **CA-04**: Seed path documented per Constitution XXIII
- [x] **CA-05**: Offline UX documented per Constitution VIII (SWR)
- [x] **CA-06**: TDD mandatory per Constitution IX
- [x] **CA-07**: Design system tokens per Constitution X
- [x] **CA-08**: Brand voice audit per Constitution XI (FR-046)
- [x] **CA-09**: PII append-only per Constitution XXII (FR-017)
- [x] **CA-10**: Accessibility per Constitution II (FR-060..FR-065)
- [x] **CA-11**: SEO per Constitution III (meta tags, canonical, hreflang)

## D. Traceability (Backcasting Loop)

- [x] **TR-01**: FR → US matrix: 0 orphan FRs (all covered by US-1..US-7)
- [x] **TR-02**: US → SC matrix: all US have ≥1 SC
- [x] **TR-03**: SC → Constitution: all SC trace to ≥1 principle
- [x] **TR-04**: Backcasting doc exists: `backcasting.md` (Direction 1 + 2)
- [x] **TR-05**: Robustness pass exists: `robustness-v1.md` (§A-§H)
- [x] **TR-06**: Constitution amendment proposed (XXIV) — pending user approval

## E. Feature Readiness Assessment

- [x] **FR-01**: Branch created and active: `009-home-landing-sales`
- [x] **FR-02**: Spec file exists: `specs/009-home-landing-sales/spec.md`
- [x] **FR-03**: Supporting artifacts complete:
  - [x] `adaptive-blueprint.md` (17 KB)
  - [x] `backcasting.md` (17 KB)
  - [x] `robustness-v1.md` (33 KB)
  - [x] `sitemap.md` (31 KB)
  - [x] `plan.md` (20 KB)
  - [x] `data-model.md` (5 KB)
  - [x] `quickstart.md` (5 KB)
  - [x] `research.md` (6 KB)
- [x] **FR-04**: TDD discipline declared: NFR-007 (ATDD outer + TDD inner)
- [x] **FR-05**: Coverage contract declared: NFR-008 (85% weighted layered)
- [x] **FR-06**: Phase separation: PASS (file refs are domain constraints)
- [x] **FR-07**: Constitution version synced: v7.0.0 footer matches content

## F. Plan-Level Requirements Quality (v5)

- [x] **PL-01**: Are failure mode requirements specified for all write paths with distinct handling per error class? [Completeness, Plan §Data flow — Write path, R14] — Happy path + 4 error classes (network, auth, App Check, quota) with Optimistic Result + Deferred Sync
- [x] **PL-02**: Are retry strategies quantified with specific thresholds (max attempts, backoff schedule)? [Clarity, Plan R14] — Max 3 attempts, exponential backoff 1s → 4s → 16s
- [x] **PL-03**: Are shell page content requirements defined with measurable criteria (which slots, how many i18n keys)? [Completeness, Plan §Shell Contract, R15] — 3 required slots (hero, escape_routes, closing), 132 i18n keys quantified
- [x] **PL-04**: Is the deferred sync UX consistent with the existing offline pill requirements (FR-097..FR-099)? [Consistency, Plan R14, Spec FR-097..FR-099] — Sync pill reuses OfflinePill.js, same aria-live, same landmark
- [x] **PL-05**: Are all 15 research decisions (R1–R15) traceable to constitutional principles? [Traceability, Plan §Key design decisions] — Each row has constitutional anchor column
- [x] **PL-06**: Is the module dependency graph complete — do all import relationships match the file list in §Project Structure? [Consistency, Plan §Module Dependency Graph] — All 12 new modules present with leaf/mid/top classification
- [x] **PL-07**: Are rollback criteria quantified with specific thresholds and timeframes? [Clarity, Plan §Rollback Strategy] �� 4 signals with thresholds (>50% drop/48h, exception/4h, <70 Lighthouse/24h, brand mismatch/24h)
- [x] **PL-08**: Is the testing pyramid allocation consistent with the spec's NFR coverage requirements (NFR-007..NFR-013)? [Consistency, Plan §Testing Strategy, Spec NFR-007..NFR-013] — Unit/Integration/E2E/BDD with 85% weighted target matching NFR-008

## G. Cross-Artifact Consistency

- [x] **XA-01**: Does data-model.md state transition `captured → degraded` align with plan R14 (Optimistic Result + Deferred Sync)? [Conflict, data-model.md §State transitions vs Plan §Write path] — **FIXED**: Updated state transitions to include `pending_sync`, `sync_failed` states + immediate result display per R14
- [x] **XA-02**: Does AudienceState provenance cascade in data-model.md match adaptive-blueprint.md §3.1 precedence order? [Conflict, data-model.md §Provenance vs adaptive-blueprint.md §3.1] — **FIXED**: Aligned to 6-step cascade (URL param > localStorage > landing > diagnostic > UTM > default)
- [x] **XA-03**: Are the Firestore collections in data-model.md consistent with the collections in firestore-rules.md? [Consistency, data-model.md vs contracts/firestore-rules.md] — **FIXED**: Added `blocks/{blockId}` read rule (was missing; deny-all fallback would block reads referenced by pages/home)
- [x] **XA-04**: Does the plan's 13-page list match sitemap.md's canonical page list? [Consistency, Plan §Project Structure vs sitemap.md §2] — Identical 13 pages
- [x] **XA-05**: Are the diagnostic scoring thresholds in spec §4.5 consistent with the diagnostic-logic.json contract? [Consistency, Spec §4.5 vs contracts/diagnostic-logic.json] — Identical questions, weights, thresholds (0-4/5-9/10-15), recommendations
- [x] **XA-06**: Do the plan's Web Component names match the spec §9.4 component diagram? [Consistency, Plan §Web Components vs Spec §9.4] — Plan adds OfflinePill, ConsentBanner, ProgramCard (009-scope concretizations). Spec §9.4 includes 010-scope components (BlockRenderer). No conflict.

## H. Readiness Verdict

| Gate | Status | Notes |
|------|--------|-------|
| G0 — Spec exists | ✅ PASS | 1,151 lines, v7 consolidated |
| G1 — Constitution aligned | ✅ PASS | §4.4 + backcasting.md |
| G2 — Phase separation clean | ✅ PASS | Exemptions justified |
| G3 — Ready for next phase | ✅ PASS | All 54 items checked, 3 cross-artifact fixes applied |

**Overall**: ✅ **READY** — Proceed to `/iikit-04-testify`
