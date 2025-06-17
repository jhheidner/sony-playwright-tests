const { chromium } = require('playwright');
const lighthouse = require('lighthouse/core/index.cjs');
const fs = require('fs');

(async () => {
  // 1. Launch Playwright with remote debugging
  const browser = await chromium.launch({
    headless: true,
    args: ['--remote-debugging-port=9222']
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  // 2. Use Playwright to log in or navigate as needed
  await page.goto('https://www.sonymusicpub.com/en/');
  // ... perform login or navigation steps here if needed ...

  // 3. Get the current URL
  const url = page.url();

  // 4. Run Lighthouse using the same Chrome instance
  const result = await lighthouse(url, {
    port: 9222,
    output: 'html',
    onlyCategories: ['performance']
  });

  fs.writeFileSync('lighthouse-playwright-report.html', result.report);

  console.log('Performance score was', result.lhr.categories.performance.score);

  await browser.close();
})(); 