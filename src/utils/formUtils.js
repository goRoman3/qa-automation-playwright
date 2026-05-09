/**
 * Утилиты для работы с формами и элементами
 */
class FormUtils {
  /**
   * Заполнить форму множеством значений
   * @param {Page} page - Playwright page
   * @param {Object} fields - Объект с селекторами и значениями
   */
  static async fillForm(page, fields) {
    for (const [selector, value] of Object.entries(fields)) {
      await page.fill(selector, value);
    }
  }

  /**
   * Получить значение поля
   * @param {Page} page - Playwright page
   * @param {string} selector - CSS селектор
   */
  static async getFieldValue(page, selector) {
    return await page.inputValue(selector);
  }

  /**
   * Проверить, что поле содержит значение
   * @param {Page} page - Playwright page
   * @param {string} selector - CSS селектор
   * @param {string} expectedValue - Ожидаемое значение
   */
  static async assertFieldValue(page, selector, expectedValue) {
    const value = await this.getFieldValue(page, selector);
    if (value !== expectedValue) {
      throw new Error(`Field value mismatch. Expected: ${expectedValue}, Got: ${value}`);
    }
  }

  /**
   * Очистить поле
   * @param {Page} page - Playwright page
   * @param {string} selector - CSS селектор
   */
  static async clearField(page, selector) {
    await page.fill(selector, '');
  }
}

module.exports = FormUtils;
