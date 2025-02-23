import { Page, Locator, expect } from '@playwright/test'

export class SignUpPage {
    readonly page: Page;
    readonly name: Locator;
    readonly email: Locator;
    readonly cpf: Locator;
    readonly cep: Locator;
    readonly btnSearchCep: Locator;
    readonly houseNumber: Locator;
    readonly complement: Locator;
    readonly uploadDocument: Locator;
    readonly submitButton: Locator;
    readonly successModal: Locator;
    readonly successIcon: Locator;
    readonly successMessageTitle: Locator;
    readonly successMessageText: Locator;
    readonly backButton: Locator;
    readonly alertError: Locator;

    constructor(page: Page) {
        this.page = page;
        this.name = page.getByRole('textbox', { name: 'Nome completo' });
        this.email = page.getByRole('textbox', { name: 'E-mail' });
        this.cpf = page.getByRole('textbox', { name: 'CPF somente números' });
        this.cep = page.getByRole('textbox', { name: 'CEP' });
        this.btnSearchCep = page.locator('input[type=button]');
        this.houseNumber = page.getByPlaceholder('Número', { exact: true });
        this.complement = page.getByRole('textbox', { name: 'Complemento' });
        this.uploadDocument = page.locator('.dropzone input[type="file"]');
        this.submitButton = page.getByRole('button', { name: 'Cadastrar' });
        this.successModal = page.locator('div.swal2-popup')
        this.successIcon = page.locator('.swal2-success-ring');
        this.successMessageTitle = page.getByRole('heading', { name: 'Obrigado!' })
        this.successMessageText = page.getByText('Recebemos o seu cadastro e em breve retornaremos o contato.')
        this.backButton = page.getByRole('button', { name: 'Voltar' })
        this.alertError = page.locator('span.alert-error');
    }

    async validateFormElements() {
        const elementsToValidate: { locator: Locator; isEnabled?: boolean }[] = [
            { locator: this.name, isEnabled: true },
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

    async fillForm(data: { name?: string; email?: string; cpf?: string; cep?: string; houseNumber?: string; complement?: string; activity?: string; documentPath?: string }) {
        await this.validateFormElements();

        if (data.name) await this.name.fill(data.name);
        if (data.email) await this.email.fill(data.email);
        if (data.cpf) await this.cpf.fill(data.cpf);
        if (data.cep) {
            await this.cep.fill(data.cep);
            await this.btnSearchCep.click();
            await this.page.waitForTimeout(300);
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

    async validateSuccessMessage() {
        await expect.soft(this.successModal).toBeVisible();
        await expect.soft(this.successIcon).toBeVisible();
        await expect.soft(this.successMessageTitle).toBeVisible();
        await expect.soft(this.successMessageText).toBeVisible();
        await expect.soft(this.backButton).toBeVisible();
    }

    async validateErrorMessage(text: string) {
        const errorLocator = this.alertError.filter({ hasText: text });
        await expect.soft(errorLocator).toBeVisible();
        return errorLocator;
    }
}