import { Page, Locator } from '@playwright/test';

export class HomePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // --- Navigation Links ---
    get aboutLink(): Locator {
        return this.page.getByRole('link', { name: 'About', exact: true });
    }
    get licensingLink(): Locator {
        return this.page.getByRole('link', { name: 'Services', exact: true });
    }

    get newsLink(): Locator {
        return this.page.getByRole('link', { name: 'News', exact: true });
    }

    get songwritersLink(): Locator {
        return this.page.getByRole('link', { name: 'Songwriters', exact: true });
    }

    get songforwardLink(): Locator {
        return this.page.getByRole('link', { name: 'Songwriters Forward', exact: true });
    }

    get globalcommunitiesLink(): Locator {
        return this.page.getByRole('link', { name: 'Global Communities', exact: true });
    }

    get scoreLink(): Locator {
        return this.page.getByRole('link', { name: 'Score', exact: true });
    }

    get contactLink(): Locator {
        return this.page.getByRole('link', { name: 'Contact', exact: true });
    }

    // --- Other Elements ---
    get logo(): Locator {
        return this.page.locator('img.logo[alt="Sony Music Publishing logo"]');
    }

    get searchButton(): Locator {
        return this.page.getByRole('button', { name: 'Open menu' });
    }

    get loginButton(): Locator {
        return this.page.getByRole('link', { name: 'Catalog Listing' });
    }

    get locationSelector(): Locator {
        return this.page.getByRole('button', { name: 'USA (New York)' });
    }

    get searchInput(): Locator {
        return this.page.getByRole('searchbox');
    }

    get locationDialog(): Locator {
        return this.page.getByRole('dialog');
    }

    // --- Methods ---
    async goto() {
        await this.page.goto('https://www.sonymusicpub.com/en/');
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('networkidle');
        await this.openMenuIfNeeded();
    }

    async isElementVisible(locator: Locator): Promise<boolean> {
        try {
            await this.openMenuIfNeeded();
            await locator.waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }

    async openMenuIfNeeded() {
        const menuButton = this.page.getByRole('button', { name: 'Open menu' });
        const isMenuButtonVisible = await menuButton.isVisible();
        if (isMenuButtonVisible) {
            await menuButton.click();
            await this.page.waitForTimeout(500); // Wait for menu animation
        }
    }
    async closeCookieBanner() {
        const acceptButton = this.page.getByRole('button', { name: /Accept Optional Cookies/i });
        if (await acceptButton.isVisible()) {
            await acceptButton.click();
            await this.page.waitForTimeout(500); // Wait for the banner to disappear
        }
    }
}
