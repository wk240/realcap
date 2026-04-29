import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to blog page', async ({ page }) => {
    await page.click('header nav >> a:has-text("Blog")');
    await expect(page).toHaveURL(/\/blog/);
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });

  test('should navigate to docs page', async ({ page }) => {
    await page.click('header nav >> a:has-text("Docs")');
    await expect(page).toHaveURL(/\/docs/);
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });

  test('should navigate to features section via anchor link', async ({ page }) => {
    await page.click('header nav >> a:has-text("Features")');
    // Should scroll to features section
    await expect(page.locator('h2:has-text("Core Features")')).toBeVisible();
  });

  test('should navigate to pricing page from bottom CTA', async ({ page }) => {
    await page.click('a:has-text("View Pricing")');
    await expect(page).toHaveURL(/\/pricing/);
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });

  test('should navigate to FAQ page', async ({ page }) => {
    await page.click('footer >> a:has-text("FAQ")');
    await expect(page).toHaveURL(/\/faq/);
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });

  test('should navigate to privacy page', async ({ page }) => {
    await page.click('footer >> a:has-text("Privacy Policy")');
    await expect(page).toHaveURL(/\/privacy/);
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });

  test('should navigate to terms page', async ({ page }) => {
    await page.click('footer >> a:has-text("Terms of Use")');
    await expect(page).toHaveURL(/\/terms/);
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });

  test('should navigate to about page', async ({ page }) => {
    await page.click('footer >> a:has-text("About Us")');
    await expect(page).toHaveURL(/\/about/);
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });

  test('should return to homepage from other pages', async ({ page }) => {
    // Navigate away
    await page.click('header nav >> a:has-text("Blog")');
    await expect(page).toHaveURL(/\/blog/);

    // Return via logo
    await page.click('header >> a:has-text("RealCap")');
    await expect(page).toHaveURL(/\/$/);
  });
});

test.describe('Blog Navigation', () => {
  test('should display blog page', async ({ page }) => {
    await page.goto('/blog');
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });

  test('should navigate to blog article', async ({ page }) => {
    await page.goto('/blog');
    // Find first article link that's not a category link
    const articleLink = page.locator('a[href*="/blog/"]').first();
    if (await articleLink.isVisible()) {
      await articleLink.click();
      await expect(page).toHaveURL(/\/blog\/[^/]+\/[^/]+/);
    }
  });
});

test.describe('FAQ Navigation', () => {
  test('should display FAQ page', async ({ page }) => {
    await page.goto('/faq');
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });
});

test.describe('Solutions Navigation', () => {
  test('should display solutions page', async ({ page }) => {
    await page.goto('/solutions');
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });
});

test.describe('Compare Navigation', () => {
  test('should display compare page', async ({ page }) => {
    await page.goto('/compare');
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });
});