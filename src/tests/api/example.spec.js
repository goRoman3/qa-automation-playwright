/**
 * Примеры API тестов
 * Используйте для тестирования REST API endpoints
 */

const { test, expect } = require('@playwright/test');

test.describe('API Тесты', () => {
  test('пример API теста', async ({ request }) => {
    // const response = await request.get('https://api.example.com/endpoint');
    // expect(response.status()).toBe(200);
  });
});
