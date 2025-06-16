# Sony Music Publishing Website Test Framework

This is a Playwright test framework for testing the Sony Music Publishing website (https://www.sonymusicpub.com/en/).

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

## Running Tests

To run all tests:
```bash
npx playwright test
```

To run tests in a specific browser:
```bash
npx playwright test --project=chromium
```

To run tests in headed mode:
```bash
npx playwright test --headed
```

To run tests in debug mode:
```bash
npx playwright test --debug
```

## Project Structure

- `tests/` - Contains all test files
- `pages/` - Contains page object models
- `playwright.config.ts` - Playwright configuration file

## Test Reports

After running tests, you can view the HTML report:
```bash
npx playwright show-report
```

## Writing Tests

1. Create page objects in the `pages/` directory
2. Create test files in the `tests/` directory
3. Use the page objects in your tests for better maintainability

## Best Practices

- Use page objects to encapsulate page-specific logic
- Keep tests independent and atomic
- Use meaningful test descriptions
- Handle async operations properly
- Use appropriate assertions 