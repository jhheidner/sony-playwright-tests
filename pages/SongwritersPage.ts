import { Page, Locator } from '@playwright/test';

export class SongwritersPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  get mainHeading(): Locator {
    return this.page.getByRole('heading', { name: /songwriters/i });
  }

  get songwritersForwardLink(): Locator {
    return this.page.getByRole('link', { name: 'Songwriters Forward', exact: true });
  }

  // Add more getters and actions as needed
} 