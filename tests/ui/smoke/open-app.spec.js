const { test, expect } = require('@playwright/test');

test('User can open the application', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/.+/);
});
