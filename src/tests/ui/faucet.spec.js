const { test, expect } = require('@playwright/test');
const FaucetPage = require('../../pages/faucetPage');
const HomePage = require('../../pages/homePage');
const testData = require('../../../test-data/testData');

// ─── Structure tests (modal is closed — check DOM presence) ──────────────────

test.describe('Faucet E2E Test', () => {
  let faucetPage;
  let homePage;

  test.beforeEach(async ({ page }) => {
    faucetPage = new FaucetPage(page);
    homePage = new HomePage(page);
    await faucetPage.navigateToFaucet();
  });

  test('Проверка наличия фаусета в HTML', async ({ page }) => {
    // Faucet lives inside a closed DaisyUI modal — use toHaveCount for DOM presence
    await expect(page.locator('h3:has-text("Local Faucet")')).toHaveCount(1);
    await expect(page.getByPlaceholder('Destination Address')).toHaveCount(1);
    await expect(page.getByPlaceholder('Amount to send')).toHaveCount(1);
  });

  test('Проверка наличия кнопки Send', async () => {
    expect(await faucetPage.isSendButtonPresent()).toBeTruthy();
  });

  test('Проверка наличия инпутов фаусета', async () => {
    expect(await faucetPage.areFaucetInputsPresent()).toBeTruthy();
  });

  test('Проверка что кошелек подключен', async () => {
    expect(await homePage.isWalletConnected()).toBeTruthy();
  });
});

// ─── Interaction tests (modal must be open) ───────────────────────────────────

test.describe('Faucet Form Interaction', () => {
  let faucetPage;

  test.beforeEach(async ({ page }) => {
    faucetPage = new FaucetPage(page);
    await faucetPage.navigateToFaucet();
    await faucetPage.openModal();
  });

  test('Открытие модального окна — все поля видимы', async () => {
    await expect(faucetPage.destinationInput).toBeVisible();
    await expect(faucetPage.amountInput).toBeVisible();
    await expect(faucetPage.sendButton).toBeVisible();
  });

  test('Заполнение адреса получателя', async () => {
    const address = testData.users.user1.address;
    await faucetPage.enterDestinationAddress(address);
    expect(await faucetPage.getDestinationAddress()).toBe(address);
  });

  test('Заполнение суммы отправки', async () => {
    await faucetPage.enterAmountToSend('0.5');
    expect(await faucetPage.getAmountToSend()).toBe('0.5');
  });

  test('Полная форма — адрес и сумма заполнены корректно', async () => {
    const address = testData.users.user2.address;
    await faucetPage.enterDestinationAddress(address);
    await faucetPage.enterAmountToSend('1');
    expect(await faucetPage.getDestinationAddress()).toBe(address);
    expect(await faucetPage.getAmountToSend()).toBe('1');
  });
});
