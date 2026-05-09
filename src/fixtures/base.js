const { test: baseTest } = require('@playwright/test');
const env = require('../config/env');

/**
 * Базовая фикстура для всех тестов
 * Содержит дополнительные утилиты и конфигурацию
 */
const test = baseTest.extend({
  env: env,
  
  /**
   * Фикстура для логирования
   */
  logger: async ({}, use) => {
    const logger = {
      info: (msg) => console.log(`[INFO] ${msg}`),
      error: (msg) => console.error(`[ERROR] ${msg}`),
      warn: (msg) => console.warn(`[WARN] ${msg}`),
    };
    await use(logger);
  },
});

module.exports = { test };
