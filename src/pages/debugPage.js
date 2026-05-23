const BasePage = require('./basePage');

/**
 * Debug Page Object Model
 * Представляет debug страницу приложения (http://localhost:3000/debug)
 * 
 * Страница содержит:
 * - Информацию о кошельке (баланс, адрес)
 * - Кнопку Disconnect
 * - Блоки Read (для чтения состояния контрактов)
 * - Блоки Write (для отправки транзакций)
 * - Историю транзакций (появляется после депозитов)
 */
class DebugPage extends BasePage {
  // Selectors
  balanceButton = 'button.flex.flex-col.items-center';
  viewOnBlockExplorerButton = 'button:has-text("View on Block Explorer")';
  disconnectButton = 'button:has-text("Disconnect")';
  copyPrivateKeyButton = 'button:has-text("Copy Private Key To Clipboard")';
  readButton = 'button:has-text("Read 📡")';
  sendButton = 'button:has-text("Send 💸")';
  inputs = 'input';
  
  // Contract state items (greeting, owner, premium, totalCounter, etc.)
  contractStateItems = 'h1, h2, h3, h4';

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
    const btn = this.page.locator(this.disconnectButton).first();
    await btn.scrollIntoViewIfNeeded();
    await btn.click({ force: true });
  }

  /**
   * Проверить наличие кнопки "Disconnect" на странице (может быть вне viewport)
   */
  async hasDisconnectButton() {
    const text = await this.page.textContent('body');
    return text?.includes('Disconnect') || false;
  }

  /**
   * Кликнуть на кнопку "View on Block Explorer"
   */
  async clickViewOnBlockExplorer() {
    const btn = this.page.locator(this.viewOnBlockExplorerButton).first();
    await btn.scrollIntoViewIfNeeded();
    await btn.click();
  }

  /**
   * Проверить наличие кнопки "View on Block Explorer"
   */
  async hasViewOnBlockExplorerButton() {
    const text = await this.page.textContent('body');
    return text?.includes('View on Block Explorer') || false;
  }

  /**
   * Кликнуть на кнопку "Copy Private Key To Clipboard"
   */
  async clickCopyPrivateKey() {
    const btn = this.page.locator(this.copyPrivateKeyButton).first();
    await btn.scrollIntoViewIfNeeded();
    await btn.click();
  }

  /**
   * Проверить наличие кнопки копирования приватного ключа
   */
  async hasCopyPrivateKeyButton() {
    const text = await this.page.textContent('body');
    return text?.includes('Copy Private Key To Clipboard') || false;
  }

  /**
   * Получить баланс аккаунта
   */
  async getBalance() {
    const balance = await this.page.locator(this.balanceButton).first().textContent();
    return balance?.trim();
  }

  /**
   * Проверить, загружена ли debug страница
   */
  async isPageLoaded() {
    const text = await this.page.textContent('body');
    return text?.includes('Debug Contracts') || false;
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
   * Кликнуть на кнопку "Read 📡"
   */
  async clickRead() {
    const btn = this.page.locator(this.readButton).first();
    await btn.scrollIntoViewIfNeeded();
    await btn.click();
  }

  /**
   * Проверить наличие блока Read
   */
  async hasReadBlock() {
    const text = await this.page.textContent('body');
    return text?.includes('Read') || false;
  }

  /**
   * Кликнуть на кнопку "Send 💸"
   */
  async clickSend() {
    const btn = this.page.locator(this.sendButton).first();
    await btn.scrollIntoViewIfNeeded();
    await btn.click();
  }

  /**
   * Проверить наличие блока Send/Write
   */
  async hasSendBlock() {
    const text = await this.page.textContent('body');
    return text?.includes('Send') || false;
  }

  /**
   * Получить все названия контрактов/функций на странице
   */
  async getContractStateItems() {
    const items = await this.page.locator(this.contractStateItems).all();
    const result = [];
    for (let item of items) {
      const text = await item.textContent();
      if (text?.trim() && text.trim().length < 50) {
        result.push(text.trim());
      }
    }
    return result;
  }

  /**
   * Проверить, что страница содержит информацию о кошельке
   */
  async hasWalletInfo() {
    const text = await this.page.textContent('body');
    // Проверяем наличие адреса (0x) и информации о кошельке
    return /0x[a-fA-F0-9]{40}/.test(text || '');
  }
}

module.exports = DebugPage;
