import { Page, Locator } from '@playwright/test';

export class GlobalCommunitiesPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  get mainHeading(): Locator {
    return this.page.getByRole('heading', { name: /global communities/i });
  }

  get communityDescription(): Locator {
    return this.page.getByText(/Social Justice and COVID-19 Relief Funds enable Sony Music Publishing/i);
  }

  get contactLink(): Locator {
    return this.page.getByRole('link', { name: /contact/i });
  }

  // Add more getters and actions as needed
} 