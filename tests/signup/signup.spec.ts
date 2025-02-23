import { test } from '@playwright/test';
import { Pages } from '../../pages/pages';
import { generateUserData, activities, documentPath } from '../../utils/data';

test.describe('SignUp - Walkdog', () => {
    let pages: Pages;

    test.beforeEach(async ({ page }) => {
        pages = new Pages(page);
        await page.goto('/signup');
    });

    activities.forEach((walkerActivities) => {
        test(`Valid form with activity: ${walkerActivities}`, async () => {
            const data = generateUserData()

            await test.step('Fill form', async () => {
                await pages.signUp.fillForm({
                    name: data.fullName,
                    email: data.email,
                    cpf: data.cpf,
                    cep: data.cep,
                    houseNumber: data.houseNumber,
                    complement: data.complement,
                    activity: walkerActivities,
                    documentPath: documentPath
                });
            });

            await test.step('Submit form', async () => {
                await pages.signUp.submitForm();
            });

            await test.step('Validate success messages', async () => {
                await pages.signUp.validateSuccessMessage();
            });
        });
    })
});