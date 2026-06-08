const BasePage = require('./basePage');

class BlockExplorerPage extends BasePage {
  constructor(page) {
    super(page);
  }

  get transactionRows() { return this.page.locator('table tbody tr'); }

  async navigateToBlockExplorer() {
    await this.goto('/blockexplorer');
    await this.waitForPageLoad();
    // Wait for at least one transaction row — the table skeleton may appear before rows render
    await this.page.locator('table tbody tr').first().waitFor({ state: 'attached', timeout: 15000 });
  }

  async isPageLoaded() {
    try {
      await this.transactionRows.first().waitFor({ state: 'attached', timeout: 5000 });
      return (await this.getTransactionCount()) > 0;
    } catch {
      return false;
    }
  }

  async getTransactionCount() {
    return this.transactionRows.count();
  }

  async getAllTransactions() {
    const rows = await this.transactionRows.all();
    const result = [];
    for (const row of rows) {
      result.push({
        text: (await row.textContent())?.trim(),
        html: await row.evaluate(el => el.innerHTML),
      });
    }
    return result;
  }

  async findTransaction(toAddress, amount) {
    const txs = await this.getAllTransactions();
    for (const tx of txs) {
      const hasAddress =
        tx.text?.includes(toAddress.toLowerCase()) || tx.text?.includes(toAddress);
      const hasAmount = tx.text?.includes(amount.toString());
      if (hasAddress && hasAmount) return tx;
    }
    return null;
  }

  async hasTransaction(toAddress, amount) {
    return (await this.findTransaction(toAddress, amount)) !== null;
  }

  async getLastTransaction() {
    return (await this.transactionRows.first().textContent())?.trim();
  }

  async lastTransactionContains(text) {
    const lastTx = await this.getLastTransaction();
    return lastTx?.includes(text) || false;
  }

  async hasTransactionData() {
    const text = await this.page.textContent('body');
    return /0x[a-fA-F0-9]{40}/.test(text || '');
  }
}

module.exports = BlockExplorerPage;
