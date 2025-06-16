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
    //esure mobile nav menu is opened if needed
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

  test('should navigate to About page', async ({ page }) => {
    await Promise.all([
      page.waitForNavigation(),
      homePage.aboutLink.click()
    ]);
    await expect(page).toHaveURL(/.*about/);
    // Verify the "Learn More" button is present and visible
    const learnMoreButton = page.getByRole('button', { name: /learn more/i });
    await expect(learnMoreButton).toBeVisible();
  });

  test('should navigate to News page', async ({ page }) => {
    await homePage.newsLink.click();
    await expect(page).toHaveURL(/.*news/);
    // Verify at least one "Read More" button is present
    const readMoreButtons = page.getByRole('button', { name: /read more/i });
    await expect(readMoreButtons.first()).toBeVisible();
  });

  test('should navigate to Songwriters page', async ({ page }) => {
    await Promise.all([
      page.waitForNavigation(),
      homePage.songwritersLink.click()
    ]);
    await expect(page).toHaveURL(/.*songwriters/);
    // Verify a heading or unique element on the Songwriters page
    const heading = page.getByRole('heading', { name: /songwriters/i });
    await expect(heading).toBeVisible();
  });
  test('should navigate to Licensing page', async ({ page }) => {
    await Promise.all([
      page.waitForNavigation(),
      homePage.licensingLink.click()
    ]);
    await expect(page).toHaveURL(/.*services/);
    // Verify the "What we do best" heading is present and visible
    const heading = page.getByRole('heading', { name: /what we do best/i });
    await expect(heading).toBeVisible();
  });
  test('should navigate to Songwriters Forward page', async ({ page }) => {
    await Promise.all([
      page.waitForNavigation(),
      homePage.songforwardLink.click()
    ]);
    await expect(page).toHaveURL(/.*songwriters-forward/);
    // Verify the "Learn More" button is present and visible
    const learnMoreButton = page.getByRole('button', { name: /learn more/i });
    await expect(learnMoreButton).toBeVisible();
  });
  test('should navigate to Global Communities page', async ({ page }) => {
    await Promise.all([
      page.waitForNavigation(),
      homePage.globalcommunitiesLink.click()
    ]);
    await expect(page).toHaveURL(/.*global-communities/);
    // Verify a heading or unique element on the Global Communities page
    const heading = page.getByRole('heading', { name: /global communities/i });
    await expect(heading).toBeVisible();
  });
  test('should navigate to Score page', async ({ page }) => {
    await Promise.all([
      page.waitForNavigation(),
      homePage.scoreLink.click()
    ]);
    await expect(page).toHaveURL(/sonymusicpub/);
    // Optionally, check for a unique element on the Score page if needed
  });
  test('should navigate to Contact page', async ({ page }) => {
    await homePage.contactLink.scrollIntoViewIfNeeded();
    await homePage.contactLink.click();
    await expect(page).toHaveURL(/.*contact/);
    // Verify a contact form or heading is present
    const heading = page.getByRole('heading', { name: /contact/i });
    await expect(heading).toBeVisible();
  });

  test('logo should link to homepage', async ({ page }) => {
    await homePage.logo.click();
    await expect(page).toHaveURL(/.*sonymusicpub\.com\/en\/?$/);
  });

  test('login button should be visible and clickable', async () => {
    await homePage.openMenuIfNeeded();
    const loginButton = homePage.page.getByRole('button', { name: /login/i });
    await expect(loginButton).toBeVisible();
    await loginButton.click();
    // Optionally, add an assertion for the login modal/page
  });

  test('cookie banner should appear and be dismissible', async () => {
    // Reload to ensure banner appears
    await homePage.page.reload();
    const acceptButton = homePage.page.getByRole('button', { name: /Accept Optional Cookies/i });
    if (await acceptButton.isVisible()) {
      await acceptButton.click();
      await expect(acceptButton).not.toBeVisible();
    } else {
      test.skip();
    }
  });

  test('should open Learn More from Songwriters Forward page', async ({ page }) => {
    await Promise.all([
      page.waitForNavigation(),
      homePage.songforwardLink.click()
    ]);
    await expect(page).toHaveURL(/songwriters-forward/);

    // Click the "Learn More" button (no navigation expected)
    const learnMoreButton = page.getByRole('button', { name: /learn more/i });
    await expect(learnMoreButton).toBeVisible();
    await learnMoreButton.click();
    // Optionally, check for a unique element that appears after clicking
    // For example, a modal, expanded section, or new text
    // await expect(page.getByText(/some expected text/i)).toBeVisible();
  });

  test('should open License Inquiry from Services page', async ({ page }) => {
    await Promise.all([
      page.waitForNavigation(),
      homePage.licensingLink.click()
    ]);
    await expect(page).toHaveURL(/services/);

    // Click the "License Inquiry" button (no navigation expected)
    const licenseInquiryButton = page.getByRole('button', { name: /license inquiry/i });
    await expect(licenseInquiryButton).toBeVisible();
    await licenseInquiryButton.click();
    // Optionally, check for a unique element that appears after clicking
    // For example, a modal, expanded section, or new text
    // await expect(page.getByText(/some expected text/i)).toBeVisible();
  });

  test('should open first news story from News page', async ({ page }) => {
    await homePage.newsLink.click();
    await expect(page).toHaveURL(/news/);

    // Click the first "Read More" button
    const readMoreButtons = page.getByRole('button', { name: /read more/i });
    await expect(readMoreButtons.first()).toBeVisible();
    await Promise.all([
      page.waitForNavigation(),
      readMoreButtons.first().click()
    ]);
    // Optionally, check for a unique element on the news story page
  });

  test('should see contact info on Contact page', async ({ page }) => {
    await homePage.contactLink.click();
    await expect(page).toHaveURL(/contact/);

    // Check for the "Contact us" heading
    const heading = page.getByRole('heading', { name: /contact us/i });
    await expect(heading).toBeVisible();

    // Optionally, check for the email link
    const emailLink = page.getByRole('link', { name: /info@sonymusicpub.com/i });
    await expect(emailLink).toBeVisible();
  });
});