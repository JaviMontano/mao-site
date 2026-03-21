# Quickstart: Site Stabilization Test Scenarios

## Pre-requisites

- Modern browser (Chrome/Firefox/Safari/Edge)
- Local file server or `python -m http.server` from root
- Browser DevTools console open for JS errors

## Test Scenario 1: Navigation Consistency

1. Open index.html — verify SiteHeader shows: Ruta,
   Recursos, Servicios, Contacto, Campus, CTA
2. Open recursos/index.html — verify identical header
3. Open ruta/cotizador.html — verify identical header
4. Open legal/privacidad.html — verify identical header
5. Repeat for footer: verify Servicios, Recursos, Legal
   columns identical on all 4 pages
6. Open biblioteca_para_estudio.html — verify SiteFooter
   (not inline footer) renders correctly

**Pass criteria**: All pages show identical header menu
items and footer structure. No inline nav/footer markup.

## Test Scenario 2: CTA System Integrity

1. Open DevTools Network tab, filter for cta-data.json
2. Navigate to any page — verify cta-data.json loads
3. Click any `[data-cta]` button — verify mailto opens
   with correct subject line
4. On legal/privacidad.html — click contact email,
   verify it uses data-cta="legal-privacidad"
5. Open cta-data.json directly — count entries. Search
   HTML files for each entry ID. Verify 0 orphans.

**Pass criteria**: Every CTA routes through CTAHandler.
No inline mailto: constructions outside the handler. No
orphan entries in cta-data.json.

## Test Scenario 3: Cotizador Flows

### 3a: cotizador.html (Personal)
1. Step 1: Set hours/week to 40, study hours to 10
2. Step 2: Set tasks to 50/30/20 (must total 100%)
3. Step 3: Set income to $5,000
4. Step 4: Select 2 programs
5. Step 5: Verify ROI summary, click CTA — verify
   mailto opens with simulation data in body

### 3b: cotizador-empresas.html (Enterprise)
1. Fill company name, role, headcount, payroll
2. Select enterprise programs
3. Verify summary — click CTA — verify mailto opens
   with correct enterprise data
4. Verify NO duplicate mailto assignment in console

### 3c: cotizador-personas.html (Personal v2)
1. Complete all steps
2. Click CTA button — verify it WORKS (not dead link)
3. Verify mailto contains simulation results

**Pass criteria**: All 3 cotizadores complete full flow.
All CTAs produce valid mailto with simulation data. No
console errors.

## Test Scenario 4: Resource Pages

1. From recursos/index.html, click each of the 14 free
   category cards — verify all land on working pages
2. From recursos/premium/index.html, click each of the
   13 premium category cards — verify all work
3. On each category page, verify:
   - SiteHeader present with correct menu
   - SiteFooter present with correct links
   - Beta-tester CTA uses data-cta attribute
4. Verify no broken links (DevTools console, no 404s)

**Pass criteria**: All 27 category pages load correctly,
use shared components, and have working CTAs.
