import { Page, Locator } from '@playwright/test';

export class ServicesPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  get mainHeading(): Locator {
    return this.page.getByRole('heading', { name: /what we do best/i });
  }

  get serviceDescription(): Locator {
    return this.page.getByText(/provides a full range of market leading services/i);
  }

  get licenseInquiryButton(): Locator {
    return this.page.getByRole('button', { name: /license inquiry/i });
  }

  // Add more getters and actions as needed
} 