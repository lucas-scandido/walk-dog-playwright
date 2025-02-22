import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly logo: Locator;
    readonly heading: Locator;
    readonly description: Locator;
    readonly botaoDogWalker: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logo = page.getByRole('img', { name: 'Walkdog' });
        this.heading = page.getByRole('heading');
        this.description = page.getByText(
            'Quer gerar uma renda extra passeando com pets? Faça parte da nossa comunidade de dog walkers.'
        );
        this.botaoDogWalker = page.getByRole('link', { name: 'Quero ser Dog Walker' });
    }

    async validateLogo() {
        await expect.soft(this.logo).toBeVisible();
    }

    async validateTitleAndTexts() {
        await expect.soft(this.heading).toHaveText('Cuidado e diversão em cada passo');
        await expect.soft(this.description).toBeVisible();
    }

    async validateRegistrationButton() {
        await expect.soft(this.botaoDogWalker).toBeVisible();
        await expect.soft(this.botaoDogWalker).toBeEnabled();
    }
}