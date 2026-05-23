const BasePage = require('./basePage');

/**
 * Faucet Page Object
 * Представляет фаусет на главной странице и функционал отправки средств
 */
class FaucetPage extends BasePage {
  // Selectors
  localFaucetHeading = 'text=Local Faucet';
  destinationAddressInput = 'input[placeholder="Destination Address"]';
  amountToSendInput = 'input[placeholder="Amount to send"]';
  sendButton = 'button.btn.btn-primary:has-text("Send")';
  blockExplorerButton = 'button:has-text("Block Explorer")';
  
  // Success messages
  successMessage = 'text=Transaction completed successfully!';

  constructor(page) {
    super(page);
  }

  /**
   * Перейти на главную страницу и дождаться загрузки фаусета
   */
  async navigateToFaucet() {
    await this.goto('/');
    await this.waitForPageLoad();
    
    // Убедимся что фаусет видна
    await this.page.waitForSelector('text=Local Faucet', { timeout: 5000 });
  }

  /**
   * Ввести адрес назначения
   */
  async enterDestinationAddress(address) {
    await this.page.locator(this.destinationAddressInput).fill(address);
  }

  /**
   * Ввести сумму для отправки
   */
  async enterAmountToSend(amount) {
    await this.page.locator(this.amountToSendInput).fill(amount.toString());
  }

  /**
   * Получить значение адреса получателя
   */
  async getDestinationAddress() {
    return await this.page.locator(this.destinationAddressInput).inputValue();
  }

  /**
   * Получить значение суммы
   */
  async getAmountToSend() {
    return await this.page.locator(this.amountToSendInput).inputValue();
  }

  /**
   * Нажать кнопку Send для отправки средств
   */
  async clickSend() {
    await this.page.locator(this.sendButton).first().click();
  }

  /**
   * Ждать появления сообщения об успешной транзакции
   */
  async waitForSuccessMessage() {
    await this.page.waitForSelector(this.successMessage, { timeout: 10000 });
  }

  /**
   * Проверить наличие сообщения об успешной транзакции
   */
  async hasSuccessMessage() {
    try {
      await this.page.waitForSelector(this.successMessage, { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Получить текст сообщения об успехе
   */
  async getSuccessMessage() {
    return await this.page.locator(this.successMessage).textContent();
  }

  /**
   * Нажать на кнопку "Block Explorer"
   */
  async clickBlockExplorer() {
    // Ищем кнопку Block Explorer рядом с фаусетом
    const faucetSection = this.page.locator('text=Local Faucet').locator('..').locator('..').first();
    const blockExplorerBtn = faucetSection.locator(this.blockExplorerButton);
    await blockExplorerBtn.click();
  }

  /**
   * Заполнить форму фаусета и отправить
   */
  async sendFunds(destinationAddress, amount) {
    await this.enterDestinationAddress(destinationAddress);
    await this.enterAmountToSend(amount);
    await this.clickSend();
  }

  /**
   * Проверить, видна ли форма фаусета
   */
  async isFaucetVisible() {
    const text = await this.page.textContent('body');
    return text?.includes('Local Faucet') || false;
  }

  /**
   * Проверить, видна ли кнопка Send для фаусета
   */
  async isSendButtonVisible() {
    return await this.page.locator(this.sendButton).isVisible().catch(() => false);
  }
}

module.exports = FaucetPage;
