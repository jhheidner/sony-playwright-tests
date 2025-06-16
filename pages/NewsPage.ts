import { Page, Locator } from '@playwright/test';

export class NewsPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  get mainHeading(): Locator {
    return this.page.getByRole('heading', { name: /news/i });
  }

  get articles(): Locator {
    return this.page.getByRole('article');
  }

  get readMoreButtons(): Locator {
    return this.page.getByRole('button', { name: /read more/i });
  }

  // Add more getters and actions as needed
} 