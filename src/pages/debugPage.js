const BasePage = require('./basePage');

/**
 * Debug Page Object Model
 * Представляет debug страницу приложения (http://localhost:3000/debug)
 */
class DebugPage extends BasePage {
  // Selectors
  balanceButton = 'button:has-text(/ETH/)';
  viewOnBlockExplorerButton = 'button:has-text("View on Block Explorer")';
  disconnectButton = 'button:has-text("Disconnect")';
  copyPrivateKeyButton = 'button:has-text("Copy Private Key To Clipboard")';
  inputs = 'input';
  debugTitle = 'h1, h2';
  accountSection = '[class*="account"]';

  constructor(page) {
    super(page);
  }

  /**
   * Перейти на debug страницу
   */
  async navigateToDebug() {
    await this.goto('/debug');
    await this.waitForPageLoad();
  }

  /**
   * Получить количество видимых кнопок
   */
  async getButtonCount() {
    const buttons = await this.page.locator('button').all();
    return buttons.length;
  }

  /**
   * Получить количество видимых инпутов
   */
  async getInputCount() {
    const inputs = await this.page.locator(this.inputs).all();
    return inputs.length;
  }

  /**
   * Кликнуть на кнопку "Disconnect"
   */
  async clickDisconnect() {
    await this.click(this.disconnectButton);
  }

  /**
   * Проверить, видна ли кнопка "Disconnect"
   */
  async isDisconnectButtonVisible() {
    return await this.isVisible(this.disconnectButton);
  }

  /**
   * Кликнуть на кнопку "View on Block Explorer"
   */
  async clickViewOnBlockExplorer() {
    await this.click(this.viewOnBlockExplorerButton);
  }

  /**
   * Проверить, видна ли кнопка "View on Block Explorer"
   */
  async isViewOnBlockExplorerVisible() {
    return await this.isVisible(this.viewOnBlockExplorerButton);
  }

  /**
   * Кликнуть на кнопку "Copy Private Key To Clipboard"
   */
  async clickCopyPrivateKey() {
    await this.click(this.copyPrivateKeyButton);
  }

  /**
   * Проверить, видна ли кнопка копирования приватного ключа
   */
  async isCopyPrivateKeyVisible() {
    return await this.isVisible(this.copyPrivateKeyButton);
  }

  /**
   * Получить баланс аккаунта (текст из кнопки с балансом)
   */
  async getBalance() {
    return await this.getText(this.balanceButton);
  }

  /**
   * Проверить, загружена ли debug страница
   */
  async isPageLoaded() {
    return await this.isVisible(this.disconnectButton);
  }

  /**
   * Получить все видимые инпуты
   */
  async getAllInputs() {
    return await this.page.locator(this.inputs).all();
  }

  /**
   * Получить значение инпута по индексу
   */
  async getInputValue(index) {
    const inputs = await this.getAllInputs();
    if (inputs[index]) {
      return await inputs[index].inputValue();
    }
    return null;
  }

  /**
   * Кликнуть на первую кнопку с балансом
   */
  async clickBalance() {
    await this.click(this.balanceButton);
  }

  /**
   * Проверить, видна ли секция аккаунта
   */
  async isAccountSectionVisible() {
    return await this.isVisible(this.accountSection);
  }
}

module.exports = DebugPage;
