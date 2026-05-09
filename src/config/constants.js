/**
 * Константы и конфигурация для тестов
 */

const constants = {
  // Таймауты
  TIMEOUT: {
    SHORT: 5000,
    MEDIUM: 10000,
    LONG: 30000,
    VERY_LONG: 60000,
  },

  // Сетевые таймауты
  NETWORK_TIMEOUT: {
    API: 15000,
    PAGE_LOAD: 30000,
  },

  // Реквизиты
  RETRY: {
    COUNT: 3,
    INTERVAL: 1000,
  },

  // Порты и адреса
  ADDRESSES: {
    LOCAL: 'http://localhost:3000',
    WEB3_RPC: 'http://127.0.0.1:8545',
  },

  // Web3 параметры
  WEB3: {
    CHAIN_ID: 31337,
    CHAIN_NAME: 'Hardhat',
  },

  // Типы браузеров
  BROWSERS: {
    CHROMIUM: 'chromium',
    FIREFOX: 'firefox',
    WEBKIT: 'webkit',
  },
};

module.exports = constants;
