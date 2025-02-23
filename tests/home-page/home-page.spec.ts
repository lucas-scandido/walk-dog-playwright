import { test } from '@playwright/test';
import { Pages } from '../../pages/pages';

test.describe('Home Page - Walkdog', () => {
  test('Validate home page elements', async ({ page }) => {
    const pages = new Pages(page);

    await test.step('Access the home page', async () => {
      await page.goto('/');
    });

    await test.step('Validate the logo', async () => {
      await pages.homePage.validateLogo();
    });

    await test.step('Validate the title and main texts', async () => {
      await pages.homePage.validateTitleAndTexts();
    });

    await test.step('Validate the registration button', async () => {
      await pages.homePage.validateRegistrationButton();
    });
  });
});