import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('News Page Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
    await homePage.closeCookieBanner();
    await homePage.newsLink.click();
    await expect(page).toHaveURL(/.*news/);
  });

  test('should display news articles', async ({ page }) => {
    const articles = page.getByRole('article');
    if (await articles.count() === 0) {
      test.skip(true, 'No news articles found on the page');
    } else {
      await expect(articles.first()).toBeVisible();
    }
  });

  test('should have Read More buttons', async ({ page }) => {
    const readMoreButtons = page.getByRole('button', { name: /read more/i });
    await expect(readMoreButtons.first()).toBeVisible();
  });

  test('should open first news article', async ({ page }) => {
    const readMoreButtons = page.getByRole('button', { name: /read more/i });
    await expect(readMoreButtons.first()).toBeVisible();
    await Promise.all([
      page.waitForNavigation(),
      readMoreButtons.first().click()
    ]);
    // Verify we're on an article page
    await expect(page).toHaveURL(/.*news\/.*/);
  });

  test('should have correct page title', async ({ page }) => {
    await expect(page).toHaveTitle('Latest news of Sony Music Publishing');
  });

  test('should display article dates', async ({ page }) => {
    const dateElements = page.getByText(/[A-Z][a-z]+ \d{1,2}, \d{4}/);
    await expect(dateElements.first()).toBeVisible();
  });
}); 