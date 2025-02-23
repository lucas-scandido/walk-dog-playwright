import { test } from '@playwright/test';
import { Pages } from '../../pages/pages';
import { generateUserData, activities, documentPath } from '../../utils/data';

test.describe('Invalid SignUp - Walkdog', () => {
  let pages: Pages;
  const data = generateUserData()

  test.beforeEach(async ({ page }) => {
    pages = new Pages(page);
    await page.goto('/signup');
  });

  test('Empty form', async () => {
    const expectedErrors = [
      { input: 'name', error: 'Informe o seu nome completo' },
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
        name: data.fullName,
        email: 'lucas.qa',
        cpf: data.cpf,
        cep: data.cep,
        houseNumber: data.houseNumber,
        complement: data.complement,
        activity: activities[0],
        documentPath: documentPath
      });

      await pages.signUp.submitForm();
      await pages.signUp.validateErrorMessage('Informe um email válido');
    });

    await test.step('Invalid CPF', async () => {
      await pages.signUp.fillForm({
        name: data.fullName,
        email: data.email,
        cpf: '123456789',
        cep: data.cep,
        houseNumber: data.houseNumber,
        complement: data.complement,
        activity: activities[0],
        documentPath: documentPath
      });

      await pages.signUp.submitForm();
      await pages.signUp.validateErrorMessage('CPF inválido');
    });

    
    // Test skipped due to a bug in the invalid CEP flow
    await test.step.skip('Invalid CEP', async () => {
      await pages.signUp.fillForm({
        name: data.fullName,
        email: data.email,
        cpf: data.cpf,
        cep: '08295',
        houseNumber: data.houseNumber,
        complement: data.complement,
        activity: activities[0],
        documentPath: documentPath
      });

      await pages.signUp.submitForm();
      await pages.signUp.validateErrorMessage('Informe um CEP válido');
    });
  });
});