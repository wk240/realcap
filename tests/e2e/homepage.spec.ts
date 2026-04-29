import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display hero section with correct content', async ({ page }) => {
    // Check hero title using h1
    const heroTitle = page.locator('h1');
    await expect(heroTitle).toContainText('RealCap');
    await expect(heroTitle).toContainText('Trusted Screenshot Tool');

    // Check subtitle - use the specific paragraph in hero section
    const subtitle = page.locator('section >> p').first();
    await expect(subtitle).toContainText('Prevent AI Forgery');

    // Check CTA buttons
    const downloadBtn = page.locator('button:has-text("Download"), a:has-text("Download")').first();
    await expect(downloadBtn).toBeVisible();

    const learnMoreBtn = page.locator('button:has-text("Learn More"), a:has-text("Learn More")').first();
    await expect(learnMoreBtn).toBeVisible();
  });

  test('should display header with navigation', async ({ page }) => {
    // Check logo - it's a styled "R" + "RealCap" text
    const logo = page.locator('header >> a:has-text("RealCap")');
    await expect(logo).toBeVisible();

    // Check navigation links
    await expect(page.locator('header nav >> a:has-text("Home")')).toBeVisible();
    await expect(page.locator('header nav >> a:has-text("Features")')).toBeVisible();
    await expect(page.locator('header nav >> a:has-text("Blog")')).toBeVisible();
    await expect(page.locator('header nav >> a:has-text("Docs")')).toBeVisible();
  });

  test('should display trust problem section', async ({ page }) => {
    const sectionTitle = page.locator('h2:has-text("Growing Threat")');
    await expect(sectionTitle).toBeVisible();
  });

  test('should display how it works section with 4 steps', async ({ page }) => {
    const sectionTitle = page.locator('h2:has-text("How RealCap Works")');
    await expect(sectionTitle).toBeVisible();

    // Check all 4 steps with exact matching to avoid "Trusted Capture" matching "Capture"
    await expect(page.getByRole('heading', { name: 'Capture', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Process', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Verify', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Share', exact: true })).toBeVisible();
  });

  test('should display core features section', async ({ page }) => {
    const sectionTitle = page.locator('h2:has-text("Core Features")');
    await expect(sectionTitle).toBeVisible();

    // Check feature cards using h3
    await expect(page.locator('h3:has-text("Trusted Capture")')).toBeVisible();
    await expect(page.locator('h3:has-text("AI Detection")')).toBeVisible();
    await expect(page.locator('h3:has-text("Verification API")')).toBeVisible();
    await expect(page.locator('h3:has-text("Cross-Platform")')).toBeVisible();
  });

  test('should display target industries section', async ({ page }) => {
    const sectionTitle = page.locator('h2:has-text("Industries")');
    await expect(sectionTitle).toBeVisible();
  });

  test('should display use cases section', async ({ page }) => {
    const sectionTitle = page.locator('h2:has-text("Use Cases")');
    await expect(sectionTitle).toBeVisible();
  });

  test('should display data stats section', async ({ page }) => {
    const sectionTitle = page.locator('h2:has-text("Real Impact")');
    await expect(sectionTitle).toBeVisible();

    // Check stats labels
    await expect(page.locator('text=Active Users')).toBeVisible();
    await expect(page.locator('text=Verifications')).toBeVisible();
    await expect(page.locator('text=Detection Accuracy')).toBeVisible();
  });

  test('should display FAQ preview section', async ({ page }) => {
    const sectionTitle = page.locator('h2:has-text("Common Questions")');
    await expect(sectionTitle).toBeVisible();
  });

  test('should display bottom CTA section', async ({ page }) => {
    const sectionTitle = page.locator('h2:has-text("Preventing Screenshot Fraud")');
    await expect(sectionTitle).toBeVisible();
  });

  test('should display footer', async ({ page }) => {
    // Check footer links
    await expect(page.locator('footer >> a:has-text("Privacy Policy")')).toBeVisible();
    await expect(page.locator('footer >> a:has-text("Terms of Use")')).toBeVisible();
    await expect(page.locator('footer >> a:has-text("About Us")')).toBeVisible();
    await expect(page.locator('footer >> a:has-text("FAQ")')).toBeVisible();

    // Check copyright
    const copyright = page.locator('footer >> text=© 2026 RealCap');
    await expect(copyright).toBeVisible();
  });
});