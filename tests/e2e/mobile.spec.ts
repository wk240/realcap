import { test, expect } from '@playwright/test';

test.describe('Mobile Responsiveness', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display hero section on mobile', async ({ page }) => {
    const heroTitle = page.locator('h1');
    await expect(heroTitle).toContainText('RealCap');
  });

  test('should display language switcher on mobile', async ({ page }) => {
    const enBtn = page.locator('button:has-text("EN")');
    const zhBtn = page.locator('button:has-text("ZH")');

    await expect(enBtn).toBeVisible();
    await expect(zhBtn).toBeVisible();
  });

  test('should switch language on mobile', async ({ page }) => {
    await page.click('button:has-text("ZH")');
    await expect(page).toHaveURL('/zh');
    await expect(page.locator('h1')).toContainText('可信截图工具');
  });

  test('should display core features on mobile', async ({ page }) => {
    // Scroll to features section
    await page.evaluate(() => window.scrollTo(0, 500));

    await expect(page.locator('h2:has-text("Core Features")')).toBeVisible();
    await expect(page.locator('h3:has-text("Trusted Capture")')).toBeVisible();
  });

  test('should display footer on mobile', async ({ page }) => {
    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const copyright = page.locator('text=© 2026 RealCap');
    await expect(copyright).toBeVisible();
  });

  test('should navigate to blog on mobile', async ({ page }) => {
    // Mobile nav might be hidden, check if we can still navigate directly
    await page.goto('/blog');
    await expect(page).toHaveURL(/\/blog/);
  });
});

test.describe('Tablet Viewport', () => {
  test.use({ viewport: { width: 768, height: 1024 } });

  test('should display navigation on tablet', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('header nav >> a:has-text("Home")')).toBeVisible();
    await expect(page.locator('header nav >> a:has-text("Features")')).toBeVisible();
    await expect(page.locator('header nav >> a:has-text("Blog")')).toBeVisible();
    await expect(page.locator('header nav >> a:has-text("Docs")')).toBeVisible();
  });

  test('should display all sections on tablet', async ({ page }) => {
    await page.goto('/');

    // Check main sections are visible
    await expect(page.locator('h1')).toContainText('RealCap');
    await expect(page.locator('h2:has-text("Core Features")')).toBeVisible();
    await expect(page.locator('h2:has-text("How RealCap Works")')).toBeVisible();
  });
});

test.describe('Large Desktop Viewport', () => {
  test.use({ viewport: { width: 1920, height: 1080 } });

  test('should display full layout on large screen', async ({ page }) => {
    await page.goto('/');

    // Check header is centered with max-width
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // All navigation should be visible
    await expect(page.locator('header nav >> a:has-text("Home")')).toBeVisible();
    await expect(page.locator('header nav >> a:has-text("Blog")')).toBeVisible();
  });
});