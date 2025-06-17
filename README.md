# Sony Music Publishing Playwright Test Suite

This project contains a comprehensive Playwright test suite for the Sony Music Publishing website, following best practices for selector accuracy, navigation, in-page verification, and handling dynamic UI elements.

## Page Object Model Structure
- Each major page has its own page object class in the `pages/` directory (e.g., `HomePage.ts`, `AboutPage.ts`, `NewsPage.ts`, etc.).
- Page objects encapsulate selectors and actions for their respective pages, improving maintainability and scalability.

## Test Coverage

### Homepage
- Loads homepage and verifies logo
- Verifies navigation links
- Navigation menu opens and closes properly
- Search functionality works
- Location selector opens dialog
- "Find out why" button is visible (if present)
- Footer contains all social media links (if present)
- "Back to top" button scrolls to top (if present)
- Page loads with correct meta information
- Cookie banner can be dismissed and stays dismissed

### About Page
- Displays "Learn More" button
- Has correct page title
- Has main heading
- Has company description

### News Page
- Displays news articles (if present)
- Has "Read More" buttons
- Opens first news article
- Has correct page title
- Displays article dates

### Services Page
- Displays "What We Do Best" heading
- Has "License Inquiry" button
- Displays service categories
- Has correct page title
- Displays service descriptions

### Contact Page
- Displays "Contact Us" heading
- Displays email link
- Has "Select Another Office" button
- Displays office location
- Has correct page title

### Songwriters Page
- Displays main heading
- Has correct page title
- Displays songwriter content (if present)
- Has navigation to Songwriters Forward (if present)
- Displays songwriter categories

### Songwriters Forward Page
- Displays "Learn More" button
- Has correct page title
- Displays main heading
- Displays initiative description
- Has navigation back to Songwriters (if present)

### Global Communities Page
- Displays main heading
- Has correct page title
- Displays community regions
- Displays community descriptions
- Has navigation to Contact page (if present)

### Score Page
- Displays main heading
- Has login button
- Displays logo

## Performance Audits with Lighthouse

This project includes scripts to run [Lighthouse](https://developers.google.com/web/tools/lighthouse) performance audits:

- **lighthouse-audit.js**: Runs a Lighthouse performance audit on the homepage (or a specified URL) and outputs an HTML report.
- **pw-lighthouse.js**: Uses Playwright to set up page state (e.g., login, navigation) and then runs Lighthouse against the current page, allowing you to audit authenticated or complex flows.

### How to Use

1. **Install dependencies:**
   ```sh
   npm install --save-dev lighthouse chrome-launcher playwright
   ```
2. **Run a basic Lighthouse audit:**
   ```sh
   node lighthouse-audit.js
   # or for a specific URL
   node lighthouse-audit.js https://www.sonymusicpub.com/en/news
   ```
   - This will generate `lighthouse-report.html` in your project root.

3. **Run a Lighthouse audit after Playwright navigation:**
   ```sh
   node pw-lighthouse.js
   ```
   - This will generate `lighthouse-playwright-report.html` in your project root.
   - You can customize the Playwright script to log in or navigate before running Lighthouse.

4. **View the report:**
   - Open the generated HTML file in your browser to see the full Lighthouse report and performance score.

## Running the Tests

1. Install dependencies:
   ```sh
   npm install
   ```
2. Run all tests:
   ```sh
   npx playwright test
   ```
3. Run a specific test file:
   ```sh
   npx playwright test tests/news.spec.ts
   ```

## Notes
- Tests are robust to missing elements and dynamic UI changes.
- Page objects are used for maintainability and scalability.
- Skipped tests indicate missing or inaccessible elements/pages.

---

For any questions or contributions, please open an issue or pull request. 