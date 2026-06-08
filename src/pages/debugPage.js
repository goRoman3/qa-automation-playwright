const BasePage = require('./basePage');

/**
 * Debug Page — /debug
 *
 * Scaffold-ETH 2 debug page contains:
 *   - Wallet info row (balance, address, Disconnect, View on Block Explorer, Copy Private Key)
 *   - Contract Read section  → "Read 📡" button per function
 *   - Contract Write section → "Send 💸" button per function
 *   - Faucet widget at the bottom (shared with home page)
 *
 * Real headings found: greeting · owner · premium · totalCounter · Debug Contracts · Local Faucet
 */
class DebugPage extends BasePage {
  constructor(page) {
    super(page);
  }

  // Locators
  get disconnectButton() { return this.page.getByRole('button', { name: /Disconnect/i }).first(); }
  get viewOnBlockExplorerButton() { return this.page.getByRole('button', { name: /View on Block Explorer/i }); }
  get readButton() { return this.page.getByRole('button', { name: 'Read 📡' }).first(); }
  get sendButton() { return this.page.getByRole('button', { name: 'Send 💸' }).first(); }

  async navigateToDebug() {
    await this.goto('/debug');
    await this.waitForPageLoad();
    // Contract sections are client-side rendered; wait for the Write section button to be in DOM
    await this.page.locator('button:has-text("Send 💸")').first().waitFor({ state: 'attached', timeout: 15000 });
  }

  async isPageLoaded() {
    const text = await this.page.textContent('body');
    return text?.includes('Debug Contracts') || false;
  }

  async getButtonCount() {
    return this.page.locator('button').count();
  }

  async getInputCount() {
    return this.page.locator('input').count();
  }

  // Returns the ETH balance shown in the wallet row (first balance button)
  async getBalance() {
    // The balance button renders as "X.XXXXETH" inside a flex column button
    const btn = this.page.locator('button').filter({ hasText: /ETH/ }).first();
    return (await btn.textContent())?.trim();
  }

  // True when the Read section is present
  async hasReadBlock() {
    return (await this.readButton.count()) > 0;
  }

  // True when the Write section is present
  async hasSendBlock() {
    return (await this.sendButton.count()) > 0;
  }

  async clickRead() {
    await this.readButton.click();
  }

  async clickSend() {
    await this.sendButton.click();
  }

  async clickDisconnect() {
    await this.disconnectButton.click();
  }

  async hasDisconnectButton() {
    return (await this.disconnectButton.count()) > 0;
  }

  async clickViewOnBlockExplorer() {
    await this.viewOnBlockExplorerButton.first().click();
  }

  async hasViewOnBlockExplorerButton() {
    return (await this.viewOnBlockExplorerButton.count()) > 0;
  }

  // Returns all short heading texts (contract function names)
  async getContractStateItems() {
    const items = await this.page.locator('h1, h2, h3, h4').all();
    const result = [];
    for (const item of items) {
      const text = (await item.textContent())?.trim();
      if (text && text.length < 50) result.push(text);
    }
    return result;
  }

  // True when the page body contains a 0x... wallet address
  async hasWalletInfo() {
    const text = await this.page.textContent('body');
    return /0x[a-fA-F0-9]{40}/.test(text || '');
  }
}

module.exports = DebugPage;
