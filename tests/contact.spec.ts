import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Contact Page Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
    await homePage.closeCookieBanner();
    await homePage.contactLink.click();
    await expect(page).toHaveURL(/.*contact/);
  });

  test('should display Contact Us heading', async ({ page }) => {
    const heading = page.getByRole('heading', { name: /contact us/i });
    await expect(heading).toBeVisible();
  });

  test('should display email link', async ({ page }) => {
    const emailLink = page.getByRole('link', { name: /info@sonymusicpub.com/i });
    await expect(emailLink).toBeVisible();
  });

  test('should have Select Another Office button', async ({ page }) => {
    const selectOfficeButton = page.getByRole('button', { name: /select another office/i });
    await expect(selectOfficeButton).toBeVisible();
  });

  test('should display office location', async ({ page }) => {
    const locationButton = page.locator('#main_content button', { hasText: 'USA (New York)' });
    await expect(locationButton).toBeVisible();
  });

  test('should have correct page title', async ({ page }) => {
    await expect(page).toHaveTitle('Contact');
  });
}); 