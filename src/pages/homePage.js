const BasePage = require('./basePage');

/**
 * Home Page Object Model
 * Представляет главную страницу приложения (http://localhost:3000/)
 */
class HomePage extends BasePage {
  // Selectors
  connectWalletButton = 'button.btn.btn-primary';
  mainHeading = 'h1';
  pageContainer = 'body';

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
    const btn = this.page.locator(this.connectWalletButton);
    await btn.scrollIntoViewIfNeeded();
    await btn.click();
  }

  /**
   * Проверить наличие кнопки подключения кошелька на странице
   */
  async isConnectWalletVisible() {
    const text = await this.page.textContent('body');
    return text?.includes('Connect Wallet') || false;
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
    return await this.page.locator(this.connectWalletButton).count() > 0;
  }

  /**
   * Проверить, видно ли основное содержимое страницы
   */
  async isContentVisible() {
    const text = await this.page.textContent('body');
    return text?.includes('Connect Wallet') || false;
  }
}

module.exports = HomePage;
