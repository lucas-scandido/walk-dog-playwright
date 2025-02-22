import { Page, Locator, expect } from '@playwright/test'

export class SignUpPage {
    readonly page: Page;
    readonly fullName: Locator;
    readonly email: Locator;
    readonly cpf: Locator;
    readonly cep: Locator;
    readonly btnSearchCep: Locator;
    readonly houseNumber: Locator;
    readonly complement: Locator;
    readonly uploadDocument: Locator;
    readonly submitButton: Locator;
    readonly alertError: Locator;

    constructor(page: Page) {
        this.page = page;
        this.fullName = page.getByRole('textbox', { name: 'Nome completo' });
        this.email = page.getByRole('textbox', { name: 'E-mail' });
        this.cpf = page.getByRole('textbox', { name: 'CPF somente números' });
        this.cep = page.getByRole('textbox', { name: 'CEP' });
        this.btnSearchCep = page.getByRole('button', { name: 'Buscar CEP' });
        this.houseNumber = page.getByPlaceholder('Número', { exact: true });
        this.complement = page.getByRole('textbox', { name: 'Complemento' });
        this.uploadDocument = page.locator('.dropzone input[type="file"]');
        this.submitButton = page.getByRole('button', { name: 'Cadastrar' });
        this.alertError = page.locator('span.alert-error');
    }

    async validateElements() {
        const elementsToValidate: { locator: Locator; isEnabled?: boolean }[] = [
            { locator: this.fullName, isEnabled: true },
            { locator: this.email, isEnabled: true },
            { locator: this.cpf, isEnabled: true },
            { locator: this.cep, isEnabled: true },
            { locator: this.houseNumber, isEnabled: true },
            { locator: this.complement, isEnabled: true },
            { locator: this.btnSearchCep, isEnabled: true }
        ];

        for (const element of elementsToValidate) {
            await expect.soft(element.locator).toBeVisible();
            if (element.isEnabled) {
                await expect.soft(element.locator).toBeEnabled();
            }
        }
    }

    async fillForm(data: { fullName?: string; email?: string; cpf?: string; cep?: string; houseNumber?: string; complement?: string; activity?: string; documentPath?: string }) {
        await this.validateElements();

        if (data.fullName) await this.fullName.fill(data.fullName);
        if (data.email) await this.email.fill(data.email);
        if (data.cpf) await this.cpf.fill(data.cpf);
        if (data.cep) {
            await this.cep.fill(data.cep);
            await this.btnSearchCep.click();
        }
        if (data.houseNumber) await this.houseNumber.fill(data.houseNumber);
        if (data.complement) await this.complement.fill(data.complement);
        if (data.activity) {
            const type = this.page.getByRole('img', { name: data.activity });
            await expect(type).toBeVisible();
            await type.click();
        }
        if (data.documentPath) await this.uploadDocument.setInputFiles(data.documentPath);
    }

    async submitForm() {
        await expect.soft(this.submitButton).toBeVisible();
        await expect.soft(this.submitButton).toBeEnabled();
        await this.submitButton.click();
    }

    async validateErrorMessage(text: string) {
        const errorLocator = this.alertError.filter({ hasText: text });
        await expect.soft(errorLocator).toBeVisible();
        return errorLocator;
    }
}