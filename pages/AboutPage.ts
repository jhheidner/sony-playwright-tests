import { Page, Locator } from '@playwright/test';

export class AboutPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  get mainHeading(): Locator {
    return this.page.getByRole('heading', { name: /about/i });
  }

  get companyDescription(): Locator {
    return this.page.getByText(/is the #1 global music publisher/i);
  }

  // Add more getters and actions as needed
} 