/**
 * Утилиты для работы со сроками и таймаутами
 */
class TimeUtils {
  /**
   * Подождать указанное время (мс)
   * @param {number} ms - Время в миллисекундах
   */
  static sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Подождать, пока условие станет истинным
   * @param {Function} condition - Функция, которая возвращает boolean
   * @param {number} timeout - Максимальное время ожидания (мс)
   * @param {number} interval - Интервал проверки (мс)
   */
  static async waitFor(condition, timeout = 30000, interval = 500) {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      if (await condition()) {
        return true;
      }
      await this.sleep(interval);
    }
    throw new Error(`Timeout waiting for condition after ${timeout}ms`);
  }

  /**
   * Получить текущий timestamp
   */
  static getCurrentTimestamp() {
    return Date.now();
  }

  /**
   * Получить отформатированное время
   */
  static getFormattedTime(date = new Date()) {
    return date.toISOString().replace(/[:.]/g, '-');
  }
}

module.exports = TimeUtils;
