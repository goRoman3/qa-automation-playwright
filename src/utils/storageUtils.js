/**
 * Вспомогательные функции для работы с локальным хранилищем (localStorage)
 */

class StorageUtils {
  /**
   * Сохранить значение в localStorage
   * @param {Page} page - Playwright page
   * @param {string} key - Ключ
   * @param {string} value - Значение
   */
  static async setLocalStorage(page, key, value) {
    await page.evaluate(({ key, value }) => {
      localStorage.setItem(key, value);
    }, { key, value });
  }

  /**
   * Получить значение из localStorage
   * @param {Page} page - Playwright page
   * @param {string} key - Ключ
   */
  static async getLocalStorage(page, key) {
    return await page.evaluate((key) => {
      return localStorage.getItem(key);
    }, key);
  }

  /**
   * Очистить localStorage
   * @param {Page} page - Playwright page
   */
  static async clearLocalStorage(page) {
    await page.evaluate(() => {
      localStorage.clear();
    });
  }

  /**
   * Получить все значения из localStorage
   * @param {Page} page - Playwright page
   */
  static async getAllLocalStorage(page) {
    return await page.evaluate(() => {
      const storage = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        storage[key] = localStorage.getItem(key);
      }
      return storage;
    });
  }

  /**
   * Установить cookie
   * @param {Page} page - Playwright page
   * @param {string} name - Имя cookie
   * @param {string} value - Значение cookie
   * @param {Object} options - Опции cookie
   */
  static async setCookie(page, name, value, options = {}) {
    await page.context().addCookies([{
      name,
      value,
      url: 'http://localhost:3000',
      ...options,
    }]);
  }

  /**
   * Получить cookie
   * @param {Page} page - Playwright page
   * @param {string} name - Имя cookie
   */
  static async getCookie(page, name) {
    const cookies = await page.context().cookies();
    return cookies.find(c => c.name === name);
  }

  /**
   * Очистить все cookies
   * @param {Page} page - Playwright page
   */
  static async clearCookies(page) {
    await page.context().clearCookies();
  }
}

module.exports = StorageUtils;
