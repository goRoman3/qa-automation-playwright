const { test, expect } = require('@playwright/test');
const HomePage = require('../../pages/homePage');
const DebugPage = require('../../pages/debugPage');
const Modal = require('../../pages/modal');

test.describe('Home Page', () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHome();
  });

  test('должна загрузиться главная страница', async ({ page }) => {
    expect(await homePage.isPageLoaded()).toBeTruthy();
  });

  test('кнопка Connect Wallet должна быть видна', async ({ page }) => {
    expect(await homePage.isConnectWalletVisible()).toBeTruthy();
  });

  test('содержимое страницы должно быть видно', async ({ page }) => {
    expect(await homePage.isContentVisible()).toBeTruthy();
  });
});

test.describe('Debug Page', () => {
  let debugPage;

  test.beforeEach(async ({ page }) => {
    debugPage = new DebugPage(page);
    await debugPage.navigateToDebug();
  });

  test('debug страница должна загрузиться', async ({ page }) => {
    expect(await debugPage.isPageLoaded()).toBeTruthy();
  });

  test('должна быть видна информация о кошельке', async ({ page }) => {
    expect(await debugPage.hasWalletInfo()).toBeTruthy();
  });

  test('должны быть видны все контрольные элементы', async ({ page }) => {
    const buttonCount = await debugPage.getButtonCount();
    const inputCount = await debugPage.getInputCount();
    
    expect(buttonCount).toBeGreaterThan(0);
    expect(inputCount).toBeGreaterThan(0);
  });

  test('баланс должен отображаться', async ({ page }) => {
    const balance = await debugPage.getBalance();
    expect(balance).toBeTruthy();
  });

  test('должна быть кнопка Disconnect', async ({ page }) => {
    expect(await debugPage.hasDisconnectButton()).toBeTruthy();
  });

  test('должна быть кнопка View on Block Explorer', async ({ page }) => {
    expect(await debugPage.hasViewOnBlockExplorerButton()).toBeTruthy();
  });

  test('должна быть кнопка Copy Private Key', async ({ page }) => {
    expect(await debugPage.hasCopyPrivateKeyButton()).toBeTruthy();
  });

  test('должен быть блок Read для чтения состояния', async ({ page }) => {
    expect(await debugPage.hasReadBlock()).toBeTruthy();
  });

  test('должен быть блок Send для отправки транзакций', async ({ page }) => {
    expect(await debugPage.hasSendBlock()).toBeTruthy();
  });

  test('должны быть доступны контрактные функции', async ({ page }) => {
    const items = await debugPage.getContractStateItems();
    expect(items.length).toBeGreaterThan(0);
    expect(items.some(item => item.includes('greeting') || item.includes('owner') || item.includes('counter'))).toBeTruthy();
  });
});

test.describe('Modal/Dialog Tests', () => {
  let modal;

  test.beforeEach(async ({ page }) => {
    modal = new Modal(page);
  });

  test('когда модальное окно закрыто, оно не должно быть видно', async ({ page }) => {
    expect(await modal.isModalOpen()).toBeFalsy();
  });
});
