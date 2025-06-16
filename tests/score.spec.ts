import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Score Page Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
    await homePage.closeCookieBanner();
    await homePage.scoreLink.click();
    await expect(page).toHaveURL(/.*score/);
  });

  test('should have correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Sony Music Publishing.*SCORE/);
  });

  test('should display main heading', async ({ page }) => {
    const scoreText = page.getByText('SCORE', { exact: true });
    await expect(scoreText).toBeVisible();
  });

  test('should have login functionality', async ({ page }) => {
    const loginButton = page.getByRole('button', { name: /login/i });
    await expect(loginButton).toBeVisible();
  });

  test('should have navigation back to main site', async ({ page }) => {
    const logo = page.getByRole('img', { name: 'Sony Music Publishing Logo' });
    await expect(logo).toBeVisible();
  });

  test('should display login form elements', async ({ page }) => {
    const userIdInput = page.getByLabel('Enter your User ID');
    const passwordInput = page.getByLabel('Password');
    const rememberMe = page.getByText('Remember me');
    
    await expect(userIdInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(rememberMe).toBeVisible();
  });
}); 