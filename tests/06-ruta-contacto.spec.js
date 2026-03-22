const { test, expect } = require('@playwright/test');

// ═══════════════════════════════════════════════════════════════
//  ruta/index.html
// ═══════════════════════════════════════════════════════════════

test.describe('ruta/index.html — Ruta de Evolución Digital', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/ruta/index.html');
    await page.waitForLoadState('networkidle');
  });

  // ── SEO ──────────────────────────────────────────────

  test('SEO: title contains Ruta and MetodologIA', async ({ page }) => {
    await expect(page).toHaveTitle(/Ruta.*MetodologIA|MetodologIA.*Ruta/i);
  });

  test('SEO: robots meta is index,follow', async ({ page }) => {
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /index, follow/);
  });

  test('SEO: description meta has meaningful content', async ({ page }) => {
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{20,}/);
  });

  test('SEO: keywords meta present', async ({ page }) => {
    await expect(page.locator('meta[name="keywords"]')).toHaveAttribute('content', /.+/);
  });

  test('SEO: og:image present', async ({ page }) => {
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /.+/);
  });

  test('SEO: og:title present', async ({ page }) => {
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/);
  });

  test('SEO: og:description present', async ({ page }) => {
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /.+/);
  });

  test('SEO: twitter:card is summary_large_image', async ({ page }) => {
    await expect(page.locator('meta[property="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
  });

  test('SEO: twitter:image present', async ({ page }) => {
    await expect(page.locator('meta[property="twitter:image"]')).toHaveAttribute('content', /.+/);
  });

  test('SEO: canonical URL present', async ({ page }) => {
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /metodologia\.info\/ruta/);
  });

  // ── RENDER ───────────────────────────────────────────

  test('no JS errors on load', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('/ruta/index.html');
    await page.waitForLoadState('networkidle');
    expect(errors).toHaveLength(0);
  });

  test('no 404 resources', async ({ page }) => {
    const failed = [];
    page.on('response', resp => {
      if (resp.status() === 404 && !resp.url().includes('favicon')) failed.push(resp.url());
    });
    await page.goto('/ruta/index.html');
    await page.waitForLoadState('networkidle');
    if (failed.length > 0) console.log('404s:', failed);
    expect(failed).toHaveLength(0);
  });

  test('SiteHeader and SiteFooter render', async ({ page }) => {
    await expect(page.locator('site-header')).toHaveCount(1);
    await expect(page.locator('site-footer')).toHaveCount(1);
  });

  // ── HERO ─────────────────────────────────────────────

  test('hero H1 is visible and contains expected text', async ({ page }) => {
    const h1 = page.locator('main h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText('Soberanía');
  });

  test('hero badge shows "Sistema de 9 Niveles"', async ({ page }) => {
    await expect(page.locator('text=Sistema de 9 Niveles')).toBeVisible();
  });

  test('hero CTA "Diseñar mi Inversión" links to cotizador-personas', async ({ page }) => {
    const cta = page.locator('a[href="cotizador-personas.html"]').first();
    await expect(cta).toBeVisible();
    await expect(cta).toContainText('Diseñar mi Inversión');
  });

  test('hero CTA "Ver el Mapa" links to #ruta', async ({ page }) => {
    const cta = page.locator('a[href="#ruta"]');
    await expect(cta).toBeVisible();
    await expect(cta).toContainText('Ver el Mapa');
  });

  // ── KPI CARDS ────────────────────────────────────────

  test('4 KPI cards exist in hero (9, 6, 2, infinity)', async ({ page }) => {
    const kpiCards = page.locator('.card-glass.text-center.group');
    await expect(kpiCards).toHaveCount(4);
  });

  // ── ROADMAP GANTT SECTION ────────────────────────────

  test('roadmap section #ruta exists', async ({ page }) => {
    await expect(page.locator('#ruta')).toHaveCount(1);
  });

  test('10 level buttons in gantt chart (N0-N9)', async ({ page }) => {
    const levelButtons = page.locator('#ruta button[onclick*="openLevelModal"]');
    await expect(levelButtons).toHaveCount(10);
  });

  test('4 phase lanes exist (Fundamentar, Acelerar, Catalizar, Amplificar)', async ({ page }) => {
    await expect(page.locator('text=Fase 1: Fundamentar')).toBeVisible();
    await expect(page.locator('text=Fase 2: Acelerar')).toBeVisible();
    await expect(page.locator('text=Fase 3: Catalizar')).toBeVisible();
    await expect(page.locator('text=Fase 4: Amplificar')).toBeVisible();
  });

  // ── LEVEL DETAIL SECTIONS ──────────────────────────

  test('all 10 level detail sections exist (N0-N9)', async ({ page }) => {
    const levelLabels = [
      'Nivel 0', 'Nivel 1', 'Nivel 2', 'Nivel 3', 'Nivel 4',
      'Nivel 5', 'Nivel 6', 'Nivel 7', 'Nivel 8', 'Nivel 9'
    ];
    for (const label of levelLabels) {
      await expect(page.locator(`text=${label}`).first()).toBeAttached();
    }
  });

  test('level detail "Detalles" buttons present for each level', async ({ page }) => {
    // 10 inline detail buttons + 10 gantt bar buttons = 20 total openLevelModal calls
    const detailButtons = page.locator('button[onclick*="openLevelModal"]');
    const count = await detailButtons.count();
    // 10 from gantt + 10 from detail sections = 20
    expect(count).toBe(20);
  });

  test('"Ver en Cotizador" links appear for levels 1-9', async ({ page }) => {
    const cotizadorLinks = page.locator('#niveles a[href="cotizador-personas.html"]');
    await expect(cotizadorLinks).toHaveCount(9);
  });

  // ── LEVEL MODAL ──────────────────────────────────────

  test('level modal has ARIA attributes', async ({ page }) => {
    const modal = page.locator('#level-modal');
    await expect(modal).toHaveAttribute('role', 'dialog');
    await expect(modal).toHaveAttribute('aria-modal', 'true');
  });

  const levelKeys = ['n0', 'n1', 'n2', 'n3', 'n4', 'n5', 'n6', 'n7', 'n8', 'n9'];
  for (const key of levelKeys) {
    test(`level modal "${key}" opens with content`, async ({ page }) => {
      await page.evaluate(k => openLevelModal(k), key);
      await page.waitForTimeout(500);
      const modal = page.locator('#level-modal');
      const opacity = await modal.evaluate(el => getComputedStyle(el).opacity);
      expect(parseFloat(opacity)).toBe(1);
      const content = await page.locator('#level-modal-content').textContent();
      expect(content.length).toBeGreaterThan(50);
      // Close
      await page.evaluate(() => closeLevelModal());
      await page.waitForTimeout(300);
    });
  }

  test('level modal closes via X button', async ({ page }) => {
    await page.evaluate(() => openLevelModal('n0'));
    await page.waitForTimeout(500);
    await page.click('#level-modal button[aria-label="Cerrar"]');
    await page.waitForTimeout(400);
    const opacity = await page.locator('#level-modal').evaluate(el => getComputedStyle(el).opacity);
    expect(parseFloat(opacity)).toBe(0);
  });

  // ── COTIZADOR CTA SECTION ──────────────────────────

  test('cotizador CTA "Simular Inversión" visible', async ({ page }) => {
    const cta = page.locator('a[href="cotizador-personas.html"]', { hasText: 'Simular Inversión' });
    await expect(cta).toBeVisible();
  });

  // ── FINAL CTA SECTION ─────────────────────────────

  test('final CTA "Confirmar Interés en la Ruta" links to calendar', async ({ page }) => {
    const cta = page.locator('a', { hasText: 'Confirmar Interés en la Ruta' });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', /calendar\.app\.google/);
    await expect(cta).toHaveAttribute('target', '_blank');
  });

  // ── BREADCRUMB ────────────────────────────────────

  test('breadcrumb contains Inicio and Ruta', async ({ page }) => {
    const breadcrumb = page.locator('.breadcrumb-nav');
    await expect(breadcrumb).toContainText('Inicio');
    await expect(breadcrumb).toContainText('Ruta');
  });

  // ── RESPONSIVE / NO HORIZONTAL OVERFLOW ────────────

  const viewports = [
    { w: 320, h: 800, label: '320px' },
    { w: 375, h: 812, label: '375px' },
    { w: 768, h: 1024, label: '768px' },
    { w: 1024, h: 768, label: '1024px' },
    { w: 1440, h: 900, label: '1440px' },
  ];

  for (const { w, h, label } of viewports) {
    test(`no horizontal overflow at ${label}`, async ({ page }) => {
      await page.setViewportSize({ width: w, height: h });
      await page.goto('/ruta/index.html');
      await page.waitForLoadState('networkidle');
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
      expect(overflow, `horizontal overflow detected at ${label}`).toBe(false);
    });
  }

  // ── MOBILE VIEWPORT USABILITY ──────────────────────

  test('mobile: hero CTA buttons are tappable at 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/ruta/index.html');
    await page.waitForLoadState('networkidle');
    const cta = page.locator('a[href="cotizador-personas.html"]').first();
    await expect(cta).toBeVisible();
    const box = await cta.boundingBox();
    expect(box.height).toBeGreaterThanOrEqual(44); // minimum tap target
  });

  test('mobile: gantt bars are visible at 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/ruta/index.html');
    await page.waitForLoadState('networkidle');
    const firstBar = page.locator('button[onclick*="openLevelModal"]').first();
    await firstBar.scrollIntoViewIfNeeded();
    await expect(firstBar).toBeVisible();
  });

  // ── SCROLL: FOOTER IN VIEWPORT ──────────────────────

  test('footer is reachable by scrolling', async ({ page }) => {
    const footer = page.locator('site-footer');
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeInViewport();
  });

  // ── ALL BUTTONS / INTERACTIVE ELEMENTS ─────────────

  test('all buttons have accessible text or aria-label', async ({ page }) => {
    const buttons = page.locator('button');
    const count = await buttons.count();
    for (let i = 0; i < count; i++) {
      const btn = buttons.nth(i);
      const text = (await btn.textContent()).trim();
      const ariaLabel = await btn.getAttribute('aria-label');
      const title = await btn.getAttribute('title');
      expect(text.length > 0 || (ariaLabel && ariaLabel.length > 0) || (title && title.length > 0),
        `Button ${i} has no accessible text`).toBe(true);
    }
  });
});


// ═══════════════════════════════════════════════════════════════
//  contacto/index.html
// ═══════════════════════════════════════════════════════════════

test.describe('contacto/index.html — Contacto y Agenda', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/contacto/index.html');
    await page.waitForLoadState('networkidle');
  });

  // ── SEO ──────────────────────────────────────────────

  test('SEO: title contains Contacto', async ({ page }) => {
    await expect(page).toHaveTitle(/Contacto/i);
  });

  test('SEO: robots meta is index,follow', async ({ page }) => {
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /index, follow/);
  });

  test('SEO: description meta has meaningful content', async ({ page }) => {
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{20,}/);
  });

  test('SEO: keywords meta present', async ({ page }) => {
    await expect(page.locator('meta[name="keywords"]')).toHaveAttribute('content', /.+/);
  });

  test('SEO: og:image present', async ({ page }) => {
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /.+/);
  });

  test('SEO: og:title present', async ({ page }) => {
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/);
  });

  test('SEO: og:description present', async ({ page }) => {
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /.+/);
  });

  test('SEO: twitter:card is summary_large_image', async ({ page }) => {
    await expect(page.locator('meta[property="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
  });

  test('SEO: twitter:image present', async ({ page }) => {
    await expect(page.locator('meta[property="twitter:image"]')).toHaveAttribute('content', /.+/);
  });

  test('SEO: canonical URL present', async ({ page }) => {
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /metodologia\.info\/contacto/);
  });

  test('SEO: structured data (ld+json) present', async ({ page }) => {
    const ldJson = page.locator('script[type="application/ld+json"]');
    await expect(ldJson).toHaveCount(1);
    const content = await ldJson.textContent();
    expect(content).toContain('ContactPage');
    expect(content).toContain('BreadcrumbList');
  });

  // ── RENDER ───────────────────────────────────────────

  test('no JS errors on load', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('/contacto/index.html');
    await page.waitForLoadState('networkidle');
    expect(errors).toHaveLength(0);
  });

  test('no 404 resources', async ({ page }) => {
    const failed = [];
    page.on('response', resp => {
      if (resp.status() === 404 && !resp.url().includes('favicon')) failed.push(resp.url());
    });
    await page.goto('/contacto/index.html');
    await page.waitForLoadState('networkidle');
    if (failed.length > 0) console.log('404s:', failed);
    expect(failed).toHaveLength(0);
  });

  test('SiteHeader and SiteFooter render', async ({ page }) => {
    await expect(page.locator('site-header')).toHaveCount(1);
    await expect(page.locator('site-footer')).toHaveCount(1);
  });

  // ── HERO / H1 ────────────────────────────────────────

  test('H1 is visible and contains "Oportunidades"', async ({ page }) => {
    const h1 = page.locator('main h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText('Oportunidades');
  });

  test('badge "Agenda Abierta" is visible', async ({ page }) => {
    await expect(page.locator('text=Agenda Abierta')).toBeVisible();
  });

  // ── VALUE CARD ──────────────────────────────────────

  test('value card "¿Qué logramos en 60 minutos?" visible', async ({ page }) => {
    await expect(page.locator('h3', { hasText: '¿Qué logramos en 60 minutos?' })).toBeVisible();
  });

  test('value card mentions "Documento de Entendimiento"', async ({ page }) => {
    await expect(page.locator('text=Documento de Entendimiento')).toBeVisible();
  });

  // ── ACTION CARD / CALENDAR CTA ─────────────────────

  test('"Reserva tu espacio" heading visible', async ({ page }) => {
    await expect(page.locator('h3', { hasText: 'Reserva tu espacio' })).toBeVisible();
  });

  test('"Agendar ahora" CTA links to Google Calendar', async ({ page }) => {
    const cta = page.locator('a', { hasText: 'Agendar ahora' });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', /calendar\.app\.google/);
    await expect(cta).toHaveAttribute('target', '_blank');
  });

  test('availability schedule mentions "Lunes"', async ({ page }) => {
    await expect(page.locator('text=Todos los Lunes')).toBeVisible();
  });

  // ── POLICY MODAL ──────────────────────────────────

  test('policy modal trigger button exists', async ({ page }) => {
    const trigger = page.locator('button', { hasText: 'Logística y Políticas' });
    await expect(trigger).toBeVisible();
  });

  test('policy modal opens with showModal()', async ({ page }) => {
    await page.evaluate(() => document.getElementById('policyModal').showModal());
    await page.waitForTimeout(300);
    const dialog = page.locator('#policyModal');
    await expect(dialog).toBeVisible();
    // Verify content sections
    await expect(page.locator('#policyModal h4', { hasText: 'SLA de Agendamiento' })).toBeVisible();
    await expect(page.locator('#policyModal h4', { hasText: 'Reprogramación' })).toBeVisible();
    await expect(page.locator('#policyModal h4', { hasText: 'Política de No-Show' })).toBeVisible();
  });

  test('policy modal closes with "Entendido" button', async ({ page }) => {
    await page.evaluate(() => document.getElementById('policyModal').showModal());
    await page.waitForTimeout(300);
    await page.locator('#policyModal button', { hasText: 'Entendido' }).click();
    await page.waitForTimeout(300);
    const isOpen = await page.evaluate(() => document.getElementById('policyModal').open);
    expect(isOpen).toBe(false);
  });

  test('policy modal closes with X button', async ({ page }) => {
    await page.evaluate(() => document.getElementById('policyModal').showModal());
    await page.waitForTimeout(300);
    // X button is the one inside the header area that is not "Entendido"
    const closeBtn = page.locator('#policyModal .border-b button');
    await closeBtn.click();
    await page.waitForTimeout(300);
    const isOpen = await page.evaluate(() => document.getElementById('policyModal').open);
    expect(isOpen).toBe(false);
  });

  // ── REPROGRAMACION LINK ────────────────────────────

  test('reprogramacion link exists', async ({ page }) => {
    const link = page.locator('a[data-cta="contacto-reprogramacion"]');
    await expect(link).toBeVisible();
    await expect(link).toContainText('Envíanos un email');
  });

  // ── BREADCRUMB ────────────────────────────────────

  test('breadcrumb contains Inicio and Contacto', async ({ page }) => {
    const breadcrumb = page.locator('.breadcrumb-nav');
    await expect(breadcrumb).toContainText('Inicio');
    await expect(breadcrumb).toContainText('Contacto');
  });

  // ── RESPONSIVE / NO HORIZONTAL OVERFLOW ────────────

  const viewports = [
    { w: 320, h: 800, label: '320px' },
    { w: 375, h: 812, label: '375px' },
    { w: 768, h: 1024, label: '768px' },
    { w: 1024, h: 768, label: '1024px' },
    { w: 1440, h: 900, label: '1440px' },
  ];

  for (const { w, h, label } of viewports) {
    test(`no horizontal overflow at ${label}`, async ({ page }) => {
      await page.setViewportSize({ width: w, height: h });
      await page.goto('/contacto/index.html');
      await page.waitForLoadState('networkidle');
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
      expect(overflow, `horizontal overflow detected at ${label}`).toBe(false);
    });
  }

  // ── MOBILE VIEWPORT USABILITY ──────────────────────

  test('mobile: "Agendar ahora" CTA is tappable at 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/contacto/index.html');
    await page.waitForLoadState('networkidle');
    const cta = page.locator('a', { hasText: 'Agendar ahora' });
    await expect(cta).toBeVisible();
    const box = await cta.boundingBox();
    expect(box.height).toBeGreaterThanOrEqual(44);
  });

  test('mobile: value card visible at 320px', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto('/contacto/index.html');
    await page.waitForLoadState('networkidle');
    const card = page.locator('h3', { hasText: '¿Qué logramos en 60 minutos?' });
    await card.scrollIntoViewIfNeeded();
    await expect(card).toBeVisible();
  });

  // ── SCROLL: FOOTER IN VIEWPORT ──────────────────────

  test('footer is reachable by scrolling', async ({ page }) => {
    const footer = page.locator('site-footer');
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeInViewport();
  });

  // ── ALL BUTTONS / INTERACTIVE ELEMENTS ─────────────

  test('all buttons have accessible text or aria-label', async ({ page }) => {
    const buttons = page.locator('main button');
    const count = await buttons.count();
    for (let i = 0; i < count; i++) {
      const btn = buttons.nth(i);
      const text = (await btn.textContent()).trim();
      const ariaLabel = await btn.getAttribute('aria-label');
      const title = await btn.getAttribute('title');
      expect(text.length > 0 || (ariaLabel && ariaLabel.length > 0) || (title && title.length > 0),
        `Button ${i} has no accessible text`).toBe(true);
    }
  });

  // ── LINKS ─────────────────────────────────────────

  test('all anchor links in main have href', async ({ page }) => {
    const links = page.locator('main a');
    const count = await links.count();
    for (let i = 0; i < count; i++) {
      const href = await links.nth(i).getAttribute('href');
      expect(href, `Link ${i} missing href`).toBeTruthy();
    }
  });
});
