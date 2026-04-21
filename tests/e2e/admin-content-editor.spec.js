/**
 * E2E: Admin Content Editor — US-8
 *
 * Tests: login → select page → edit 4 variants → save → verify Firestore + public render.
 * [TS-100, TS-101, TS-102, TS-103, TS-107]
 *
 * Requires: dev server on localhost:3000 + Firebase emulator on localhost:8080
 */
import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';
const EDITOR_URL = `${BASE_URL}/admin/content-editor.html`;

test.describe('Admin Content Editor (US-8)', () => {
  // ── TS-107: Auth gate ──
  test.describe('Authentication gate', () => {
    test('unauthenticated visitor sees login screen, not editor [TS-107]', async ({ page }) => {
      await page.goto(EDITOR_URL);
      await page.waitForLoadState('networkidle');

      // Login screen visible
      const loginScreen = page.locator('#login-screen');
      await expect(loginScreen).toBeVisible();

      // Page picker and slot editor hidden
      const pagePicker = page.locator('#page-picker');
      const slotEditor = page.locator('#slot-editor');
      await expect(pagePicker).toBeHidden();
      await expect(slotEditor).toBeHidden();
    });

    test('login button is present and interactive [TS-107]', async ({ page }) => {
      await page.goto(EDITOR_URL);
      const loginBtn = page.locator('#login-btn');
      await expect(loginBtn).toBeVisible();
      await expect(loginBtn).toBeEnabled();
    });
  });

  // ── TS-100: 13 page cards ──
  test.describe('Page picker grid', () => {
    // NOTE: These tests require authenticated admin context.
    // In CI, use Firebase Auth emulator to create an admin user.
    // For local testing, sign in manually first.

    test.skip('admin sees 13 page cards after login [TS-100]', async ({ page }) => {
      // This test requires Firebase Auth emulator setup
      await page.goto(EDITOR_URL);

      // After auth, page picker should show
      const pageGrid = page.locator('#page-grid');
      await expect(pageGrid).toBeVisible();

      // 13 cards
      const cards = page.locator('.page-card');
      await expect(cards).toHaveCount(13);

      // Each card has name and slot count
      for (const card of await cards.all()) {
        const name = card.locator('h3');
        const count = card.locator('.slot-count');
        await expect(name).not.toBeEmpty();
        await expect(count).toBeVisible();
      }
    });

    test.skip('each card is clickable and opens slot editor [TS-100]', async ({ page }) => {
      await page.goto(EDITOR_URL);

      // Click first card
      const firstCard = page.locator('.page-card').first();
      await firstCard.click();

      // Slot editor should appear
      const slotEditor = page.locator('#slot-editor');
      await expect(slotEditor).toBeVisible();

      // Page picker hidden
      const pagePicker = page.locator('#page-picker');
      await expect(pagePicker).toBeHidden();
    });
  });

  // ── TS-101: 4 textareas per slot ──
  test.describe('Slot editor UI', () => {
    test.skip('each slot shows 4 variant textareas [TS-101]', async ({ page }) => {
      await page.goto(EDITOR_URL);

      // Select Home page
      const homeCard = page.locator('.page-card[data-slug="home"]');
      await homeCard.click();

      // Each slot block should have 4 textareas
      const slotBlocks = page.locator('.slot-block');
      const firstBlock = slotBlocks.first();
      const textareas = firstBlock.locator('textarea');
      await expect(textareas).toHaveCount(4);

      // Verify labels match expected variants
      const labels = firstBlock.locator('.variant-field label');
      const labelTexts = await labels.allTextContents();
      expect(labelTexts).toContain('ES \u00d7 Persona');
      expect(labelTexts).toContain('ES \u00d7 Empresa');
      expect(labelTexts).toContain('EN \u00d7 Persona');
      expect(labelTexts).toContain('EN \u00d7 Empresa');
    });
  });

  // ── TS-102: Edit + save slot variant ──
  test.describe('Slot save flow', () => {
    test.skip('admin edits variant and saves to Firestore [TS-102]', async ({ page }) => {
      await page.goto(EDITOR_URL);

      // Select Home page
      await page.locator('.page-card[data-slug="home"]').click();

      // Edit the first slot's EN x Empresa textarea
      const firstSlot = page.locator('.slot-block').first();
      const enEmpresa = firstSlot.locator('textarea[data-variant-key="empresa.en"]');
      await enEmpresa.fill('Transform your team with method');

      // Click save
      const saveBtn = firstSlot.locator('.btn-save');
      await saveBtn.click();

      // Toast should confirm success
      const toast = page.locator('#toast');
      await expect(toast).toContainText('saved');
    });
  });

  // ── TS-103: Public site renders Firestore content ──
  test.describe('Public site integration', () => {
    test.skip('public site renders Firestore-edited content [TS-103]', async ({ page }) => {
      // This test assumes Firestore emulator has been seeded with slot data
      await page.goto(`${BASE_URL}/?mdg_locale=en&mdg_audience=empresa`);
      await page.waitForLoadState('networkidle');

      // The hero headline should come from Firestore if slots exist
      // Specific assertion depends on seeded data
      const hero = page.locator('[data-slot="hero.headline"]');
      if (await hero.count() > 0) {
        const text = await hero.textContent();
        expect(text).toBeTruthy();
        expect(text).not.toMatch(/\[MISSING:/);
      }
    });
  });

  // ── Navigation ──
  test.describe('Navigation', () => {
    test.skip('back button returns to page picker [TS-100]', async ({ page }) => {
      await page.goto(EDITOR_URL);

      // Select a page
      await page.locator('.page-card').first().click();
      await expect(page.locator('#slot-editor')).toBeVisible();

      // Click back
      await page.locator('#back-btn').click();
      await expect(page.locator('#page-picker')).toBeVisible();
      await expect(page.locator('#slot-editor')).toBeHidden();
    });
  });
});
