/**
 * Вспомогательные функции для работы с браузером и консолью
 */

/**
 * Перехватить сообщения консоли
 * @param {Page} page - Playwright page
 * @returns {Function} - Функция для получения логов
 */
function setupConsoleLogs(page) {
  const logs = [];
  
  page.on('console', (msg) => {
    logs.push({
      type: msg.type(),
      text: msg.text(),
    });
  });

  return () => logs;
}

/**
 * Перехватить ошибки страницы
 * @param {Page} page - Playwright page
 * @returns {Function} - Функция для получения ошибок
 */
function setupPageErrors(page) {
  const errors = [];
  
  page.on('pageerror', (error) => {
    errors.push(error.message);
  });

  return () => errors;
}

/**
 * Перехватить запросы/ответы
 * @param {Page} page - Playwright page
 * @returns {Object} - Объект с методами для работы с запросами
 */
function setupNetworkLogs(page) {
  const requests = [];
  const responses = [];

  page.on('request', (request) => {
    requests.push({
      url: request.url(),
      method: request.method(),
      timestamp: new Date().toISOString(),
    });
  });

  page.on('response', (response) => {
    responses.push({
      url: response.url(),
      status: response.status(),
      timestamp: new Date().toISOString(),
    });
  });

  return {
    getRequests: () => requests,
    getResponses: () => responses,
  };
}

module.exports = {
  setupConsoleLogs,
  setupPageErrors,
  setupNetworkLogs,
};
