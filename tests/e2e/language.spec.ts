import { test, expect } from '@playwright/test';

test.describe('Language Switching', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display language switcher buttons', async ({ page }) => {
    const enBtn = page.locator('button:has-text("EN")');
    const zhBtn = page.locator('button:has-text("ZH")');

    await expect(enBtn).toBeVisible();
    await expect(zhBtn).toBeVisible();
  });

  test('should have English as default active language', async ({ page }) => {
    const enBtn = page.locator('button:has-text("EN")');
    await expect(enBtn).toHaveClass(/bg-blue-600/);
  });

  test('should switch to Chinese language', async ({ page }) => {
    // Click Chinese button
    await page.click('button:has-text("ZH")');

    // URL should change to /zh (may have trailing slash)
    await expect(page).toHaveURL(/\/zh\/?$/, { timeout: 10000 });

    // Wait for page to load Chinese content
    await expect(page.locator('h1')).toContainText('可信截图工具', { timeout: 10000 });
  });

  test('should switch back to English from Chinese', async ({ page }) => {
    // First switch to Chinese
    await page.click('button:has-text("ZH")');
    await expect(page).toHaveURL(/\/zh\/?$/, { timeout: 10000 });

    // Wait for Chinese content
    await expect(page.locator('h1')).toContainText('可信截图工具', { timeout: 10000 });

    // Then switch back to English
    await page.click('button:has-text("EN")');
    await expect(page).toHaveURL(/\/en\/?$/, { timeout: 10000 });
  });

  test('should maintain Chinese language across page navigation', async ({ page }) => {
    // Switch to Chinese
    await page.click('button:has-text("ZH")');
    await expect(page).toHaveURL(/\/zh\/?$/, { timeout: 10000 });

    // Wait for Chinese content and button to be active
    await expect(page.locator('button:has-text("ZH")')).toHaveClass(/bg-blue-600/, { timeout: 10000 });

    // Navigate to blog using Chinese nav
    await page.click('header nav >> a:has-text("博客")');
    await expect(page).toHaveURL(/\/zh\/blog/, { timeout: 10000 });
  });

  test('should display Chinese navigation labels', async ({ page }) => {
    await page.goto('/zh');

    // Wait for page to load
    await expect(page.locator('h1')).toContainText('可信截图工具', { timeout: 10000 });

    // Check Chinese navigation labels
    await expect(page.locator('header nav >> a:has-text("首页")')).toBeVisible();
    await expect(page.locator('header nav >> a:has-text("功能")')).toBeVisible();
    await expect(page.locator('header nav >> a:has-text("博客")')).toBeVisible();
  });

  test('should display Chinese hero content', async ({ page }) => {
    await page.goto('/zh');

    // Wait for page to load
    await expect(page.locator('h1')).toContainText('可信截图工具', { timeout: 10000 });

    // Check subtitle contains Chinese text
    const subtitle = page.locator('section >> p').first();
    await expect(subtitle).toContainText('防止AI伪造', { timeout: 10000 });
  });

  test('should display Chinese footer', async ({ page }) => {
    await page.goto('/zh');

    // Wait for page to load
    await expect(page.locator('h1')).toContainText('可信截图工具', { timeout: 10000 });

    // Check Chinese footer labels
    await expect(page.locator('footer >> a:has-text("隐私政策")')).toBeVisible();
    await expect(page.locator('footer >> a:has-text("使用条款")')).toBeVisible();
    await expect(page.locator('footer >> a:has-text("关于我们")')).toBeVisible();
  });
});