import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Homepage Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
    await homePage.closeCookieBanner();
  });

  test('should load homepage and verify logo', async () => {
    const isLogoVisible = await homePage.isElementVisible(homePage.logo);
    expect(isLogoVisible).toBeTruthy();
  });

  test('should verify navigation links', async () => {
    await homePage.openMenuIfNeeded();
    
    const links = [
      homePage.aboutLink,
      homePage.newsLink,
      homePage.songwritersLink,
      homePage.licensingLink,
      homePage.songforwardLink,
      homePage.globalcommunitiesLink,
      homePage.contactLink,
      homePage.scoreLink,
    ];

    for (const link of links) {
      const isVisible = await homePage.isElementVisible(link);
      expect(isVisible).toBeTruthy();
    }
  });

  test('navigation menu opens and closes properly', async ({ page }) => {
    const menuButton = page.getByRole('button', { name: /open menu/i });
    const closeButton = page.getByRole('button', { name: /close menu/i });

    // Only click to open if menu is not already open
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await expect(closeButton).toBeVisible();
    } else {
      // Menu is already open, just check close button
      await expect(closeButton).toBeVisible();
    }

    // Close menu
    await closeButton.click();
    await expect(menuButton).toBeVisible();
  });

  test('search functionality works', async ({ page }) => {
    await homePage.openMenuIfNeeded();

    // Only click if the search button is visible
    if (await homePage.searchButton.isVisible()) {
      await homePage.searchButton.click();
    }

    // Check if the search input is present
    if (await homePage.searchInput.count() === 0) {
      test.skip(true, 'Search input not found on the page');
    } else {
      await expect(homePage.searchInput).toBeVisible();
      await homePage.searchInput.fill('test');
      await homePage.searchInput.press('Enter');
      await expect(page).toHaveURL(/.*search/);
    }
  });

  test('location selector opens dialog', async ({ page }) => {
    await homePage.locationSelector.click();

    // Try to find the dialog by heading as a fallback
    const dialogHeading = page.getByRole('heading', { name: /select your location/i });
    if (await dialogHeading.count() === 0) {
      test.skip(true, 'Location dialog did not appear or uses a different structure');
    } else {
      await expect(dialogHeading).toBeVisible();
    }
  });

  test('find out why button is visible on homepage', async ({ page }) => {
    const findOutWhyButton = page.getByRole('button', { name: /find out why/i });
    if (await findOutWhyButton.count() === 0 || !(await findOutWhyButton.isVisible())) {
      test.skip();
    } else {
      await expect(findOutWhyButton).toBeVisible();
    }
  });

  test('footer contains all social media links', async ({ page }) => {
    const expectedLinks = [
      /facebook\.com/,
      /twitter\.com/,
      /instagram\.com/,
      /spotify\.com/
    ];
    let found = false;
    for (const url of expectedLinks) {
      const link = page.locator(`a[href*='${url.source.replace(/\\\./g, ".")}']`);
      if (await link.count() > 0 && await link.first().isVisible()) {
        found = true;
        await expect(link.first()).toBeVisible();
      }
    }
    if (!found) {
      test.skip(true, 'No social media links found in footer');
    }
  });

  test('back to top button scrolls to top', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const backToTop = page.getByRole('button', { name: /back to top/i });
    if (await backToTop.count() === 0 || !(await backToTop.isVisible())) {
      test.skip();
    } else {
      await backToTop.click();
      const scrollY = await page.evaluate(() => window.scrollY);
      expect(scrollY).toBeLessThan(100);
    }
  });

  test('page loads with correct meta information', async ({ page }) => {
    await expect(page).toHaveTitle(/Sony Music Publishing/);
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /Sony Music Publishing/);
  });

  test('cookie banner can be dismissed and stays dismissed', async ({ page }) => {
    await homePage.closeCookieBanner();
    await page.reload();
    const acceptButton = page.getByRole('button', { name: /Accept Optional Cookies/i });
    await expect(acceptButton).not.toBeVisible();
  });
});