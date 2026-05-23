const BasePage = require('./basePage');

/**
 * Home Page Object Model
 * Представляет главную страницу приложения (http://localhost:3000/)
 */
class HomePage extends BasePage {
  // Selectors
  connectWalletButton = 'button:has-text("Connect Wallet")';
  mainHeading = 'h1';
  pageContainer = '[class*="container"]';

  constructor(page) {
    super(page);
  }

  /**
   * Перейти на главную страницу
   */
  async navigateToHome() {
    await this.goto('/');
    await this.waitForPageLoad();
  }

  /**
   * Кликнуть на кнопку "Connect Wallet"
   */
  async clickConnectWallet() {
    await this.click(this.connectWalletButton);
  }

  /**
   * Проверить, видна ли кнопка подключения кошелька
   */
  async isConnectWalletVisible() {
    return await this.isVisible(this.connectWalletButton);
  }

  /**
   * Получить текст кнопки подключения кошелька
   */
  async getConnectWalletButtonText() {
    return await this.getText(this.connectWalletButton);
  }

  /**
   * Проверить, загружена ли страница (наличие основного контента)
   */
  async isPageLoaded() {
    return await this.isVisible(this.mainHeading);
  }

  /**
   * Получить заголовок страницы
   */
  async getPageTitle() {
    return await this.getText(this.mainHeading);
  }

  /**
   * Проверить, видно ли основное содержимое страницы
   */
  async isContentVisible() {
    return await this.isVisible(this.pageContainer);
  }
}

module.exports = HomePage;
