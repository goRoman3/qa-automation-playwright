/**
 * Примеры Page Object для различных страниц
 */

const BasePage = require('./basePage');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.heading = 'h1';
    this.button = 'button';
  }

  async getHeading() {
    return await this.getText(this.heading);
  }

  async clickMainButton() {
    await this.click(this.button);
  }
}

module.exports = HomePage;
