const lighthouse = require('lighthouse/core/index.cjs');
const chromeLauncher = require('chrome-launcher');

(async () => {
  const url = process.argv[2] || 'https://www.sonymusicpub.com/en/';
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = { logLevel: 'info', output: 'html', onlyCategories: ['performance'], port: chrome.port };
  const runnerResult = await lighthouse(url, options);

  // `.report` is the HTML report as a string
  const reportHtml = runnerResult.report;
  require('fs').writeFileSync('lighthouse-report.html', reportHtml);

  // `.lhr` is the Lighthouse Result as a JS object
  console.log('Performance score was', runnerResult.lhr.categories.performance.score);

  await chrome.kill();
})(); 