import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Services Page Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
    await homePage.closeCookieBanner();
    await homePage.licensingLink.click();
    await expect(page).toHaveURL(/.*services/);
  });

  test('should display What We Do Best heading', async ({ page }) => {
    const heading = page.getByRole('heading', { name: /what we do best/i });
    await expect(heading).toBeVisible();
  });

  test('should have License Inquiry button', async ({ page }) => {
    const licenseInquiryButton = page.getByRole('button', { name: /license inquiry/i });
    await expect(licenseInquiryButton).toBeVisible();
  });

  test('should display service categories', async ({ page }) => {
    const categories = page.getByRole('heading', { level: 2 });
    await expect(categories.first()).toBeVisible();
  });

  test('should have correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Services.*Sony Music Publishing/);
  });

  test('should display service descriptions', async ({ page }) => {
    const descriptions = page.getByText(/provides a full range of market leading services/i);
    await expect(descriptions.first()).toBeVisible();
  });
}); 