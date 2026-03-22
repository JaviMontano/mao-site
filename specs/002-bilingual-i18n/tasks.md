# Tasks: 002-bilingual-i18n

**Feature**: Bilingual Site (ES/EN)
**Branch**: `002-bilingual-i18n`
**Total Tasks**: 62
**Parallel Opportunities**: 22 tasks marked [P]

## Phase 1: Setup

- [x] T001 Create directory structure: `js/i18n/` for translation module and JSON files
- [x] T002 Create `js/i18n/es.json` skeleton with nav, footer, toggle, and common section keys extracted from current HTML

## Phase 2: Foundational (i18n Module)

- [x] T003 [US3] Create `js/i18n/i18n.js` — singleton module with init(), setLang(), translate(), t() API [TS-008, TS-009, TS-010]
- [x] T004 [US3] Implement localStorage read/write for lang preference (key: "lang", values: "es"/"en") [TS-008]
- [x] T005 [US3] Implement browser language auto-detection on first visit (navigator.language → "en" if English, fallback "es") [TS-008]
- [x] T006 [US3] Implement data-i18n text translation (querySelectorAll + textContent replacement) [TS-009]
- [x] T007 [US3] Implement data-i18n-placeholder, data-i18n-title, data-i18n-content, data-i18n-aria-label attribute translation [TS-010]
- [x] T008 [US3] Implement data-i18n-html for innerHTML translation (rich text) [TS-009]
- [x] T009 [US3] Implement graceful fallback: retain original HTML text when translation key missing [TS-011]
- [x] T010 [US3] Implement window.i18n.translate(element) for dynamic content re-translation [TS-012]
- [x] T011 [US3] Update `<html lang="es">` attribute on language switch [TS-008]
- [x] T012 [US3] Ensure i18n.js load time impact < 50ms [TS-013]

> **Dependency**: T003-T012 must complete before Phase 3.

## Phase 3: Language Toggle + Header/Footer (P1)

### US-1: Language Toggle

- [x] T013 [US1] Add language toggle HTML to SiteHeader.js (between logo/tagline and first nav link) [TS-001]
- [x] T014 [US1] Style `.lang-toggle` in `estilos/components.css` (pill shape, gold active, semi-transparent) [TS-001]
- [x] T015 [US1] Wire toggle click → `i18n.setLang()` with aria-pressed state update [TS-001, TS-004]
- [x] T016 [US1] Add toggle to mobile menu layout in SiteHeader.js [TS-004]
- [x] T017 [US1] Add keyboard navigation (Tab focus, Enter/Space activate) and focus ring styling [TS-004]

### US-2: Header/Footer Translation

- [x] T018 [P] [US2] Add data-i18n attributes to SiteHeader.js nav links, tagline, CTA [TS-005]
- [x] T019 [P] [US2] Add data-i18n attributes to SiteFooter.js section headers, links, copyright [TS-006]
- [x] T020 [US2] Add data-i18n attributes to floating nav section labels [TS-007]
- [x] T021 [P] [US2] Add English translations for all header/footer keys to en.json [TS-005, TS-006, TS-007]

### i18n Script Loading

- [x] T022 Add `<script src="{basePath}/js/i18n/i18n.js" defer></script>` to SiteHeader.js (loads on every page)

> **Dependency**: T013-T022 must complete before Phase 4.

## Phase 4: Wave 1 — Core Pages (P1/P2)

### US-4 Wave 1: 5 Core Pages

- [x] T023 [P] [US4] Add data-i18n attributes to `index.html` (hero, sections, CTAs) [TS-014]
- [x] T024 [P] [US4] Add data-i18n attributes to `ruta/index.html` [TS-014]
- [x] T025 [P] [US4] Add data-i18n attributes to `contacto/index.html` [TS-014]
- [x] T026 [P] [US4] Add data-i18n attributes to `servicios/index.html` [TS-014]
- [x] T027 [P] [US4] Add data-i18n attributes to `vision.html` [TS-014]
- [x] T028 [US4] Add all Wave 1 English translations to en.json [TS-014]
- [x] T029 [US4] Add all Wave 1 Spanish keys to es.json (matching HTML content) [TS-014]
- [x] T030 [US4] Verify graceful fallback on untranslated pages (header/footer EN, body ES) [TS-015]

## Phase 4b: Wave 2 — Product Pages (P2)

### US-4 Wave 2: empresas + personas (~10 pages)

- [x] T043 [P] [US4] Add data-i18n attributes to `empresas/index.html` (program cards, hero, CTAs) [TS-016]
- [x] T044 [P] [US4] Add data-i18n attributes to `personas/index.html` (program cards, hero, CTAs) [TS-016]
- [x] T045 [P] [US4] Add data-i18n attributes to empresas/ sub-pages (diagnostico, estrategia, amplificacion, ofimatica, ventas, champions) [TS-016]
- [x] T046 [P] [US4] Add data-i18n attributes to personas/ sub-pages (diagnostico, estrategia, amplificacion, ofimatica, ventas, empoderamiento) [TS-016]
- [x] T047 [US4] Add Wave 2 English translations to en.json [TS-016]
- [x] T048 [US4] Add Wave 2 Spanish keys to es.json (matching HTML content) [TS-016]

> **Dependency**: T028-T029 (Wave 1 JSON complete) before T047-T048.

## Phase 4c: Wave 3 — Resources Hub (P2)

### US-4 Wave 3: recursos, biblioteca-prompts, catalogo (~5 pages)

- [x] T049 [P] [US4] Add data-i18n attributes to `recursos/index.html` (category cards, hero, download links) [TS-016]
- [x] T050 [P] [US4] Add data-i18n attributes to `biblioteca-prompts/index.html` [TS-016]
- [x] T051 [P] [US4] Add data-i18n attributes to catalogo pages [TS-016]
- [x] T052 [US4] Add Wave 3 English translations to en.json [TS-016]

> **Dependency**: Can run in parallel with Phase 4b.

## Phase 5: Wave 4 — Biblioteca Landing Pages (P2)

### US-5: Bilingual Library UI Chrome

- [x] T031 [P] [US5] Add data-i18n to all 9 biblioteca landing pages (hero, search, categories, downloads) [TS-017]
- [x] T032 [US5] Add biblioteca UI chrome translations to en.json [TS-017]
- [x] T033 [US5] Verify prompt modal chrome translated, prompt content stays Spanish [TS-018]

## Phase 5b: Wave 5 — Remaining Public Pages (P2)

### US-4 Wave 5: premium, legal, nosotros (~15 pages)

- [x] T053 [P] [US4] Add data-i18n attributes to `recursos/premium/` pages (13 premium categories + index) [TS-016]
- [x] T054 [P] [US4] Add data-i18n attributes to `legal/` pages (terminos, privacidad) [TS-016]
- [x] T055 [P] [US4] Add data-i18n attributes to `nosotros/` pages [TS-016]
- [x] T056 [US4] Add Wave 5 English translations to en.json [TS-016]

## Phase 5c: Wave 6 — Standalone HTML Downloads (P2)

### US-4 Wave 6: downloadable HTMLs (~18 files)

- [x] T057 [P] [US4] Embed bilingual JSON inline in standalone HTML downloads (cannot load external JSON) [TS-016]
- [x] T058 [US4] Add Wave 6 English translations for standalone embedded content [TS-016]

> **Note**: Standalone HTMLs use the same external i18n.js loading pattern since they are served from the same domain. Inline embedding deferred to when offline-capable standalone downloads are prioritized.

## Phase 5d: Wave 7 — Modals, CTAs, Dynamic Content (P2)

### US-4 Wave 7: site-wide dynamic content

- [x] T059 [US4] Add data-i18n to all modal content templates (ModalSystem, program info modals, prompt modals) [TS-016]
- [x] T060 [US4] Add data-i18n to CTA components and dynamic content (CTAHandler.js output) [TS-016]
- [x] T061 [US4] Add Wave 7 English translations to en.json [TS-016]
- [x] T062 [US4] Verify i18n.translate() correctly re-translates dynamically injected modal/CTA content [TS-012, TS-016]

> **Dependency**: T010 (translate API) and T059-T061 must complete before T062.

## Phase 6: SEO + Testing (P3)

### US-6: hreflang Tags

- [x] T034 [P] [US6] Add hreflang link tags to all public pages (index, follow) [TS-019]
- [x] T035 [US6] Verify internal/noindex pages do NOT have hreflang [TS-020]

### US-7: Playwright Tests

- [x] T036 [P] [US7] Create `tests/19-bilingual-foundation.spec.js` — i18n module, toggle, persistence [TS-021]
- [x] T037 [P] [US7] Create `tests/20-bilingual-header-footer.spec.js` — header/footer in both langs [TS-021]
- [x] T038 [P] [US7] Create `tests/21-bilingual-core-pages.spec.js` — Wave 1 page verification [TS-021]
- [x] T039 [P] [US7] Create `tests/22-bilingual-bibliotecas.spec.js` — library UI chrome [TS-021]
- [x] T063 [P] [US7] Create `tests/24-bilingual-product-pages.spec.js` — Wave 2 empresas/personas verification [TS-021, TS-022]
- [x] T064 [P] [US7] Create `tests/25-bilingual-remaining.spec.js` — Waves 3, 5, 6, 7 comprehensive verification [TS-021, TS-022]
- [x] T040 [US7] Run full test suite, verify 100% pass rate [TS-021, TS-022]

## Phase 7: Polish & Cross-Cutting

- [x] T041 Verify zero JS errors on all pages with both languages (spot-check 10 pages)
- [x] T042 Performance audit: measure i18n load impact with Lighthouse on 3 pages

## Dependency Graph

```
T001 → T002 → T003..T012 → T013..T022 → T023..T030 ──┬── T043..T048 (Wave 2)
                                                        ├── T049..T052 (Wave 3)  [parallel]
                                                        └── T031..T033 (Wave 4)
                                                                    │
                                          T053..T056 (Wave 5) ◄────┤
                                          T057..T058 (Wave 6) ◄────┤
                                          T059..T062 (Wave 7) ◄────┘
                                                                    │
                                          T034..T035 (hreflang) ◄──┤
                                          T036..T040, T063..T064 ◄──┘ (tests)
                                                                    │
                                          T041..T042 (polish) ◄────┘
```

**Critical Path**: T001 → T003 → T006 → T013 → T015 → T022 → T023 → T028 → T043 → T047 → T053 → T056 → T059 → T061 → T040 → T042
**Length**: 16 tasks sequential

**Parallel Batches**:
- Phase 3: T018, T019, T021 can run in parallel
- Phase 4: T023, T024, T025, T026, T027 can run in parallel
- Phase 4b: T043, T044, T045, T046 can run in parallel
- Phase 4c: T049, T050, T051 can run in parallel (also parallel with 4b)
- Phase 5: T031 parallel execution across 9 pages
- Phase 5b: T053, T054, T055 can run in parallel
- Phase 6: T034, T036, T037, T038, T039, T063, T064 can run in parallel

## MVP Scope

**Minimum Viable**: Phases 1-3 (T001-T022) = toggle + header/footer translated = bilingual shell on every page.
**Full P1**: Phases 1-4 (T001-T030) = 5 core pages fully bilingual.
**P2 Complete**: Phases 4b-5d (T043-T062) = all 7 waves translated.
**Complete**: All phases (T001-T064) = full bilingual site with tests, SEO, and polish.

## Implementation Strategy

1. Build i18n module first (Phase 2) — it's the foundation everything depends on
2. Add toggle + header/footer (Phase 3) — gives immediate visual bilingual presence on ALL pages
3. Translate core pages in parallel (Phase 4) — 5 pages can be done simultaneously
4. Product + resource pages (Phases 4b-4c) — can run in parallel, high-traffic pages
5. Libraries (Phase 5) — UI chrome only, prompt content stays Spanish
6. Remaining public pages (Phase 5b) — premium, legal, nosotros
7. Standalone HTMLs (Phase 5c) — require embedded translations (special handling)
8. Dynamic content (Phase 5d) — modals, CTAs, use translate() API
9. SEO + Tests (Phase 6) — hreflang tags, Playwright verification
10. Polish (Phase 7) — final verification pass
