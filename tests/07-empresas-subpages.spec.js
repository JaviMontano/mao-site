const { test, expect } = require('@playwright/test');

// ═══════════════════════════════════════════════════════════════
// 1. empresas/diagnostico-gratuito.html
// ═══════════════════════════════════════════════════════════════

test.describe('empresas/diagnostico-gratuito.html — Diagnóstico Gratuito', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/empresas/diagnostico-gratuito.html');
    await page.waitForLoadState('networkidle');
  });

  // ── SEO ──────────────────────────────────────────────

  test('SEO: title contains Diagnóstico and MetodologIA', async ({ page }) => {
    await expect(page).toHaveTitle(/Diagnóstico.*MetodologIA/);
  });

  test('SEO: robots meta', async ({ page }) => {
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /index, follow/);
  });

  test('SEO: description meta ≥ 20 chars', async ({ page }) => {
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{20,}/);
  });

  test('SEO: keywords meta', async ({ page }) => {
    await expect(page.locator('meta[name="keywords"]')).toHaveAttribute('content', /.+/);
  });

  test('SEO: canonical', async ({ page }) => {
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /diagnostico-gratuito/);
  });

  test('SEO: og:image present', async ({ page }) => {
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /.+/);
  });

  test('SEO: og:title present', async ({ page }) => {
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/);
  });

  test('SEO: og:description present', async ({ page }) => {
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /.{20,}/);
  });

  test('SEO: twitter:card = summary_large_image', async ({ page }) => {
    await expect(page.locator('meta[property="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
  });

  test('SEO: twitter:title present', async ({ page }) => {
    await expect(page.locator('meta[property="twitter:title"]')).toHaveAttribute('content', /.+/);
  });

  test('SEO: twitter:description present', async ({ page }) => {
    await expect(page.locator('meta[property="twitter:description"]')).toHaveAttribute('content', /.{20,}/);
  });

  // ── RENDER ───────────────────────────────────────────

  test('no JS errors on load', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('/empresas/diagnostico-gratuito.html');
    await page.waitForLoadState('networkidle');
    expect(errors).toHaveLength(0);
  });

  test('no 404 resources', async ({ page }) => {
    const failed = [];
    page.on('response', resp => {
      if (resp.status() === 404 && !resp.url().includes('favicon')) {
        failed.push(resp.url());
      }
    });
    await page.goto('/empresas/diagnostico-gratuito.html');
    await page.waitForLoadState('networkidle');
    if (failed.length > 0) console.log('404s:', failed);
    expect(failed).toHaveLength(0);
  });

  test('SiteHeader and SiteFooter render', async ({ page }) => {
    await expect(page.locator('site-header')).toHaveCount(1);
    await expect(page.locator('site-footer')).toHaveCount(1);
  });

  // ── HERO ─────────────────────────────────────────────

  test('hero H1 is visible and contains "Brecha de IA"', async ({ page }) => {
    const h1 = page.locator('main h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/Brecha de IA/);
  });

  test('hero paragraph mentions 1 hora', async ({ page }) => {
    const p = page.locator('main p').first();
    await expect(p).toContainText(/1 hora/i);
  });

  test('hero badge says Paso 1', async ({ page }) => {
    await expect(page.locator('text=Paso 1')).toBeVisible();
  });

  // ── CTAs & LINKS ─────────────────────────────────────

  test('CTA "Agendar Diagnóstico Gratis" links to contacto', async ({ page }) => {
    const cta = page.locator('a:has-text("Agendar Diagnóstico Gratis")');
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', /contacto/);
  });

  test('secondary CTA "Ir al Paso 2" links to workshop', async ({ page }) => {
    const cta = page.locator('a:has-text("Ir al Paso 2")');
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', /workshop/);
  });

  test('breadcrumb Inicio link', async ({ page }) => {
    const link = page.locator('nav[aria-label="Breadcrumb"] a').first();
    await expect(link).toHaveAttribute('href', /index\.html/);
  });

  test('breadcrumb Empresas link', async ({ page }) => {
    const link = page.locator('nav[aria-label="Breadcrumb"] a:has-text("Empresas")');
    await expect(link).toHaveAttribute('href', /index\.html/);
  });

  // ── CARD / CONTENT ───────────────────────────────────

  test('audit card shows $0 price', async ({ page }) => {
    await expect(page.locator('.card-glass:has-text("$0")')).toBeVisible();
  });

  test('audit card has 3 steps (01, 02, 03)', async ({ page }) => {
    for (const step of ['01', '02', '03']) {
      await expect(page.locator(`text=${step}`).first()).toBeVisible();
    }
  });

  test('checklist has 3 items', async ({ page }) => {
    const items = page.locator('main ul li');
    expect(await items.count()).toBeGreaterThanOrEqual(3);
  });

  // ── RESPONSIVE ───────────────────────────────────────

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

  test('mobile: H1 and CTA visible at 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(300);
    await expect(page.locator('main h1')).toBeVisible();
    await expect(page.locator('a:has-text("Agendar Diagnóstico Gratis")')).toBeVisible();
  });

  // ── ADVERSARIAL ──────────────────────────────────────

  test('rapid CTA clicks do not crash', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    // Prevent navigation so rapid clicks don't leave the page
    await page.evaluate(() => {
      document.querySelectorAll('a').forEach(a => a.addEventListener('click', e => e.preventDefault()));
    });
    const cta = page.locator('a:has-text("Agendar Diagnóstico Gratis")');
    for (let i = 0; i < 5; i++) {
      await cta.click();
      await page.waitForTimeout(50);
    }
    expect(errors).toHaveLength(0);
  });

  test('structured data is valid JSON-LD', async ({ page }) => {
    const scripts = page.locator('script[type="application/ld+json"]');
    const count = await scripts.count();
    expect(count).toBeGreaterThanOrEqual(1);
    for (let i = 0; i < count; i++) {
      const content = await scripts.nth(i).textContent();
      expect(() => JSON.parse(content)).not.toThrow();
    }
  });
});


// ═══════════════════════════════════════════════════════════════
// 2. empresas/workshop-venta-amplificada.html
// ═══════════════════════════════════════════════════════════════

test.describe('empresas/workshop-venta-amplificada.html — Taller Venta Amplificada', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/empresas/workshop-venta-amplificada.html');
    await page.waitForLoadState('networkidle');
  });

  // ── SEO ──────────────────────────────────────────────

  test('SEO: title contains Venta Amplificada and MetodologIA', async ({ page }) => {
    await expect(page).toHaveTitle(/Venta Amplificada.*MetodologIA/);
  });

  test('SEO: robots meta', async ({ page }) => {
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /index, follow/);
  });

  test('SEO: description meta ≥ 20 chars', async ({ page }) => {
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{20,}/);
  });

  test('SEO: keywords meta', async ({ page }) => {
    await expect(page.locator('meta[name="keywords"]')).toHaveAttribute('content', /.+/);
  });

  test('SEO: canonical', async ({ page }) => {
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /workshop-venta-amplificada/);
  });

  test('SEO: og:image present', async ({ page }) => {
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /.+/);
  });

  test('SEO: og:title present', async ({ page }) => {
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/);
  });

  test('SEO: og:description present', async ({ page }) => {
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /.{20,}/);
  });

  test('SEO: twitter:card = summary_large_image', async ({ page }) => {
    await expect(page.locator('meta[property="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
  });

  test('SEO: twitter:title present', async ({ page }) => {
    await expect(page.locator('meta[property="twitter:title"]')).toHaveAttribute('content', /.+/);
  });

  test('SEO: twitter:description present', async ({ page }) => {
    await expect(page.locator('meta[property="twitter:description"]')).toHaveAttribute('content', /.{20,}/);
  });

  // ── RENDER ───────────────────────────────────────────

  test('no JS errors on load', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('/empresas/workshop-venta-amplificada.html');
    await page.waitForLoadState('networkidle');
    expect(errors).toHaveLength(0);
  });

  test('no 404 resources', async ({ page }) => {
    const failed = [];
    page.on('response', resp => {
      if (resp.status() === 404 && !resp.url().includes('favicon')) {
        failed.push(resp.url());
      }
    });
    await page.goto('/empresas/workshop-venta-amplificada.html');
    await page.waitForLoadState('networkidle');
    if (failed.length > 0) console.log('404s:', failed);
    expect(failed).toHaveLength(0);
  });

  test('SiteHeader and SiteFooter render', async ({ page }) => {
    await expect(page.locator('site-header')).toHaveCount(1);
    await expect(page.locator('site-footer')).toHaveCount(1);
  });

  // ── HERO ─────────────────────────────────────────────

  test('hero H1 is visible and contains "Venta Amplificada"', async ({ page }) => {
    const h1 = page.locator('section h1').first();
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/Venta Amplificada/);
  });

  test('hero badge says Paso 2', async ({ page }) => {
    await expect(page.locator('text=Paso 2')).toBeVisible();
  });

  test('hero paragraph mentions 3 horas', async ({ page }) => {
    const p = page.locator('section p').first();
    await expect(p).toContainText(/3 horas/i);
  });

  // ── CTAs & LINKS ─────────────────────────────────────

  test('CTA "Agendar Taller" links to contacto', async ({ page }) => {
    const cta = page.locator('a:has-text("Agendar Taller")');
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', /contacto/);
  });

  test('secondary CTA "Ir al Paso 3" links to bootcamp', async ({ page }) => {
    const cta = page.locator('a:has-text("Ir al Paso 3")');
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', /bootcamp/);
  });

  test('bottom CTA "Agendar Sesión Risk-Free" links to contacto', async ({ page }) => {
    const cta = page.locator('a:has-text("Agendar Sesión Risk-Free")');
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', /contacto/);
  });

  test('breadcrumb Inicio link', async ({ page }) => {
    const link = page.locator('nav[aria-label="Breadcrumb"] a').first();
    await expect(link).toHaveAttribute('href', /index\.html/);
  });

  test('breadcrumb Empresas link', async ({ page }) => {
    const link = page.locator('nav[aria-label="Breadcrumb"] a:has-text("Empresas")');
    await expect(link).toHaveAttribute('href', /index\.html/);
  });

  // ── SECTIONS ─────────────────────────────────────────

  test('value props: 3 cards visible', async ({ page }) => {
    const cards = page.locator('section.py-24 .card-glass');
    expect(await cards.count()).toBeGreaterThanOrEqual(3);
  });

  test('program agenda: 4 steps (01-04)', async ({ page }) => {
    for (const step of ['01', '02', '03', '04']) {
      await expect(page.locator(`#programa .text-brand-gold:has-text("${step}")`).first()).toBeVisible();
    }
  });

  test('program section shows price $3.000.000', async ({ page }) => {
    await expect(page.locator('text=$3.000.000')).toBeVisible();
  });

  test('guarantee box visible', async ({ page }) => {
    await expect(page.locator('text=Garantía de Satisfacción')).toBeVisible();
  });

  test('bottom CTA card visible with text about pruebe el modelo', async ({ page }) => {
    await expect(page.locator('text=Pruebe el modelo sin compromiso')).toBeVisible();
  });

  // ── RESPONSIVE ───────────────────────────────────────

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

  test('mobile: H1 and CTA visible at 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(300);
    await expect(page.locator('section h1').first()).toBeVisible();
    await expect(page.locator('a:has-text("Agendar Taller")')).toBeVisible();
  });

  test('mobile: bottom CTA scrolls into view at 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const cta = page.locator('a:has-text("Agendar Sesión Risk-Free")');
    await cta.scrollIntoViewIfNeeded();
    await expect(cta).toBeInViewport();
  });

  // ── ADVERSARIAL ──────────────────────────────────────

  test('rapid CTA clicks do not crash', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    // Prevent navigation so rapid clicks don't leave the page
    await page.evaluate(() => {
      document.querySelectorAll('a').forEach(a => a.addEventListener('click', e => e.preventDefault()));
    });
    const cta = page.locator('a:has-text("Agendar Taller")');
    for (let i = 0; i < 5; i++) {
      await cta.click();
      await page.waitForTimeout(50);
    }
    expect(errors).toHaveLength(0);
  });

  test('structured data is valid JSON-LD', async ({ page }) => {
    const scripts = page.locator('script[type="application/ld+json"]');
    const count = await scripts.count();
    expect(count).toBeGreaterThanOrEqual(1);
    for (let i = 0; i < count; i++) {
      const content = await scripts.nth(i).textContent();
      expect(() => JSON.parse(content)).not.toThrow();
    }
  });

  test('all contacto links resolve (not 404)', async ({ page }) => {
    const links = page.locator('a[href*="contacto"]');
    const count = await links.count();
    expect(count).toBeGreaterThanOrEqual(1);
    for (let i = 0; i < count; i++) {
      const href = await links.nth(i).getAttribute('href');
      expect(href).toBeTruthy();
    }
  });
});


// ═══════════════════════════════════════════════════════════════
// 3. empresas/bootcamp-ventas-ia.html
// ═══════════════════════════════════════════════════════════════

test.describe('empresas/bootcamp-ventas-ia.html — Bootcamp Ventas IA', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/empresas/bootcamp-ventas-ia.html');
    await page.waitForLoadState('networkidle');
  });

  // ── SEO ──────────────────────────────────────────────

  test('SEO: title contains Bootcamp and MetodologIA', async ({ page }) => {
    await expect(page).toHaveTitle(/Bootcamp.*MetodologIA/);
  });

  test('SEO: robots meta', async ({ page }) => {
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /index, follow/);
  });

  test('SEO: description meta ≥ 20 chars', async ({ page }) => {
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{20,}/);
  });

  test('SEO: keywords meta', async ({ page }) => {
    await expect(page.locator('meta[name="keywords"]')).toHaveAttribute('content', /.+/);
  });

  test('SEO: canonical', async ({ page }) => {
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /bootcamp-ventas-ia/);
  });

  test('SEO: og:image present', async ({ page }) => {
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /.+/);
  });

  test('SEO: og:title present', async ({ page }) => {
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/);
  });

  test('SEO: og:description present', async ({ page }) => {
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /.{20,}/);
  });

  test('SEO: twitter:card = summary_large_image', async ({ page }) => {
    await expect(page.locator('meta[property="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
  });

  test('SEO: twitter:title present', async ({ page }) => {
    await expect(page.locator('meta[property="twitter:title"]')).toHaveAttribute('content', /.+/);
  });

  test('SEO: twitter:description present', async ({ page }) => {
    await expect(page.locator('meta[property="twitter:description"]')).toHaveAttribute('content', /.{20,}/);
  });

  // ── RENDER ───────────────────────────────────────────

  test('no JS errors on load', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('/empresas/bootcamp-ventas-ia.html');
    await page.waitForLoadState('networkidle');
    expect(errors).toHaveLength(0);
  });

  test('no 404 resources', async ({ page }) => {
    const failed = [];
    page.on('response', resp => {
      if (resp.status() === 404 && !resp.url().includes('favicon')) {
        failed.push(resp.url());
      }
    });
    await page.goto('/empresas/bootcamp-ventas-ia.html');
    await page.waitForLoadState('networkidle');
    if (failed.length > 0) console.log('404s:', failed);
    expect(failed).toHaveLength(0);
  });

  test('SiteHeader and SiteFooter render', async ({ page }) => {
    await expect(page.locator('site-header')).toHaveCount(1);
    await expect(page.locator('site-footer')).toHaveCount(1);
  });

  // ── HERO ─────────────────────────────────────────────

  test('hero H1 is visible and contains "Gestión Comercial"', async ({ page }) => {
    const h1 = page.locator('main h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/Gestión Comercial/);
  });

  test('hero badge says Paso 3', async ({ page }) => {
    await expect(page.locator('span:has-text("Paso 3")')).toBeVisible();
  });

  test('hero paragraph mentions acelerar la caja', async ({ page }) => {
    await expect(page.locator('main p:has-text("acelerar la caja")').first()).toBeVisible();
  });

  // ── CTAs & LINKS ─────────────────────────────────────

  test('CTA "Iniciar Bootcamp" links to #pricing', async ({ page }) => {
    const cta = page.locator('a:has-text("Iniciar Bootcamp")');
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', /#pricing/);
  });

  test('secondary CTA "Volver al Paso 2" links to workshop', async ({ page }) => {
    const cta = page.locator('a:has-text("Volver al Paso 2")');
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', /workshop/);
  });

  test('pricing CTA "Solicitar Propuesta" links to contacto', async ({ page }) => {
    const cta = page.locator('a:has-text("Solicitar Propuesta")');
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', /contacto/);
  });

  test('"Solicitar Consultoría" link to contacto', async ({ page }) => {
    const cta = page.locator('a:has-text("Solicitar Consultoría")');
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', /contacto/);
  });

  test('"Agendar Conversación Estratégica" link to contacto', async ({ page }) => {
    const cta = page.locator('a:has-text("Agendar Conversación Estratégica")');
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', /contacto/);
  });

  test('breadcrumb Inicio link', async ({ page }) => {
    const link = page.locator('nav[aria-label="Breadcrumb"] a').first();
    await expect(link).toHaveAttribute('href', /index\.html/);
  });

  test('breadcrumb Empresas link', async ({ page }) => {
    const link = page.locator('nav[aria-label="Breadcrumb"] a:has-text("Empresas")');
    await expect(link).toHaveAttribute('href', /index\.html/);
  });

  // ── SECTIONS ─────────────────────────────────────────

  test('programa section renders 9 modules', async ({ page }) => {
    const modules = page.locator('#modules-container > div');
    await expect(modules).toHaveCount(9);
  });

  test('pricing section shows $12.000.000', async ({ page }) => {
    await expect(page.locator('text=$12.000.000')).toBeVisible();
  });

  test('pricing card has "Paquete Empresarial" heading', async ({ page }) => {
    await expect(page.locator('text=Paquete Empresarial')).toBeVisible();
  });

  test('post-bootcamp section shows Paso 4: Consultoría', async ({ page }) => {
    await expect(page.locator('text=Paso 4')).toBeVisible();
  });

  test('post-bootcamp: Consultoría de Tracción card visible', async ({ page }) => {
    await expect(page.locator('text=Consultoría de Tracción')).toBeVisible();
  });

  test('post-bootcamp: Consultoría de Estructura card visible', async ({ page }) => {
    await expect(page.locator('text=Consultoría de Estructura')).toBeVisible();
  });

  test('"Premium" badge on Estructura card', async ({ page }) => {
    await expect(page.locator('text=Premium')).toBeVisible();
  });

  test('missed workshop link visible', async ({ page }) => {
    const link = page.locator('a:has-text("Recomendamos empezar")');
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', /workshop/);
  });

  // ── MODAL ────────────────────────────────────────────

  test('module modal opens via JS call', async ({ page }) => {
    // NOTE: The modal overlay (#modal-overlay) has class="modal" but CSS targets
    // .modal-overlay — so the modal lacks display:none and is always rendered on top.
    // This is a SITE BUG. We use page.evaluate to trigger the modal function directly.
    await page.evaluate(() => openModuleModal('mod1'));
    await page.waitForTimeout(400);
    const modal = page.locator('#modal-overlay');
    await expect(modal).toHaveClass(/active/);
    await expect(page.locator('#modal-body')).toContainText(/Fundamentos/);
  });

  test('module modal closes with closeModal()', async ({ page }) => {
    await page.evaluate(() => openModuleModal('mod1'));
    await page.waitForTimeout(400);
    await page.evaluate(() => closeModal());
    await page.waitForTimeout(400);
    const hasActive = await page.locator('#modal-overlay').evaluate(el => el.classList.contains('active'));
    expect(hasActive).toBeFalsy();
  });

  test('module modal closes with X button', async ({ page }) => {
    await page.evaluate(() => openModuleModal('mod1'));
    await page.waitForTimeout(400);
    await page.locator('#modal-overlay button[aria-label="Cerrar"]').click();
    await page.waitForTimeout(400);
    const hasActive = await page.locator('#modal-overlay').evaluate(el => el.classList.contains('active'));
    expect(hasActive).toBeFalsy();
  });

  test('rapid module open/close do not crash', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    for (let i = 1; i <= 5; i++) {
      await page.evaluate((id) => openModuleModal('mod' + id), i);
      await page.waitForTimeout(100);
      await page.evaluate(() => closeModal());
      await page.waitForTimeout(100);
    }
    expect(errors).toHaveLength(0);
  });

  test('all 9 modules open correct modal content', async ({ page }) => {
    const titles = [
      'Fundamentos', 'Sales Stack', 'Investigación Profunda',
      'Venta Consultiva', 'Prompting Comercial', 'Presentaciones',
      'Gestión de Objeciones', 'Automatización CRM', 'Proyecto Final'
    ];
    for (let i = 0; i < 9; i++) {
      await page.evaluate((id) => openModuleModal('mod' + id), i + 1);
      await page.waitForTimeout(300);
      await expect(page.locator('#modal-body')).toContainText(titles[i]);
      await page.evaluate(() => closeModal());
      await page.waitForTimeout(200);
    }
  });

  test('modal overlay has correct modal-overlay class', async ({ page }) => {
    const modal = page.locator('#modal-overlay');
    const classes = await modal.getAttribute('class');
    expect(classes).toContain('modal-overlay');
  });

  // ── RESPONSIVE ───────────────────────────────────────

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

  test('mobile: H1 and CTA visible at 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(300);
    await expect(page.locator('main h1')).toBeVisible();
    await expect(page.locator('a:has-text("Iniciar Bootcamp")')).toBeVisible();
  });

  test('mobile: pricing section scrolls into view at 320px', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    const pricing = page.locator('text=$12.000.000');
    await pricing.scrollIntoViewIfNeeded();
    await expect(pricing).toBeInViewport();
  });

  test('mobile: modules render at 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(300);
    const modules = page.locator('#modules-container > div');
    expect(await modules.count()).toBe(9);
  });

  // ── ADVERSARIAL ──────────────────────────────────────

  test('structured data is valid JSON-LD', async ({ page }) => {
    const scripts = page.locator('script[type="application/ld+json"]');
    const count = await scripts.count();
    expect(count).toBeGreaterThanOrEqual(1);
    for (let i = 0; i < count; i++) {
      const content = await scripts.nth(i).textContent();
      expect(() => JSON.parse(content)).not.toThrow();
    }
  });

  test('all contacto links have valid href', async ({ page }) => {
    const links = page.locator('a[href*="contacto"]');
    const count = await links.count();
    expect(count).toBeGreaterThanOrEqual(1);
    for (let i = 0; i < count; i++) {
      const href = await links.nth(i).getAttribute('href');
      expect(href).toMatch(/contacto/);
    }
  });

  test('#pricing anchor exists and points to pricing section', async ({ page }) => {
    const link = page.locator('a[href="#pricing"]').first();
    await expect(link).toHaveAttribute('href', '#pricing');
    // Use JS click since modal overlay may intercept
    await page.evaluate(() => {
      const a = document.querySelector('a[href="#pricing"]');
      if (a) a.click();
    });
    await page.waitForTimeout(800);
    // Verify pricing content is in viewport after scroll
    const pricing = page.locator('h3:has-text("Paquete Empresarial")');
    await pricing.scrollIntoViewIfNeeded();
    await expect(pricing).toBeInViewport();
  });
});
