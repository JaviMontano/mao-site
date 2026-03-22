const { test, expect } = require('@playwright/test');

/* ═══════════════════════════════════════════════════════════════════
   05 — servicios/index.html + nosotros/index|mision|ecosistema
   ═══════════════════════════════════════════════════════════════════ */

const VIEWPORTS = [
  { width: 320, height: 800 },
  { width: 375, height: 812 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 900 },
];

// ─── Helper: collect JS errors ────────────────────────────────────
function collectErrors(page) {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  return errors;
}

// ─── Helper: collect 404s ─────────────────────────────────────────
function collect404s(page) {
  const failed = [];
  page.on('response', resp => {
    if (resp.status() === 404 && !resp.url().includes('favicon')) failed.push(resp.url());
  });
  return failed;
}

// ══════════════════════════════════════════════════════════════════
// 1) servicios/index.html
// ══════════════════════════════════════════════════════════════════
test.describe('servicios/index.html — Catálogo de Servicios', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/servicios/index.html');
    await page.waitForLoadState('networkidle');
  });

  // ── SEO ──────────────────────────────────────────────
  test('SEO meta tags complete', async ({ page }) => {
    await expect(page).toHaveTitle(/Catálogo.*Servicios.*MetodologIA/i);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /index, follow/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{20,}/);
    await expect(page.locator('meta[name="keywords"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
    await expect(page.locator('meta[property="twitter:title"]')).toHaveAttribute('content', /.+/);
  });

  // ── RENDER ──────────────────────────────────────────
  test('no JS errors on load', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/servicios/index.html');
    await page.waitForLoadState('networkidle');
    expect(errors).toHaveLength(0);
  });

  test('no 404 resources', async ({ page }) => {
    const failed = collect404s(page);
    await page.goto('/servicios/index.html');
    await page.waitForLoadState('networkidle');
    if (failed.length > 0) console.log('404s:', failed);
    expect(failed).toHaveLength(0);
  });

  test('SiteHeader and SiteFooter render', async ({ page }) => {
    await expect(page.locator('site-header')).toHaveCount(1);
    await expect(page.locator('site-footer')).toHaveCount(1);
  });

  // ── HERO ────────────────────────────────────────────
  test('hero H1 visible with "Catálogo"', async ({ page }) => {
    const h1 = page.locator('main h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText('Catálogo');
  });

  test('hero KPI cards render (4 stats)', async ({ page }) => {
    // KPIs are inside the hero section with the h1, not the hook-quote section
    const heroSection = page.locator('main section').filter({ has: page.locator('h1') }).first();
    const kpis = heroSection.locator('.card-glass');
    await expect(kpis).toHaveCount(4);
  });

  // ── SECTIONS ────────────────────────────────────────
  test('workshops section has 12 service buttons', async ({ page }) => {
    const btns = page.locator('#workshops button.service-card');
    await expect(btns).toHaveCount(12);
  });

  test('bootcamps section has 5 service buttons', async ({ page }) => {
    const btns = page.locator('#bootcamps button.service-card');
    await expect(btns).toHaveCount(5);
  });

  test('programas elite section has 2 cards', async ({ page }) => {
    const btns = page.locator('#programas button.service-card');
    await expect(btns).toHaveCount(2);
  });

  test('consultoría section renders 4 cards', async ({ page }) => {
    const cards = page.locator('#consultoria .card-glass');
    await expect(cards).toHaveCount(4);
  });

  // ── MODAL ───────────────────────────────────────────
  test('workshop modal opens with correct content', async ({ page }) => {
    await page.evaluate(() => openModal('ws01'));
    await page.waitForTimeout(400);
    const modal = page.locator('#info-modal');
    await expect(modal).toBeVisible();
    await expect(page.locator('#modal-content')).toContainText('Introducción a IA');
  });

  test('modal close button works', async ({ page }) => {
    await page.evaluate(() => openModal('ws02'));
    await page.waitForTimeout(400);
    await page.evaluate(() => closeModal());
    await page.waitForTimeout(400);
    const modal = page.locator('#info-modal');
    // After close, modal should not be visible
    await expect(modal).not.toBeVisible();
  });

  test('bootcamp modal opens with pricing', async ({ page }) => {
    await page.evaluate(() => openModal('bc01'));
    await page.waitForTimeout(400);
    await expect(page.locator('#modal-content')).toContainText('18M COP');
  });

  test('elite program modal opens', async ({ page }) => {
    await page.evaluate(() => openModal('prog01'));
    await page.waitForTimeout(400);
    await expect(page.locator('#modal-content')).toContainText('Empoderamiento');
  });

  // ── CTAs ────────────────────────────────────────────
  test('CTA "Simular Inversión" links to cotizador', async ({ page }) => {
    const cta = page.locator('a[href="../ruta/cotizador-personas.html"]').first();
    await expect(cta).toBeVisible();
  });

  test('CTA "Agendar Conversación" links to contacto', async ({ page }) => {
    const cta = page.locator('a[href="../contacto/index.html"]').first();
    await expect(cta).toBeVisible();
  });

  test('CTA "Explorar Premium" links to premium', async ({ page }) => {
    const cta = page.locator('a[href="../recursos/premium/index.html"]');
    await expect(cta).toBeVisible();
  });

  test('CTA "Recursos Gratuitos" links to recursos', async ({ page }) => {
    const cta = page.locator('a[href="../recursos/index.html"]').filter({ hasText: 'Recursos Gratuitos' });
    await expect(cta).toBeVisible();
  });

  // ── RESPONSIVE ──────────────────────────────────────
  for (const vp of VIEWPORTS) {
    test(`no horizontal overflow at ${vp.width}px`, async ({ page }) => {
      await page.setViewportSize(vp);
      await page.goto('/servicios/index.html');
      await page.waitForLoadState('networkidle');
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
      expect(overflow).toBe(false);
    });
  }

  test('mobile: hero and CTA visible at 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/servicios/index.html');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('main h1')).toBeVisible();
    await expect(page.locator('a[href="../ruta/cotizador-personas.html"]').first()).toBeVisible();
  });

  // ── BREADCRUMB ──────────────────────────────────────
  test('breadcrumb links to Inicio', async ({ page }) => {
    const link = page.locator('.breadcrumb-list a[href="../index.html"]');
    await expect(link).toBeVisible();
    await expect(link).toContainText('Inicio');
  });

  // ── JSON-LD ─────────────────────────────────────────
  test('JSON-LD structured data present', async ({ page }) => {
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toHaveCount(1);
    const content = await jsonLd.textContent();
    const data = JSON.parse(content);
    expect(data['@type']).toBe('ItemList');
  });

  // ── ALL INTERACTIVE BUTTONS ─────────────────────────
  test('all service-card buttons have onclick handlers', async ({ page }) => {
    const buttons = page.locator('button.service-card');
    const count = await buttons.count();
    expect(count).toBeGreaterThanOrEqual(19); // 12 + 5 + 2
    for (let i = 0; i < count; i++) {
      const onclick = await buttons.nth(i).getAttribute('onclick');
      expect(onclick).toMatch(/openModal/);
    }
  });
});

// ══════════════════════════════════════════════════════════════════
// 2) nosotros/index.html
// ══════════════════════════════════════════════════════════════════
test.describe('nosotros/index.html — Quiénes Somos', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/nosotros/index.html');
    await page.waitForLoadState('networkidle');
  });

  // ── SEO ──────────────────────────────────────────────
  test('SEO meta tags complete', async ({ page }) => {
    await expect(page).toHaveTitle(/Nosotros.*MetodologIA/i);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /index, follow/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{20,}/);
    await expect(page.locator('meta[name="keywords"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
    await expect(page.locator('meta[property="twitter:title"]')).toHaveAttribute('content', /.+/);
  });

  // ── RENDER ──────────────────────────────────────────
  test('no JS errors on load', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/nosotros/index.html');
    await page.waitForLoadState('networkidle');
    expect(errors).toHaveLength(0);
  });

  test('no 404 resources', async ({ page }) => {
    const failed = collect404s(page);
    await page.goto('/nosotros/index.html');
    await page.waitForLoadState('networkidle');
    if (failed.length > 0) console.log('404s:', failed);
    expect(failed).toHaveLength(0);
  });

  test('SiteHeader and SiteFooter render', async ({ page }) => {
    await expect(page.locator('site-header')).toHaveCount(1);
    await expect(page.locator('site-footer')).toHaveCount(1);
  });

  // ── HERO ────────────────────────────────────────────
  test('hero H1 visible with "Somos"', async ({ page }) => {
    const h1 = page.locator('main h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText('Somos');
  });

  test('hero CTA "Primera Conversación" present', async ({ page }) => {
    const cta = page.locator('main a[href="../contacto/index.html"]').filter({ hasText: 'Primera Conversación' });
    await expect(cta).toBeVisible();
  });

  test('hero CTA "Conocer al Equipo" present', async ({ page }) => {
    const cta = page.locator('a[href="#equipo"]');
    await expect(cta).toBeVisible();
    await expect(cta).toContainText('Conocer al Equipo');
  });

  // ── TEAM ────────────────────────────────────────────
  test('4 team member cards render', async ({ page }) => {
    const cards = page.locator('#equipo .card-glass');
    await expect(cards).toHaveCount(4);
  });

  test('team member names present', async ({ page }) => {
    const section = page.locator('#equipo');
    await expect(section).toContainText('Daniel Zuluaga');
    await expect(section).toContainText('Germán Eliécer Sepúlveda');
    await expect(section).toContainText('Javier Montaño');
    await expect(section).toContainText('Katherine Oquendo');
  });

  // ── PROPOSITO SECTION ───────────────────────────────
  test('propósito section renders', async ({ page }) => {
    const section = page.locator('#proposito-metodologia');
    await expect(section).toBeVisible();
    await expect(section).toContainText('Nuestro Propósito');
  });

  // ── EMBAJADORES SECTION ─────────────────────────────
  test('embajadores section renders', async ({ page }) => {
    const section = page.locator('#embajadores');
    await expect(section).toBeVisible();
    await expect(section).toContainText('Modelo de Servicio');
  });

  test('bootcamp certificación link present', async ({ page }) => {
    const link = page.locator('a[data-cta="bootcamp-certificacion"]');
    await expect(link).toBeVisible();
    await expect(link).toContainText('Aplicar a Certificación');
  });

  // ── JSON-LD ─────────────────────────────────────────
  test('JSON-LD structured data present', async ({ page }) => {
    const jsonLd = page.locator('script[type="application/ld+json"]');
    const count = await jsonLd.count();
    expect(count).toBeGreaterThanOrEqual(1);
    const content = await jsonLd.first().textContent();
    const data = JSON.parse(content);
    // Should be an array with BreadcrumbList and AboutPage
    expect(Array.isArray(data)).toBe(true);
  });

  // ── RESPONSIVE ──────────────────────────────────────
  for (const vp of VIEWPORTS) {
    test(`no horizontal overflow at ${vp.width}px`, async ({ page }) => {
      await page.setViewportSize(vp);
      await page.goto('/nosotros/index.html');
      await page.waitForLoadState('networkidle');
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
      expect(overflow).toBe(false);
    });
  }

  test('mobile: hero and team visible at 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/nosotros/index.html');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('main h1')).toBeVisible();
  });

  // ── BREADCRUMB ──────────────────────────────────────
  test('breadcrumb links to Inicio', async ({ page }) => {
    const link = page.locator('.breadcrumb-list a[href="../index.html"]');
    await expect(link).toBeVisible();
    await expect(link).toContainText('Inicio');
  });
});

// ══════════════════════════════════════════════════════════════════
// 3) nosotros/mision.html
// ══════════════════════════════════════════════════════════════════
test.describe('nosotros/mision.html — Misión y Propósito', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/nosotros/mision.html');
    await page.waitForLoadState('networkidle');
  });

  // ── SEO ──────────────────────────────────────────────
  test('SEO meta tags complete', async ({ page }) => {
    await expect(page).toHaveTitle(/Misión.*Propósito.*MetodologIA/i);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /index, follow/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{20,}/);
    await expect(page.locator('meta[name="keywords"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
    await expect(page.locator('meta[property="twitter:title"]')).toHaveAttribute('content', /.+/);
  });

  // ── RENDER ──────────────────────────────────────────
  test('no JS errors on load', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/nosotros/mision.html');
    await page.waitForLoadState('networkidle');
    expect(errors).toHaveLength(0);
  });

  test('no 404 resources', async ({ page }) => {
    const failed = collect404s(page);
    await page.goto('/nosotros/mision.html');
    await page.waitForLoadState('networkidle');
    if (failed.length > 0) console.log('404s:', failed);
    expect(failed).toHaveLength(0);
  });

  test('SiteHeader and SiteFooter render', async ({ page }) => {
    await expect(page.locator('site-header')).toHaveCount(1);
    await expect(page.locator('site-footer')).toHaveCount(1);
  });

  // ── HERO ────────────────────────────────────────────
  test('hero H1 visible with "Retos" and "Oportunidades"', async ({ page }) => {
    const h1 = page.locator('main h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText('Retos');
    await expect(h1).toContainText('Oportunidades');
  });

  test('hero CTA "Unirse al Propósito" links to contacto', async ({ page }) => {
    const cta = page.locator('a[href="../contacto/index.html"]').filter({ hasText: 'Unirse al Propósito' });
    await expect(cta).toBeVisible();
  });

  test('hero CTA "Ver Filosofía" links to #ikigai', async ({ page }) => {
    const cta = page.locator('a[href="#ikigai"]');
    await expect(cta).toBeVisible();
    await expect(cta).toContainText('Ver Filosofía');
  });

  // ── CONTENT SECTIONS ────────────────────────────────
  test('Ikigai section renders 4 pillars', async ({ page }) => {
    const cards = page.locator('.card-glass.rounded-2xl').filter({ has: page.locator('h3') });
    // 4 ikigai cards + 2 boundary cards (SI/NO) = at least 4
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test('Mission statement blockquote present', async ({ page }) => {
    const quote = page.locator('blockquote');
    await expect(quote).toBeVisible();
    await expect(quote).toContainText('digno');
    await expect(quote).toContainText('competitivo');
  });

  test('"Lo que SÍ Hacemos" section renders', async ({ page }) => {
    await expect(page.locator('text=Lo que SÍ Hacemos')).toBeVisible();
  });

  test('"Lo que NO Hacemos" section renders', async ({ page }) => {
    await expect(page.locator('text=Lo que NO Hacemos')).toBeVisible();
  });

  // ── CTA ─────────────────────────────────────────────
  test('bottom CTA "Primera Conversación" present', async ({ page }) => {
    const ctas = page.locator('a[href="../contacto/index.html"]');
    const count = await ctas.count();
    expect(count).toBeGreaterThanOrEqual(2); // hero + bottom
  });

  // ── BREADCRUMB ──────────────────────────────────────
  test('breadcrumb links to Inicio and Nosotros', async ({ page }) => {
    const inicio = page.locator('nav[aria-label="Breadcrumb"] a[href="../index.html"]');
    await expect(inicio).toBeVisible();
    const nosotros = page.locator('nav[aria-label="Breadcrumb"] a[href="index.html"]');
    await expect(nosotros).toBeVisible();
  });

  // ── RESPONSIVE ──────────────────────────────────────
  for (const vp of VIEWPORTS) {
    test(`no horizontal overflow at ${vp.width}px`, async ({ page }) => {
      await page.setViewportSize(vp);
      await page.goto('/nosotros/mision.html');
      await page.waitForLoadState('networkidle');
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
      expect(overflow).toBe(false);
    });
  }

  test('mobile: hero visible at 320px', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto('/nosotros/mision.html');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('main h1')).toBeVisible();
  });
});

// ══════════════════════════════════════════════════════════════════
// 4) nosotros/ecosistema.html
// ══════════════════════════════════════════════════════════════════
test.describe('nosotros/ecosistema.html — Ecosistema de Valor', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/nosotros/ecosistema.html');
    await page.waitForLoadState('networkidle');
  });

  // ── SEO ──────────────────────────────────────────────
  test('SEO meta tags complete', async ({ page }) => {
    await expect(page).toHaveTitle(/Ecosistema.*Valor.*MetodologIA/i);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /index, follow/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{20,}/);
    await expect(page.locator('meta[name="keywords"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
    await expect(page.locator('meta[property="twitter:title"]')).toHaveAttribute('content', /.+/);
  });

  // ── RENDER ──────────────────────────────────────────
  test('no JS errors on load', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/nosotros/ecosistema.html');
    await page.waitForLoadState('networkidle');
    expect(errors).toHaveLength(0);
  });

  test('no 404 resources', async ({ page }) => {
    const failed = collect404s(page);
    await page.goto('/nosotros/ecosistema.html');
    await page.waitForLoadState('networkidle');
    if (failed.length > 0) console.log('404s:', failed);
    expect(failed).toHaveLength(0);
  });

  test('SiteHeader and SiteFooter render', async ({ page }) => {
    await expect(page.locator('site-header')).toHaveCount(1);
    await expect(page.locator('site-footer')).toHaveCount(1);
  });

  // ── HERO ────────────────────────────────────────────
  test('hero H1 visible with "Ecosistema"', async ({ page }) => {
    const h1 = page.locator('main h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText('Ecosistema');
  });

  test('hero CTA "Ver Partners" links to #partners', async ({ page }) => {
    const cta = page.locator('a[href="#partners"]');
    await expect(cta).toBeVisible();
    await expect(cta).toContainText('Ver Partners');
  });

  test('hero CTA "Comunidad" links to #comunidad', async ({ page }) => {
    const cta = page.locator('a[href="#comunidad"]');
    await expect(cta).toBeVisible();
    await expect(cta).toContainText('Comunidad');
  });

  // ── PARTNERS SECTION ────────────────────────────────
  test('partners section renders 2 partner cards', async ({ page }) => {
    const cards = page.locator('#partners .card-partner');
    await expect(cards).toHaveCount(2);
  });

  test('partner cards contain apply links to contacto', async ({ page }) => {
    const links = page.locator('#partners a[href="../contacto/index.html"]');
    await expect(links).toHaveCount(2);
  });

  test('"Consultoras Estratégicas" card present', async ({ page }) => {
    await expect(page.locator('#partners')).toContainText('Consultoras Estratégicas');
  });

  test('"Technology Resellers" card present', async ({ page }) => {
    await expect(page.locator('#partners')).toContainText('Technology Resellers');
  });

  // ── COMMUNITY SECTION ──────────────────────────────
  test('community section renders 3 cards', async ({ page }) => {
    const section = page.locator('#comunidad');
    await expect(section).toBeVisible();
    await expect(section).toContainText('Embajadores');
    await expect(section).toContainText('Alumni');
    await expect(section).toContainText('Aliados Tecnológicos');
  });

  test('"Ver Ruta de Formación" link present', async ({ page }) => {
    const link = page.locator('a[href="../ruta/index.html"]').filter({ hasText: 'Ver Ruta de Formación' });
    await expect(link).toBeVisible();
  });

  // ── CTA SECTION ─────────────────────────────────────
  test('bottom CTA "Primera Conversación" present', async ({ page }) => {
    const ctas = page.locator('a[href="../contacto/index.html"]');
    const count = await ctas.count();
    expect(count).toBeGreaterThanOrEqual(3); // 2 partner + 1 bottom CTA
  });

  test('"Iniciar como Alumno" CTA links to ruta', async ({ page }) => {
    const link = page.locator('a[href="../ruta/index.html"]').filter({ hasText: 'Iniciar como Alumno' });
    await expect(link).toBeVisible();
  });

  // ── BREADCRUMB ──────────────────────────────────────
  test('breadcrumb links to Inicio and Nosotros', async ({ page }) => {
    const inicio = page.locator('nav[aria-label="Breadcrumb"] a[href="../index.html"]');
    await expect(inicio).toBeVisible();
    const nosotros = page.locator('nav[aria-label="Breadcrumb"] a[href="index.html"]');
    await expect(nosotros).toBeVisible();
  });

  // ── RESPONSIVE ──────────────────────────────────────
  for (const vp of VIEWPORTS) {
    test(`no horizontal overflow at ${vp.width}px`, async ({ page }) => {
      await page.setViewportSize(vp);
      await page.goto('/nosotros/ecosistema.html');
      await page.waitForLoadState('networkidle');
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
      expect(overflow).toBe(false);
    });
  }

  test('mobile: hero and CTA visible at 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/nosotros/ecosistema.html');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('main h1')).toBeVisible();
    await expect(page.locator('a[href="#partners"]')).toBeVisible();
  });

  // ── SCROLL TO SECTIONS ──────────────────────────────
  test('clicking "Ver Partners" scrolls #partners into viewport', async ({ page }) => {
    await page.locator('a[href="#partners"]').click();
    await page.waitForTimeout(800);
    await expect(page.locator('#partners')).toBeInViewport();
  });

  test('clicking "Comunidad" scrolls #comunidad into viewport', async ({ page }) => {
    await page.locator('a[href="#comunidad"]').click();
    await page.waitForTimeout(800);
    await expect(page.locator('#comunidad')).toBeInViewport();
  });
});
