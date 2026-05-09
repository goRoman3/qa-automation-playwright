/**
 * Базовый Page Object
 * Содержит общие методы для всех страниц
 */
class BasePage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Перейти на страницу
   * @param {string} url - URL для перехода
   */
  async goto(url) {
    await this.page.goto(url);
  }

  /**
   * Получить текущий URL
   */
  async getCurrentUrl() {
    return this.page.url();
  }

  /**
   * Кликнуть на элемент
   * @param {string} selector - CSS селектор
   */
  async click(selector) {
    await this.page.click(selector);
  }

  /**
   * Заполнить поле ввода
   * @param {string} selector - CSS селектор
   * @param {string} text - Текст для ввода
   */
  async fill(selector, text) {
    await this.page.fill(selector, text);
  }

  /**
   * Получить текст элемента
   * @param {string} selector - CSS селектор
   */
  async getText(selector) {
    return await this.page.textContent(selector);
  }

  /**
   * Проверить наличие элемента
   * @param {string} selector - CSS селектор
   */
  async isVisible(selector) {
    return await this.page.isVisible(selector);
  }

  /**
   * Ждать загрузки страницы
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = BasePage;
