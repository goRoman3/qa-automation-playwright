const { test, expect } = require('@playwright/test');
const BlockExplorerPage = require('../../pages/blockExplorerPage');

test.describe('Block Explorer', () => {
  let explorerPage;

  test.beforeEach(async ({ page }) => {
    explorerPage = new BlockExplorerPage(page);
    await explorerPage.navigateToBlockExplorer();
  });

  test('Страница блок-эксплорера загружается', async () => {
    expect(await explorerPage.isPageLoaded()).toBeTruthy();
  });

  test('Таблица транзакций отображается', async ({ page }) => {
    await expect(page.locator('table')).toBeVisible();
  });

  test('Список транзакций не пустой', async () => {
    const count = await explorerPage.getTransactionCount();
    expect(count).toBeGreaterThan(0);
  });

  test('Последняя транзакция содержит адрес (0x...)', async () => {
    expect(await explorerPage.hasTransactionData()).toBeTruthy();
  });

  test('Можно получить текст последней транзакции', async () => {
    const lastTx = await explorerPage.getLastTransaction();
    expect(lastTx).toBeTruthy();
    expect(lastTx.length).toBeGreaterThan(0);
  });

  test('Транзакции содержат ethereum адреса', async ({ page }) => {
    // Each row should contain at least one 0x... address
    const firstRowText = await explorerPage.getLastTransaction();
    expect(firstRowText).toMatch(/0x[a-fA-F0-9]+/);
  });
});
