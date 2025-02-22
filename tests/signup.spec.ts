import { test } from '@playwright/test';
import { Pages } from '../pages/pages';

test.describe('SignUp - Walkdog', () => {
  let pages: Pages;
  const path = 'fixtures/images/cnh.png';

  test.beforeEach(async ({ page }) => {
    pages = new Pages(page);

    await page.goto('/signup');
  });

  test('Empty form', async () => {
    const expectedErrors = [
      { input: 'fullName', error: 'Informe o seu nome completo' },
      { input: 'e-mail', error: 'Informe o seu melhor email' },
      { input: 'cpf', error: 'Informe o seu CPF' },
      { input: 'cep', error: 'Informe o seu CEP' },
      { input: 'houseNumber', error: 'Informe um número maior que zero' },
      { input: 'document', error: 'Adcione um documento com foto (RG ou CHN)' },
    ];

    await pages.signUp.submitForm();

    for (const error of expectedErrors) {
      await pages.signUp.validateErrorMessage(error.error);
    }
  });

  test('Invalid form', async () => {
    await test.step('Invalid E-mail', async () => {
      await pages.signUp.fillForm({
        fullName: 'Lucas Candido',
        email: 'lucas.qa',
        cpf: '12345678901',
        cep: '08295005',
        houseNumber: '111',
        complement: 'Casa',
        activity: 'Cuidar',
        documentPath: path
      });

      await pages.signUp.submitForm();
      await pages.signUp.validateErrorMessage('Informe um email válido');
    });

    await test.step('Invalid CPF', async () => {
      await pages.signUp.fillForm({
        fullName: 'Lucas Candido',
        email: 'lucas@qa.com',
        cpf: 'teste',
        cep: '08295005',
        houseNumber: '111',
        complement: 'Casa',
        activity: 'Cuidar',
        documentPath: path
      });

      await pages.signUp.submitForm();
      await pages.signUp.validateErrorMessage('CPF inválido');
    });

    await test.step('Invalid CEP', async () => {
      await pages.signUp.fillForm({
        fullName: 'Lucas Candido',
        email: 'lucas@qa.com',
        cpf: '12345678901',
        cep: 'teste',
        houseNumber: '111',
        complement: 'Casa',
        activity: 'Cuidar',
        documentPath: path
      });

      await pages.signUp.submitForm();
      await pages.signUp.validateErrorMessage('Informe um CEP válido');
    });
  });
});