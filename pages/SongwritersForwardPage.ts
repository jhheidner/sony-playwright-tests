import { Page, Locator } from '@playwright/test';

export class SongwritersForwardPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  get mainHeading(): Locator {
    return this.page.getByRole('heading', { name: /songwriters forward/i });
  }

  get initiativeDescription(): Locator {
    return this.page.getByText(/prioritize full transparency and support for our songwriters/i);
  }

  get songwritersLink(): Locator {
    return this.page.getByRole('link', { name: 'Songwriters', exact: true });
  }

  // Add more getters and actions as needed
} 