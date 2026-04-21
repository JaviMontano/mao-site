# Spec Quality Checklist — 009-home-landing-sales (v8 sidebar architecture)

**Generated**: 2026-04-14
**Extended**: 2026-04-21 (v8: sidebar + triple toggle + admin editor + 28 new items)
**Constitution**: v7.0.0
**Spec Version**: v8 (sidebar architecture + admin content editor)
**Testify Phase**: 92 TS scenarios + pending v8 regeneration

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
- [x] **RC-07**: Success Criteria defined and measurable: SC-001..SC-022 (22 total)
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

## H. Readiness Verdict (original — superseded by §M)

*Retained for audit trail. See §M for current verdict.*

## I. Testify Traceability (Backcasting-Informed)

*Added 2026-04-21 post-testify + Socratic debate. Verifies the backcasting loop FR→TS→SC is closed.*

- [x] **BT-01**: Every in-scope FR (FR-001..FR-099b, FR-200) has ≥1 TS scenario? [Completeness, Backcasting Direction 1] — 50/52 FRs covered; FR-006..FR-009 are non-existent gap numbers (spec jumps FR-005 → FR-010), not actual gaps
- [x] **BT-02**: Every automatable SC (SC-005..SC-007, SC-010..SC-022) has ≥1 @SC-xxx tag in .feature files? [Traceability, Backcasting §4] — 16/16 automatable SCs have TS coverage
- [x] **BT-03**: Post-launch SCs (SC-001, SC-002, SC-008, SC-009) are explicitly deferred to GA4 baseline capture (T-000 in plan)? [Clarity, Spec §5.1] — All 4 reference `[baseline: T-000 GA4 capture]`; SC-008 requires moderated usability test
- [x] **BT-04**: Meta/CI SCs (SC-018 coverage floor, SC-019 backcasting loop) have enforcement mechanisms outside .feature files? [Completeness, NFR-008, Backcasting §4] — SC-018 enforced by CI merge gate; SC-019 verified by this checklist + backcasting.md convergence test
- [x] **BT-05**: Zero orphan TS scenarios (every @FR-xxx and @SC-xxx tag maps to a real spec ID)? [Consistency, Testify phase] — 92/92 scenarios verified, 0 orphans
- [x] **BT-06**: Assertion integrity hash is locked in context.json + git note? [Integrity, NFR-007 TDD] — Hash `16a9e91...` stored in both locations
- [x] **BT-07**: FR-046 (brand voice audit) acknowledged as manual-only (no automation possible) with mitigation via PR checklist? [Gap, Backcasting §3.1 Gap B] — Manual audit item in PR review template; not a .feature scenario
- [x] **BT-08**: FR-099b (offline pill coexists with toggles) has TS coverage? [Completeness, Backcasting §3.1 Gap A] — Covered by TS-051

## J. Two-Tier Consent Domain (Socratic Debate Gap A)

*Added 2026-04-21 — verifies the orthogonality of Analytics consent and PII consent is fully specified.*

- [x] **TC-01**: Are the two consent tiers (Analytics banner + PII checkbox) specified as independent mechanisms? [Clarity, FR-072, FR-012, Spec v5 clarification] — v5 clarification (line 1110): "reject blocks ONLY Analytics events; PII consent is independent"
- [x] **TC-02**: Is the consent rejection path tested for all event types (home_view, CTA clicks, diagnostic events)? [Scenario Coverage, FR-072] — TS-084 (home_view), TS-086 (CTA clicks), TS-085 (diagnostic_completed)
- [x] **TC-03**: Is the positive path (reject analytics + accept PII → lead persists) explicitly tested? [Edge Case, FR-072 + FR-012] — TS-085 verifies lead+diagnostic persist to Firestore when analytics rejected
- [x] **TC-04**: Is the degraded path (reject analytics + Firestore unavailable → mailto fallback) tested? [Edge Case, FR-015 + FR-072] — TS-087 covers this combination
- [x] **TC-05**: Does the spec clarify that consent rejection MUST NOT block any functional flow (diagnostic, resources, programs)? [Clarity, FR-072] — v5 clarification explicit: "el home renderiza normalmente; el diagnóstico funciona end-to-end"

## K. Diagnostic Stepper Domain (Socratic Debate Gap B)

*Added 2026-04-21 — verifies back-navigation, score recalculation, and step 6 validation are fully specified.*

- [x] **DS-01**: Is back-navigation behavior specified (in-app back preserves answers in localStorage)? [Completeness, FR-011, FR-014] — TS-088 tests back-nav preservation; spec §4.5 "orden fijo" + FR-014 localStorage with 24h TTL
- [x] **DS-02**: Is score recalculation on answer change specified? [Completeness, FR-012, Spec §4.5] — TS-089 tests weight delta + nivel change; §4.5 "suma de weights de pasos 1..5 → rango 0..15" is pure function
- [x] **DS-03**: Is step 6 name validation (2-80 chars) specified and tested? [Completeness, Spec §1.5, FR-012] — TS-090 tests 1-char name rejection; spec §1.5 "Nombre obligatorio, 2–80 chars"
- [x] **DS-04**: Is step 6 consent checkbox required and tested? [Completeness, FR-012] — TS-091 tests unchecked checkbox rejection; FR-012 "checkbox obligatorio con link a política"
- [x] **DS-05**: Is PII memory-only behavior (never localStorage) specified and tested? [Security, NFR-006] — TS-092 tests PII preserved in memory on back-nav; NFR-006 "email nunca en logs de cliente"
- [x] **DS-06**: Are all 6 diagnostic scoring boundaries tested (0, 4, 5, 9, 10, 15)? [Data Variety, Spec §4.5] — TS-011 Scenario Outline covers all 6 boundary values

## L. Adaptive Blueprint Domain (Socratic Debate Gap C+D)

*Added 2026-04-21 — verifies 52-combination matrix and CSS measurement precision.*

- [x] **AB-01**: Is the TS-050 parametric matrix assertion precise (regex for keys, scrollWidth for overflow, textContent for slots)? [Clarity, SC-014, SC-015] — Tightened in Socratic debate: 3 concrete invariants replace vague "layout correct"
- [x] **AB-02**: Is the CSS measurement approach specified (getComputedStyle on documentElement, hex canonical, px canonical)? [Clarity, FR-040..FR-045] — TS-027, TS-028, TS-031 tightened with measurement method
- [x] **AB-03**: Does TS-032 use measurable timing (<100ms via performance.now()) instead of subjective "without flash"? [Clarity, SC-013] — Rewritten in Socratic debate with performance.now() assertion
- [x] **AB-04**: Is the toggle UI pattern specified as role="radiogroup" per FR-201? [Completeness, adaptive-blueprint.md FR-201] — FR-201: `role="radiogroup"` with two `role="radio"` (or `<button aria-pressed>` pair)
- [x] **AB-05**: Does the xs/sm collapse pattern ("Preferencias" button with aria-expanded) have a TS? [Completeness, FR-200] — TS-045 covers collapse to button with aria-expanded
- [x] **AB-06**: Is theme orthogonality (CSS-only, never content) tested? [Consistency, Backcasting XXIV invariant 1] — TS-049 verifies hero/proof/CTA content does NOT change on theme toggle

## N. Sidebar Architecture (v8 — FR-240..FR-244)

- [x] **SA-01**: Is the sidebar section count specified as exactly 7 per page? [Completeness, FR-241] — FR-241: "exactamente 7 `<section id>`"
- [x] **SA-02**: Are all 12 pages' 7-section definitions documented? [Completeness, FR-244] — Plan v7 clarification: 84 entries in sections-config.js table
- [x] **SA-03**: Is the scroll-spy algorithm specified (IntersectionObserver rootMargin, threshold)? [Clarity, FR-243] — FR-243: rootMargin '-40% 0px -50% 0px', threshold 0
- [x] **SA-04**: Is the sidebar breakpoint for show/hide specified? [Clarity, FR-240] — FR-240: ≥960px visible, <960px off-canvas drawer
- [x] **SA-05**: Is the sidebar width specified as a design token? [Clarity, FR-240] — Plan v7: --sidebar-w: 260px in variables.css
- [x] **SA-06**: Is the 404 page explicitly excluded from sidebar? [Consistency, FR-240] — FR-240: "12 páginas (excl. 404)"
- [x] **SA-07**: Are sidebar section labels i18n-ized in both locales? [Completeness, FR-244] — FR-244: "{pageSlug}.sections.{sectionId} × 2 locales = 168 keys"
- [x] **SA-08**: Is the mobile sidebar dismiss behavior specified (Escape, backdrop click, link click)? [Completeness, FR-240] — FR-240: "off-canvas drawer con hamburger toggle, backdrop, Escape para cerrar"

## O. Triple Toggle (v8 — FR-245..FR-249)

- [x] **TT-01**: Is the triple toggle position specified as fixed bottom-left? [Clarity, FR-245] — FR-245: "position: fixed; bottom: 1rem; left: 1rem; z-index: 45"
- [x] **TT-02**: Is the toggle visible with sidebar closed on mobile? [Completeness, FR-245] — FR-245: "SIEMPRE visible independientemente del estado del sidebar"
- [x] **TT-03**: Is each toggle specified as role="switch" (not radiogroup)? [Clarity, FR-246] — FR-246: "3 botones role='switch' con aria-checked"
- [x] **TT-04**: Is the <100ms transition requirement measurable? [Clarity, FR-247] — FR-247: "completar la transición DOM en <100ms sin recarga"
- [x] **TT-05**: Is theme orthogonality preserved (CSS-only, no content change)? [Consistency, FR-247] — FR-247: "El cambio de tema es CSS-only"
- [x] **TT-06**: Is the touch target requirement specified for mobile? [Completeness, FR-248] — FR-248: "touch target ≥44×44px y spacing ≥8px"
- [x] **TT-07**: Is keyboard navigation specified for toggles? [Completeness, FR-249] — FR-249: "Tab entre switches, Space/Enter para flip"
- [x] **TT-08**: Is aria-live announcement specified? [Completeness, FR-249] — FR-249: "aria-live='polite' con texto descriptivo"
- [x] **TT-09**: Does the triple toggle NOT overlap scrollable body content? [Clarity, FR-248] — FR-248: "no MUST solapar con el body content scrolleable"

## P. Admin Content Editor (v8 — FR-250..FR-253, US-8)

- [x] **AE-01**: Is the admin auth requirement specified? [Completeness, FR-250] — FR-250: "Firebase Auth login (Google Sign-In + custom claim admin)"
- [x] **AE-02**: Is the 4-variant schema specified (2 locale × 2 audience)? [Clarity, FR-251] — FR-251: "persona.es, persona.en, empresa.es, empresa.en"
- [x] **AE-03**: Is the Firestore collection name specified? [Clarity, FR-251] — FR-251: "slots/{pageSlug}"
- [x] **AE-04**: Is the public read + admin write security rule specified? [Completeness, FR-253] — FR-253: "write solo a usuarios con custom claim admin: true"
- [x] **AE-05**: Is the fallback to static JSON specified? [Completeness, FR-252] — FR-252: "Fallback: static i18n JSON dictionaries cuando Firestore no disponible"
- [x] **AE-06**: Is US-8 independent testability declared? [Completeness, US-8] — US-8: "Admin login → seleccionar home → editar → guardar → verificar en sitio público"
- [x] **AE-07**: Does the scope boundary clarify what's IN 009 vs deferred to 010? [Clarity, Plan v7] — Plan v7: "Solo content editing (slots). Backoffice completo diferido a 010."

## Q. Header Simplification (v8 — FR-242)

- [x] **HS-01**: Are the 3 nav items specified by name and destination? [Clarity, FR-242] — FR-242: "Ruta → /diagnostico/, Servicios → /programas/, Contacto → /contacto/"
- [x] **HS-02**: Is the header explicitly free of toggles? [Consistency, FR-242] — FR-242: "NO contiene toggles"
- [x] **HS-03**: Is the hamburger behavior on mobile specified? [Completeness, FR-242] — FR-242: "En mobile (<960px) incluye hamburger para abrir sidebar"
- [x] **HS-04**: Is the focus order updated for the new architecture? [Consistency, FR-062] — FR-062v8: "skip-link → header nav → sidebar → main → triple toggle → footer"

## M. Updated Readiness Verdict

| Gate | Status | Notes |
|------|--------|-------|
| G0 — Spec exists | ✅ PASS | v8, ~1,250 lines |
| G1 — Constitution aligned | ✅ PASS | §4.4 + backcasting.md |
| G1.5 — Checklist reviewed | ✅ PASS | 112 items, 112/112 checked, 0 deferred |
| G2 — Phase separation clean | ✅ PASS | Exemptions justified |
| G2.5 — Testify complete | ⚠️ PENDING | 92 TS from v7; v8 requires regeneration for FR-240..FR-253, US-8 |
| G3 — Ready for next phase | ⚠️ PENDING | Testify regeneration needed |
