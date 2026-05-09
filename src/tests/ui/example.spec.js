const { test, expect } = require('@playwright/test');
const env = require('../../config/env');

test.describe('Пример тестов', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(env.BASE_URL);
  });

  test('должен загрузить страницу', async ({ page }) => {
    // Пример теста - замените на свои
    expect(page.url()).toContain('localhost');
  });

  test('проверить доступность страницы', async ({ page }) => {
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });
});
