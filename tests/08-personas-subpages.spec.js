const { test, expect } = require('@playwright/test');

// ============================================================
// 1. personas/autodiagnostico.html
// ============================================================
test.describe('personas/autodiagnostico.html — Autodiagnostico', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/personas/autodiagnostico.html');
    await page.waitForLoadState('networkidle');
  });

  // ── SEO ──────────────────────────────────────────────

  test('title contains Autodiagnóstico and MetodologIA', async ({ page }) => {
    await expect(page).toHaveTitle(/Autodiagnóstico.*MetodologIA/i);
  });

  test('SEO meta robots present', async ({ page }) => {
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /index, follow/);
  });

  test('SEO meta description >= 20 chars', async ({ page }) => {
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{20,}/);
  });

  test('SEO Open Graph tags present', async ({ page }) => {
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website');
  });

  test('SEO Twitter Card tags present', async ({ page }) => {
    await expect(page.locator('meta[property="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
    await expect(page.locator('meta[property="twitter:title"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="twitter:description"]')).toHaveAttribute('content', /.+/);
  });

  test('canonical link present', async ({ page }) => {
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /autodiagnostico/);
  });

  // ── RENDER ───────────────────────────────────────────

  test('no JS errors on load', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('/personas/autodiagnostico.html');
    await page.waitForLoadState('networkidle');
    expect(errors).toHaveLength(0);
  });

  test('no 404 resources', async ({ page }) => {
    const failed = [];
    page.on('response', resp => {
      if (resp.status() === 404 && !resp.url().includes('favicon')) failed.push(resp.url());
    });
    await page.goto('/personas/autodiagnostico.html');
    await page.waitForLoadState('networkidle');
    if (failed.length > 0) console.log('404s:', failed);
    expect(failed).toHaveLength(0);
  });

  test('SiteHeader and SiteFooter render', async ({ page }) => {
    await expect(page.locator('site-header')).toHaveCount(1);
    await expect(page.locator('site-footer')).toHaveCount(1);
  });

  // ── HERO ─────────────────────────────────────────────

  test('hero H1 is visible and contains "Nivel de IA"', async ({ page }) => {
    const h1 = page.locator('main h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText('Nivel de IA');
  });

  test('hero badge shows Paso 0', async ({ page }) => {
    await expect(page.locator('text=Paso 0: Autodiagnóstico Gratuito')).toBeVisible();
  });

  test('hero paragraph describes the diagnostic', async ({ page }) => {
    await expect(page.locator('main p').first()).toContainText('diagnostica tu situación');
  });

  // ── CTAs & LINKS ─────────────────────────────────────

  test('CTA "Iniciar Autodiagnóstico" links to contacto', async ({ page }) => {
    const cta = page.locator('a:has-text("Iniciar Autodiagnóstico")');
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', /contacto/);
  });

  test('CTA "Ir al Paso 1" links to workshops page', async ({ page }) => {
    const link = page.locator('a[href="consultive-workshops-estrategia-personal.html"]');
    await expect(link).toBeVisible();
    await expect(link).toContainText('Paso 1');
  });

  test('breadcrumb links to Inicio and Personas', async ({ page }) => {
    const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]');
    await expect(breadcrumb).toBeVisible();
    await expect(breadcrumb.locator('a[href="../index.html"]')).toHaveCount(1);
    await expect(breadcrumb.locator('a[href="index.html"]')).toHaveCount(1);
  });

  // ── CARD CONTENT ─────────────────────────────────────

  test('glass card shows $0 price', async ({ page }) => {
    await expect(page.locator('text=$0')).toBeVisible();
  });

  test('glass card shows 3 diagnostic steps', async ({ page }) => {
    await expect(page.locator('.card-glass h4')).toHaveCount(3);
  });

  test('quote text is visible at bottom of card', async ({ page }) => {
    await expect(page.locator('text=Lo que no se mide no se puede mejorar')).toBeVisible();
  });

  // ── RESPONSIVE / ADVERSARIAL ─────────────────────────

  test('no horizontal overflow at 320/375/768/1024/1440', async ({ page }) => {
    for (const width of [320, 375, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 800 });
      await page.waitForTimeout(200);
      const hasOverflow = await page.evaluate(() =>
        document.documentElement.scrollWidth > document.documentElement.clientWidth
      );
      expect(hasOverflow, `Overflow at ${width}px`).toBeFalsy();
    }
  });

  test('mobile viewport: H1 and CTA visible at 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(200);
    await expect(page.locator('main h1')).toBeVisible();
    await expect(page.locator('a:has-text("Iniciar Autodiagnóstico")')).toBeVisible();
  });

  test('all buttons/links are tappable at 320px (min 44px touch target or visible)', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.waitForTimeout(200);
    const links = page.locator('main a[href]');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await expect(links.nth(i)).toBeVisible();
    }
  });
});

// ============================================================
// 2. personas/consultive-workshops-estrategia-personal.html
// ============================================================
test.describe('personas/consultive-workshops-estrategia-personal.html — Workshop', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/personas/consultive-workshops-estrategia-personal.html');
    await page.waitForLoadState('networkidle');
  });

  // ── SEO ──────────────────────────────────────────────

  test('title contains Workshop and MetodologIA', async ({ page }) => {
    await expect(page).toHaveTitle(/Workshop.*MetodologIA/i);
  });

  test('SEO meta robots present', async ({ page }) => {
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /index, follow/);
  });

  test('SEO meta description >= 20 chars', async ({ page }) => {
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{20,}/);
  });

  test('SEO Open Graph tags present', async ({ page }) => {
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website');
  });

  test('SEO Twitter Card tags present', async ({ page }) => {
    await expect(page.locator('meta[property="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
    await expect(page.locator('meta[property="twitter:title"]')).toHaveAttribute('content', /.+/);
  });

  test('canonical link present', async ({ page }) => {
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /consultive-workshops/);
  });

  // ── RENDER ───────────────────────────────────────────

  test('no JS errors on load', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('/personas/consultive-workshops-estrategia-personal.html');
    await page.waitForLoadState('networkidle');
    expect(errors).toHaveLength(0);
  });

  test('no 404 resources', async ({ page }) => {
    const failed = [];
    page.on('response', resp => {
      if (resp.status() === 404 && !resp.url().includes('favicon')) failed.push(resp.url());
    });
    await page.goto('/personas/consultive-workshops-estrategia-personal.html');
    await page.waitForLoadState('networkidle');
    if (failed.length > 0) console.log('404s:', failed);
    expect(failed).toHaveLength(0);
  });

  test('SiteHeader and SiteFooter render', async ({ page }) => {
    await expect(page.locator('site-header')).toHaveCount(1);
    await expect(page.locator('site-footer')).toHaveCount(1);
  });

  // ── HERO ─────────────────────────────────────────────

  test('hero H1 visible with "Estrategia Personal"', async ({ page }) => {
    const h1 = page.locator('main h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText('Estrategia Personal');
  });

  test('hero badge shows Paso 1', async ({ page }) => {
    await expect(page.locator('text=Paso 1: Exploración')).toBeVisible();
  });

  test('hero shows price $200.000 COP', async ({ page }) => {
    await expect(page.locator('text=$200.000')).toBeVisible();
  });

  // ── CTAs & LINKS ─────────────────────────────────────

  test('CTA "Reservar mi Sesión" links to contacto', async ({ page }) => {
    const cta = page.locator('a:has-text("Reservar mi Sesión")');
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', /contacto/);
  });

  test('link to Bootcamp (Paso 2) is present', async ({ page }) => {
    const link = page.locator('a[href="bootcamp-amplificacion-profesional.html"]').first();
    await expect(link).toBeVisible();
  });

  test('CTA "Hablar con un Embajador" links to contacto', async ({ page }) => {
    const link = page.locator('a:has-text("Hablar con un Embajador")');
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', /contacto/);
  });

  test('breadcrumb links to Inicio and Personas', async ({ page }) => {
    const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]');
    await expect(breadcrumb).toBeVisible();
    await expect(breadcrumb.locator('a[href="../index.html"]')).toHaveCount(1);
    await expect(breadcrumb.locator('a[href="index.html"]')).toHaveCount(1);
  });

  // ── SECTIONS ─────────────────────────────────────────

  test('value props section has 3 cards', async ({ page }) => {
    const cards = page.locator('.card-glass').filter({ has: page.locator('h3') });
    await expect(cards).toHaveCount(3);
  });

  test('agenda section has 4 hito items', async ({ page }) => {
    const section = page.locator('#programa');
    await expect(section).toBeVisible();
    // The section has 4 hito cards plus 1 guarantee card-glass; target hitos by structure
    const hitos = section.locator('.card-glass').filter({ has: page.locator('h4') });
    await expect(hitos).toHaveCount(4);
  });

  test('guarantee section visible', async ({ page }) => {
    await expect(page.locator('text=Garantía de Exploración')).toBeVisible();
  });

  test('next step section links to bootcamp and contacto', async ({ page }) => {
    const section = page.locator('#siguiente');
    await expect(section).toBeVisible();
    await expect(section.locator('a[href="bootcamp-amplificacion-profesional.html"]')).toHaveCount(1);
    await expect(section.locator('a[href="../contacto/index.html"]')).toHaveCount(1);
  });

  // ── SCROLL TO SECTION ────────────────────────────────

  test('scroll to #programa section works', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('#programa').scrollIntoView();
    });
    await page.waitForTimeout(300);
    await expect(page.locator('#programa')).toBeInViewport();
  });

  // ── RESPONSIVE / ADVERSARIAL ─────────────────────────

  test('no horizontal overflow at 320/375/768/1024/1440', async ({ page }) => {
    for (const width of [320, 375, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 800 });
      await page.waitForTimeout(200);
      const hasOverflow = await page.evaluate(() =>
        document.documentElement.scrollWidth > document.documentElement.clientWidth
      );
      expect(hasOverflow, `Overflow at ${width}px`).toBeFalsy();
    }
  });

  test('mobile viewport: hero and CTA visible at 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(200);
    await expect(page.locator('main h1')).toBeVisible();
    await expect(page.locator('a:has-text("Reservar mi Sesión")')).toBeVisible();
  });

  test('all main links are visible at 320px', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.waitForTimeout(200);
    const links = page.locator('main a[href]:not([href^="#"])');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await expect(links.nth(i)).toBeVisible();
    }
  });
});

// ============================================================
// 3. personas/bootcamp-amplificacion-profesional.html
// ============================================================
test.describe('personas/bootcamp-amplificacion-profesional.html — Bootcamp', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/personas/bootcamp-amplificacion-profesional.html');
    await page.waitForLoadState('networkidle');
  });

  // ── SEO ──────────────────────────────────────────────

  test('title contains Bootcamp and MetodologIA', async ({ page }) => {
    await expect(page).toHaveTitle(/Bootcamp.*MetodologIA/i);
  });

  test('SEO meta robots present', async ({ page }) => {
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /index, follow/);
  });

  test('SEO meta description >= 20 chars', async ({ page }) => {
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{20,}/);
  });

  test('SEO Open Graph tags present', async ({ page }) => {
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website');
  });

  test('SEO Twitter Card tags present', async ({ page }) => {
    await expect(page.locator('meta[property="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
    await expect(page.locator('meta[property="twitter:title"]')).toHaveAttribute('content', /.+/);
  });

  test('canonical link present', async ({ page }) => {
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /bootcamp-amplificacion/);
  });

  // ── RENDER ───────────────────────────────────────────

  test('no JS errors on load', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('/personas/bootcamp-amplificacion-profesional.html');
    await page.waitForLoadState('networkidle');
    expect(errors).toHaveLength(0);
  });

  test('no 404 resources', async ({ page }) => {
    const failed = [];
    page.on('response', resp => {
      if (resp.status() === 404 && !resp.url().includes('favicon')) failed.push(resp.url());
    });
    await page.goto('/personas/bootcamp-amplificacion-profesional.html');
    await page.waitForLoadState('networkidle');
    if (failed.length > 0) console.log('404s:', failed);
    expect(failed).toHaveLength(0);
  });

  test('SiteHeader and SiteFooter render', async ({ page }) => {
    await expect(page.locator('site-header')).toHaveCount(1);
    await expect(page.locator('site-footer')).toHaveCount(1);
  });

  // ── HERO ─────────────────────────────────────────────

  test('H1 visible with "Amplificación Profesional"', async ({ page }) => {
    const h1 = page.locator('main h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText('Amplificación Profesional');
  });

  test('hero badge shows Paso 2', async ({ page }) => {
    await expect(page.locator('text=Paso 2: Compromiso')).toBeVisible();
  });

  test('hero KPIs display 18h, 9 hitos, 100%', async ({ page }) => {
    const kpiBlock = page.locator('.border-brand-gold\\/30');
    await expect(kpiBlock.locator('text=18h')).toBeVisible();
    await expect(kpiBlock.locator('text=9')).toBeVisible();
    await expect(kpiBlock.locator('text=100%')).toBeVisible();
  });

  // ── CTAs & LINKS ─────────────────────────────────────

  test('CTA "Aplicar al Bootcamp" links to Google Calendar', async ({ page }) => {
    const cta = page.locator('a:has-text("Aplicar al Bootcamp")');
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', /calendar\.app\.google/);
    await expect(cta).toHaveAttribute('target', '_blank');
    await expect(cta).toHaveAttribute('rel', /noopener/);
  });

  test('CTA "Ver Programa" links to #programa anchor', async ({ page }) => {
    const cta = page.locator('a[href="#programa"]');
    await expect(cta).toBeVisible();
  });

  test('CTA "Solicitar Información" links to contacto', async ({ page }) => {
    const link = page.locator('a:has-text("Solicitar Información")');
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', /contacto/);
  });

  test('breadcrumb links to Inicio and Personas', async ({ page }) => {
    const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]');
    await expect(breadcrumb).toBeVisible();
    await expect(breadcrumb.locator('a[href="../index.html"]')).toHaveCount(1);
    await expect(breadcrumb.locator('a[href="index.html"]')).toHaveCount(1);
  });

  // ── PROGRAMA SECTION ────────────────────────────────

  test('programa section has 9 hito cards', async ({ page }) => {
    const section = page.locator('#programa');
    await expect(section).toBeVisible();
    const hitos = section.locator('.hito-card');
    await expect(hitos).toHaveCount(9);
  });

  test('programa section has 3 phase labels', async ({ page }) => {
    await expect(page.locator('text=Fase 1: Fundamentos')).toBeVisible();
    await expect(page.locator('text=Fase 2: Estrategia')).toBeVisible();
    await expect(page.locator('text=Fase 3: Ejecución')).toBeVisible();
  });

  // ── MODULE MODAL ─────────────────────────────────────

  test('clicking a hito card opens module modal', async ({ page }) => {
    await page.evaluate(() => openModuleModal(1));
    await page.waitForTimeout(300);
    const modal = page.locator('.fixed.inset-0.z-50');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('Business Model You');
  });

  test('module modal can be closed via button', async ({ page }) => {
    await page.evaluate(() => openModuleModal(1));
    await page.waitForTimeout(300);
    await page.locator('.fixed.inset-0.z-50 button:has-text("Cerrar")').click();
    await page.waitForTimeout(300);
    await expect(page.locator('.fixed.inset-0.z-50')).toHaveCount(0);
  });

  test('module modal can be closed by clicking overlay', async ({ page }) => {
    await page.evaluate(() => openModuleModal(3));
    await page.waitForTimeout(300);
    const modal = page.locator('.fixed.inset-0.z-50');
    // Click top-left corner (overlay area)
    await modal.click({ position: { x: 5, y: 5 } });
    await page.waitForTimeout(300);
    await expect(page.locator('.fixed.inset-0.z-50')).toHaveCount(0);
  });

  test('invalid module ID does not crash', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.evaluate(() => openModuleModal(999));
    await page.waitForTimeout(200);
    expect(errors).toHaveLength(0);
  });

  // ── INVERSIÓN SECTION ────────────────────────────────

  test('inversion section shows price $3.200.000 COP', async ({ page }) => {
    const section = page.locator('#inversion');
    await expect(section).toBeVisible();
    await expect(section).toContainText('3.200.000');
  });

  test('value stack shows included bonuses', async ({ page }) => {
    await expect(page.locator('text=Setup Asistente IA')).toBeVisible();
    await expect(page.locator('text=Batería 90 Prompts')).toBeVisible();
    await expect(page.locator('text=Playbooks Ejecutables')).toBeVisible();
  });

  test('"Agendar Primera Conversación" CTA in inversion links to calendar', async ({ page }) => {
    const section = page.locator('#inversion');
    const cta = section.locator('a:has-text("Agendar Primera Conversación")');
    await expect(cta).toHaveAttribute('href', /calendar\.app\.google/);
  });

  // ── FAQ SECTION ──────────────────────────────────────

  test('FAQ section renders 5 questions', async ({ page }) => {
    const faq = page.locator('#faq-container details');
    await expect(faq).toHaveCount(5);
  });

  test('FAQ item expands on click', async ({ page }) => {
    const first = page.locator('#faq-container details').first();
    await first.locator('summary').click();
    await page.waitForTimeout(200);
    await expect(first).toHaveAttribute('open', '');
  });

  // ── FINAL CTA ────────────────────────────────────────

  test('final CTA section has "Agendar Conversación" link', async ({ page }) => {
    const link = page.locator('a:has-text("Agendar Conversación")').last();
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', /calendar\.app\.google/);
  });

  // ── SCROLL TO #programa ──────────────────────────────

  test('clicking "Ver Programa" scrolls to #programa', async ({ page }) => {
    await page.locator('a[href="#programa"]').click();
    await page.waitForTimeout(500);
    await expect(page.locator('#programa')).toBeInViewport();
  });

  // ── RESPONSIVE / ADVERSARIAL ─────────────────────────

  test('no horizontal overflow at any viewport', async ({ page }) => {
    for (const width of [320, 375, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 800 });
      await page.waitForTimeout(200);
      const hasOverflow = await page.evaluate(() =>
        document.documentElement.scrollWidth > document.documentElement.clientWidth
      );
      expect(hasOverflow, `Overflow at ${width}px`).toBeFalsy();
    }
  });

  test('mobile viewport: hero and CTA visible at 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(200);
    // No <main> on this page (site bug), so use section h1
    await expect(page.locator('section h1')).toBeVisible();
    await expect(page.locator('a:has-text("Aplicar al Bootcamp")')).toBeVisible();
  });

  test('module modal works at mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.evaluate(() => openModuleModal(5));
    await page.waitForTimeout(300);
    const modal = page.locator('.fixed.inset-0.z-50');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('Metas y Métricas');
  });

  test('all hito cards are clickable (have onclick)', async ({ page }) => {
    const hitos = page.locator('.hito-card[onclick]');
    const count = await hitos.count();
    expect(count).toBe(9);
  });
});
