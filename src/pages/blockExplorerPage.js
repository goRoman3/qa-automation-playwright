const BasePage = require('./basePage');

/**
 * Block Explorer Page Object
 * Представляет страницу истории транзакций (блок-экспlorер)
 */
class BlockExplorerPage extends BasePage {
  // Selectors
  transactionTable = 'table, [role="table"]';
  transactionRows = 'tbody tr, [role="row"]';
  toAddressColumn = 'td:nth-child(2), [data-column="to"]';
  amountColumn = 'td:nth-child(3), [data-column="amount"]';

  constructor(page) {
    super(page);
  }

  /**
   * Ждать загрузки страницы транзакций
   */
  async waitForTransactions() {
    await this.waitForPageLoad();
  }

  /**
   * Получить количество транзакций в списке
   */
  async getTransactionCount() {
    const rows = await this.page.locator(this.transactionRows).all();
    return rows.length;
  }

  /**
   * Получить все транзакции
   */
  async getAllTransactions() {
    const rows = await this.page.locator(this.transactionRows).all();
    const transactions = [];

    for (let row of rows) {
      const cells = await row.locator('td').all();
      const rowText = await row.textContent();

      transactions.push({
        text: rowText?.trim(),
        html: await row.evaluate(el => el.innerHTML),
      });
    }

    return transactions;
  }

  /**
   * Найти транзакцию по адресу получателя и сумме
   */
  async findTransaction(toAddress, amount) {
    const transactions = await this.getAllTransactions();
    
    for (let tx of transactions) {
      const hasAddress = tx.text?.includes(toAddress.toLowerCase()) || tx.text?.includes(toAddress);
      const hasAmount = tx.text?.includes(amount.toString());
      
      if (hasAddress && hasAmount) {
        return tx;
      }
    }
    
    return null;
  }

  /**
   * Проверить, есть ли транзакция в списке
   */
  async hasTransaction(toAddress, amount) {
    const transaction = await this.findTransaction(toAddress, amount);
    return transaction !== null;
  }

  /**
   * Получить последнюю (первую в списке) транзакцию
   */
  async getLastTransaction() {
    const firstRow = await this.page.locator(this.transactionRows).first();
    const text = await firstRow.textContent();
    return text?.trim();
  }

  /**
   * Проверить, содержится ли текст в последней транзакции
   */
  async lastTransactionContains(text) {
    const lastTx = await this.getLastTransaction();
    return lastTx?.includes(text) || false;
  }

  /**
   * Получить текст в конкретной ячейке последней транзакции
   */
  async getLastTransactionCell(cellIndex) {
    const firstRow = await this.page.locator(this.transactionRows).first();
    const cells = await firstRow.locator('td').all();
    
    if (cells[cellIndex]) {
      return await cells[cellIndex].textContent();
    }
    return null;
  }

  /**
   * Проверить, загружена ли страница (есть таблица транзакций)
   */
  async isPageLoaded() {
    try {
      const rowCount = await this.getTransactionCount();
      return rowCount > 0;
    } catch {
      return false;
    }
  }

  /**
   * Получить всю текстовую информацию со страницы
   */
  async getPageText() {
    return await this.page.textContent('body');
  }

  /**
   * Проверить наличие данных в таблице
   */
  async hasTransactionData() {
    const text = await this.getPageText();
    // Проверяем наличие адресов (0x...)
    return /0x[a-fA-F0-9]{40}/.test(text || '');
  }
}

module.exports = BlockExplorerPage;
