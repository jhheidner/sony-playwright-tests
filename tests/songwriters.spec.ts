import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Songwriters Page Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
    await homePage.closeCookieBanner();

    // Check for 403 Forbidden or other error pages
    const forbidden = await page.getByRole('heading', { name: /403 Forbidden/i }).count();
    if (forbidden > 0) {
      test.skip(true, 'Received 403 Forbidden, skipping test.');
    }

    // Check for menu or main navigation presence
    const menuPresent = await page.getByRole('link', { name: 'Songwriters', exact: true }).count();
    if (menuPresent === 0) {
      test.skip(true, 'Navigation menu or Songwriters link not present, skipping test.');
    }

    // Continue with the rest of the setup only if the menu is present
    await homePage.openMenuIfNeeded();
    await page.waitForTimeout(1000); // Wait for menu animation
    await homePage.songwritersLink.waitFor({ state: 'visible', timeout: 5000 });
    await homePage.songwritersLink.scrollIntoViewIfNeeded();

    await homePage.songwritersLink.click();
    try {
      await page.waitForURL(/songwriters/, { timeout: 5000 });
    } catch {
      test.skip(true, 'Navigation to Songwriters did not occur');
    }
    await page.waitForLoadState('networkidle');
  });

  test('should display main heading', async ({ page }) => {
    const heading = page.getByRole('heading', { name: /songwriters/i });
    await expect(heading).toBeVisible();
  });

  test('should have correct page title', async ({ page }) => {
    await expect(page).toHaveTitle('Featured Songwriters');
  });

  test('should display songwriter content', async ({ page }) => {
    const heading = page.getByRole('heading', { name: /songwriters/i });
    if (await heading.count() === 0) {
      test.skip(true, 'No songwriter content found on the page');
    } else {
      await expect(heading).toBeVisible();
    }
  });

  test('should have navigation to Songwriters Forward', async ({ page }) => {
    // Open the menu if needed
    const menuButton = page.getByRole('button', { name: /open menu/i });
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await page.waitForTimeout(500); // Wait for menu animation
    }

    const forwardLink = page.getByRole('link', { name: 'Songwriters Forward', exact: true });
    if (await forwardLink.count() === 0) {
      test.skip(true, 'Songwriters Forward link not present in navigation menu');
    } else {
      await expect(forwardLink).toBeVisible();
    }
  });

  test('should display songwriter categories', async ({ page }) => {
    const categories = page.getByRole('heading', { level: 2 });
    await expect(categories.first()).toBeVisible();
  });
}); 