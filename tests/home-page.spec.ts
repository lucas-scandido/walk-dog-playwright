import { test, expect } from '@playwright/test';

test.describe('Home Page - Walkdog', () => {
  test('Should be displayed the home page elements', async ({ page }) => {
    await test.step('Access the home page', async () => {
      await page.goto('/');
    });

    await test.step('Validate if the logo is visible', async () => {
      const logo = page.getByRole('img', { name: 'Walkdog' });
      
      await expect(logo).toBeVisible();
    });

    await test.step('Validate the title and main texts', async () => {
      const heading = page.getByRole('heading');
      const description = page.getByText(
        'Quer gerar uma renda extra passeando com pets? Faça parte da nossa comunidade de dog walkers.'
      );

      await expect.soft(heading).toHaveText('Cuidado e diversão em cada passo');
      await expect.soft(description).toBeVisible();
    });

    await test.step('Validate if the registration button is visible', async () => {
      const botaoDogWalker = page.getByRole('link', { name: 'Quero ser Dog Walker' });
      
      await expect(botaoDogWalker).toBeVisible();
    });
  });
});
