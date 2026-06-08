const BasePage = require('./basePage');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
  }

  async navigateToHome() {
    await this.goto('/');
    await this.waitForPageLoad();
    // Wallet dropdown is hidden (visibility:hidden) when closed. Use DOM attachment
    // as the hydration-complete signal — don't wait for visibility.
    await this.page
      .locator('button:has-text("Disconnect"), button:has-text("Connect Wallet")')
      .first()
      .waitFor({ state: 'attached', timeout: 15000 });
  }

  async isPageLoaded() {
    // Any primary button in the header/nav area means the app rendered
    return (await this.page.locator('button').count()) > 0;
  }

  // Returns true when wallet is NOT yet connected (Connect Wallet button visible)
  async isConnectWalletVisible() {
    const text = await this.page.textContent('body');
    return text?.includes('Connect Wallet') || false;
  }

  // Returns true when wallet is already connected (Disconnect button in DOM)
  // Uses textContent because the button lives in a hidden dropdown
  async isWalletConnected() {
    const text = await this.page.textContent('body');
    return text?.includes('Disconnect') || false;
  }

  async clickConnectWallet() {
    await this.page.getByRole('button', { name: /Connect Wallet/i }).click();
  }

  async clickDisconnect() {
    await this.page.getByRole('button', { name: /Disconnect/i }).first().click();
  }
}

module.exports = HomePage;
