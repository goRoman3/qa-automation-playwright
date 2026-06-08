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

  test('кошелек подключен (видна кнопка Disconnect)', async ({ page }) => {
    expect(await homePage.isWalletConnected()).toBeTruthy();
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

  test('должен быть блок Read для чтения состояния', async ({ page }) => {
    expect(await debugPage.hasReadBlock()).toBeTruthy();
  });

  test('должен быть блок Send для отправки транзакций', async ({ page }) => {
    expect(await debugPage.hasSendBlock()).toBeTruthy();
  });

  test('должны быть доступны контрактные функции', async ({ page }) => {
    const items = await debugPage.getContractStateItems();
    expect(items.length).toBeGreaterThan(0);
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
