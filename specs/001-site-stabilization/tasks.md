# Tasks: Site Stabilization

**Input**: Design documents from `/specs/001-site-stabilization/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no deps)
- **[Story]**: User story mapping (US1-US4)
- Exact file paths included

## Phase 1: Foundational (CTA System Extension)

**Purpose**: Extend CTAHandler to support dynamic body
templates — prerequisite for cotizador CTA migration

- [x] T001 [US2] Add template interpolation support to js/CTAHandler.js — new buildMailto(ctaId, params) method that replaces {{variable}} placeholders in body text
- [x] T002 [US2] Add cotizador CTA entries to js/cta-data.json — "cotizador-propuesta" and "cotizador-empresas-propuesta" with template:true and body containing {{variable}} placeholders

**Checkpoint**: CTAHandler supports dynamic templates.
Static CTAs unaffected. New entries available.

---

## Phase 2: User Story 1 — Consistent Navigation (P1)

**Goal**: All public pages use SiteHeader and SiteFooter.
No inline nav/footer markup on non-template pages.

**Independent Test**: Open 10 pages across sections,
verify identical header/footer.

- [x] T003 [US1] Replace inline footer in recursos/biblioteca-prompts/biblioteca_para_estudio.html (lines ~4216-4308) with <site-footer base-path="../.."></site-footer>
- [x] T004 [P] [US1] Audit all HTML files for inline <nav> or <footer> tags outside of web component definitions — verify no other pages bypass shared components

**Checkpoint**: Navigation consistent across all public
pages. Icebreaker (noindex) intentionally excluded.

---

## Phase 3: User Story 2 — Reliable CTAs (P1)

**Goal**: Every CTA routes through CTAHandler. No inline
mailto constructions. No orphan entries.

**Independent Test**: Click every CTA, verify correct
mailto subject/body.

- [x] T005 [US2] Migrate cotizador.html mailto (line ~1147) — replace inline JS mailto construction with CTAHandler.buildMailto("cotizador-propuesta", {params}) call
- [x] T006 [US2] Migrate cotizador-empresas.html mailto (lines ~1555-1557) — replace inline JS mailto construction with CTAHandler.buildMailto("cotizador-empresas-propuesta", {params}), remove duplicate assignment at line 1557
- [x] T007 [US2] Wire cotizador-personas.html CTA — the #mailto-cta anchor has no JS to populate it; implement buildMailto call with simulation results
- [x] T008 [P] [US2] Add data-cta="legal-privacidad" attribute to mailto link in legal/privacidad.html (line ~428), remove plain href mailto
- [x] T009 [P] [US2] Resolve orphan CTA entries — add data-cta="beta-tester-gemini" to recursos/asistentes-gemini/index.html and data-cta="beta-tester-gpt" to recursos/asistentes-gpt/index.html, OR remove entries from cta-data.json if pages already have different CTAs

**Checkpoint**: All CTAs route through handler. Zero
orphan entries. Zero inline mailto constructions.

---

## Phase 4: User Story 3 — Trustworthy ROI Simulation (P2)

**Goal**: All 3 cotizadores complete full flow with
correct calculations and working CTAs.

**Independent Test**: Complete each cotizador flow,
verify calculations and mailto output.

- [x] T010 [US3] Verify cotizador.html calculation logic — test with known inputs (40h/week, $5000 income, 50/30/20 tasks, 2 programs), confirm ROI output matches expected formula
- [x] T011 [P] [US3] Verify cotizador-empresas.html calculation logic — test with known enterprise inputs, confirm business case metrics
- [x] T012 [P] [US3] Verify cotizador-personas.html calculation logic — test full flow end-to-end, confirm CTA now works after T007
- [x] T013 [US3] Test edge case: all sliders at 0 on each cotizador — verify graceful handling (no NaN, no division by zero, clear messaging)

**Checkpoint**: All 3 cotizadores produce correct ROI.
All CTAs functional. Edge cases handled.

---

## Phase 5: User Story 4 — Resources Experience (P2)

**Goal**: All 27+ resource pages use shared components
and have working CTAs.

**Independent Test**: Navigate every category from hub,
verify layout and CTAs.

- [x] T014 [P] [US4] Audit all 14 free resource category index pages — verify each uses <site-header> and <site-footer> with correct base-path
- [x] T015 [P] [US4] Audit all 13 premium resource category index pages — verify same patterns as free tier
- [x] T016 [US4] Verify all beta-tester CTAs on resource pages use data-cta attributes matching cta-data.json entries
- [x] T017 [US4] Test navigation from recursos/index.html to every category — verify no 404s or broken links

**Checkpoint**: Resource section fully consistent, all
CTAs working, no broken navigation.

---

## Phase 6: Polish & Cross-Cutting

**Purpose**: Final validation across the entire site.

- [x] T018 Run full CTA audit — grep all HTML files for data-cta attributes, cross-reference with cta-data.json, confirm zero orphans in either direction
- [x] T019 Run full navigation audit — verify SiteHeader menu items identical on 10+ sample pages across all sections
- [x] T020 Check browser console for JS errors on 5 representative pages (index, cotizador, recursos, legal, contacto)
- [x] T021 Validate quickstart.md test scenarios pass

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Foundational)**: No deps — start immediately
- **Phase 2 (Navigation)**: Independent of Phase 1
- **Phase 3 (CTAs)**: Depends on Phase 1 (T001, T002)
- **Phase 4 (ROI)**: Depends on Phase 3 (T005-T007)
- **Phase 5 (Resources)**: Depends on Phase 3 (T009)
- **Phase 6 (Polish)**: Depends on all prior phases

### Parallel Opportunities

- Phase 1 + Phase 2 can run in parallel
- T005, T006, T007 are sequential (same pattern, learn
  from each); T008, T009 are parallel with each other
- T010, T011, T012 can run in parallel
- T014, T015 can run in parallel

### Critical Path

T001 → T002 → T005 → T010 → T018 → T021

### MVP Scope

Phases 1-3 (T001-T009) deliver both P1 stories:
consistent navigation + reliable CTAs. This is the
minimum viable stabilization.

---

## Notes

- Total tasks: 21
- US1 (Navigation): 2 tasks
- US2 (CTAs): 5 tasks
- US3 (ROI): 4 tasks
- US4 (Resources): 4 tasks
- Foundational: 2 tasks
- Polish: 4 tasks
- Parallel batches: 6 opportunities
