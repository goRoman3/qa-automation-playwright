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

  test('кнопка Connect Wallet должна иметь корректный текст', async ({ page }) => {
    const buttonText = await homePage.getConnectWalletButtonText();
    expect(buttonText).toContain('Connect Wallet');
  });

  test('содержимое страницы должно быть видно', async ({ page }) => {
    expect(await homePage.isContentVisible()).toBeTruthy();
  });

  test('при клике на Connect Wallet должно произойти соединение с кошельком', async ({ page }) => {
    await homePage.clickConnectWallet();
    // Здесь добавьте свою логику проверки результата клика
  });
});

test.describe('Debug Page', () => {
  let debugPage;
  let modal;

  test.beforeEach(async ({ page }) => {
    debugPage = new DebugPage(page);
    modal = new Modal(page);
    await debugPage.navigateToDebug();
  });

  test('debug страница должна загрузиться', async ({ page }) => {
    expect(await debugPage.isPageLoaded()).toBeTruthy();
  });

  test('кнопка Disconnect должна быть видна', async ({ page }) => {
    expect(await debugPage.isDisconnectButtonVisible()).toBeTruthy();
  });

  test('должны быть видны все контрольные элементы', async ({ page }) => {
    const buttonCount = await debugPage.getButtonCount();
    const inputCount = await debugPage.getInputCount();
    
    expect(buttonCount).toBeGreaterThan(0);
    expect(inputCount).toBeGreaterThan(0);
  });

  test('должна быть видна секция аккаунта', async ({ page }) => {
    expect(await debugPage.isAccountSectionVisible()).toBeTruthy();
  });

  test('баланс должен отображаться', async ({ page }) => {
    const balance = await debugPage.getBalance();
    expect(balance).toBeTruthy();
  });

  test('кнопка View on Block Explorer должна быть видна', async ({ page }) => {
    expect(await debugPage.isViewOnBlockExplorerVisible()).toBeTruthy();
  });

  test('кнопка копирования приватного ключа должна быть видна', async ({ page }) => {
    expect(await debugPage.isCopyPrivateKeyVisible()).toBeTruthy();
  });

  test('при клике на Disconnect должна произойти отписка', async ({ page }) => {
    await debugPage.clickDisconnect();
    // Здесь добавьте проверку результата отписки
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

  // Добавьте дополнительные тесты для модалей
  // в зависимости от того, какие модальные окна есть на вашем сайте
});
