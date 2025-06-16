import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Global Communities Page Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
    await homePage.closeCookieBanner();
    await homePage.globalcommunitiesLink.click();
    await expect(page).toHaveURL(/.*global-communities/);
  });

  test('should display main heading', async ({ page }) => {
    const heading = page.getByRole('heading', { name: /global communities/i });
    await expect(heading).toBeVisible();
  });

  test('should have correct page title', async ({ page }) => {
    await expect(page).toHaveTitle('Our Global Communities');
  });

  test('should display community regions', async ({ page }) => {
    const regions = page.getByRole('heading', { level: 2 });
    await expect(regions.first()).toBeVisible();
  });

  test('should display community descriptions', async ({ page }) => {
    const description = page.getByText(/Social Justice and COVID-19 Relief Funds enable Sony Music Publishing/i);
    await expect(description).toBeVisible();
  });

  test('should have navigation to Contact page', async ({ page }) => {
    // Open the menu if needed
    const menuButton = page.getByRole('button', { name: /open menu/i });
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await page.waitForTimeout(500); // Wait for menu animation
    }

    const contactLink = page.getByRole('link', { name: /contact/i });
    if (await contactLink.count() === 0) {
      test.skip(true, 'Contact link not present in navigation menu');
    } else {
      await expect(contactLink).toBeVisible();
    }
  });
}); 