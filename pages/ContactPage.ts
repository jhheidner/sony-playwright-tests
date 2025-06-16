import { Page, Locator } from '@playwright/test';

export class ContactPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  get mainHeading(): Locator {
    return this.page.getByRole('heading', { name: /contact us/i });
  }

  get emailLink(): Locator {
    return this.page.getByRole('link', { name: /info@sonymusicpub.com/i });
  }

  get officeLocationButton(): Locator {
    return this.page.getByRole('button', { name: 'USA (New York)' });
  }

  // Add more getters and actions as needed
} 