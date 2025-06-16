import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('About Page Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
    await homePage.closeCookieBanner();
    await homePage.aboutLink.click();
    await expect(page).toHaveURL(/.*about/);
  });

  test('should display Learn More button', async ({ page }) => {
    const learnMoreButton = page.getByRole('button', { name: /learn more/i });
    await expect(learnMoreButton).toBeVisible();
  });

  test('should have correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/About.*Sony Music Publishing/);
  });

  test('should have main heading', async ({ page }) => {
    const heading = page.getByRole('heading', { name: /about/i });
    await expect(heading).toBeVisible();
  });

  test('should have company description', async ({ page }) => {
    const description = page.getByText(/is the #1 global music publisher, dedicated to advancing the artistry/i);
    await expect(description).toBeVisible();
  });
}); 