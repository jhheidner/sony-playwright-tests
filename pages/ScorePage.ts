import { Page, Locator } from '@playwright/test';

export class ScorePage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  get mainHeading(): Locator {
    return this.page.getByRole('heading', { name: /score/i });
  }

  get loginButton(): Locator {
    return this.page.getByRole('button', { name: /login/i });
  }

  get logo(): Locator {
    return this.page.getByRole('img', { name: /sony music publishing logo/i });
  }

  // Add more getters and actions as needed
} 