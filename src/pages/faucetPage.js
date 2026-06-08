const BasePage = require('./basePage');

class FaucetPage extends BasePage {
  constructor(page) {
    super(page);
  }

  // Locators (lazy getters so they resolve at call time, not construction time)
  get heading() { return this.page.getByRole('heading', { name: 'Local Faucet' }); }
  get destinationInput() { return this.page.getByPlaceholder('Destination Address'); }
  get amountInput() { return this.page.getByPlaceholder('Amount to send'); }
  // Exact match to avoid hitting "Send 💸" buttons on /debug
  get sendButton() { return this.page.getByRole('button', { name: /^Send$/ }).first(); }

  async navigateToFaucet() {
    await this.goto('/');
    await this.waitForPageLoad();
    // Faucet lives inside a closed DaisyUI modal (visibility:hidden). Wait for DOM attachment
    // (not visibility) as a React-hydration-complete signal.
    await this.page.locator('h3:has-text("Local Faucet")').waitFor({ state: 'attached', timeout: 15000 });
  }

  // Open the faucet modal by toggling the DaisyUI checkbox directly.
  // More reliable than clicking the label trigger under parallel test load.
  async openModal() {
    await this.page.locator('#faucet-modal').evaluate(el => {
      el.checked = true;
      el.dispatchEvent(new Event('change', { bubbles: true }));
    });
    await this.destinationInput.waitFor({ state: 'visible', timeout: 15000 });
  }

  async enterDestinationAddress(address) {
    await this.destinationInput.fill(address);
  }

  async enterAmountToSend(amount) {
    await this.amountInput.fill(amount.toString());
  }

  async getDestinationAddress() {
    return this.destinationInput.inputValue();
  }

  async getAmountToSend() {
    return this.amountInput.inputValue();
  }

  async clickSend() {
    await this.sendButton.click();
  }

  async sendFunds(destinationAddress, amount) {
    await this.enterDestinationAddress(destinationAddress);
    await this.enterAmountToSend(amount);
    await this.clickSend();
  }

  async isFaucetVisible() {
    return this.heading.isVisible();
  }

  async areFaucetInputsPresent() {
    const destCount = await this.destinationInput.count();
    const amountCount = await this.amountInput.count();
    return destCount > 0 && amountCount > 0;
  }

  async isSendButtonPresent() {
    // Send button lives inside the closed modal; use raw filter (finds hidden elements)
    return (await this.page.locator('button').filter({ hasText: 'Send' }).count()) > 0;
  }

  // Waits for the success toast/message after sending funds
  async waitForSuccessMessage() {
    await this.page.getByText(/Transaction completed successfully/i).waitFor({ timeout: 10000 });
  }

  async hasSuccessMessage() {
    try {
      await this.waitForSuccessMessage();
      return true;
    } catch {
      return false;
    }
  }
}

module.exports = FaucetPage;
