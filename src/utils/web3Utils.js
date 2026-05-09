const env = require('../config/env');

/**
 * Утилиты для работы с Web3
 */
class Web3Utils {
  /**
   * Получить RPC URL
   */
  static getRpcUrl() {
    return env.WEB3_RPC_URL;
  }

  /**
   * Получить ID цепи
   */
  static getChainId() {
    return parseInt(env.WEB3_CHAIN_ID);
  }

  /**
   * Получить имя цепи
   */
  static getChainName() {
    return env.WEB3_CHAIN_NAME;
  }

  /**
   * Получить адрес контракта
   */
  static getContractAddress() {
    return env.WEB3_DEFAULT_CONTRACT_ADDRESS;
  }

  /**
   * Получить тестовый адрес кошелька
   */
  static getTestAddress() {
    return env.WEB3_DEFAULT_TEST_ADDRESS;
  }

  /**
   * Получить имя контракта
   */
  static getContractName() {
    return env.WEB3_CONTRACT_NAME;
  }

  /**
   * Получить все параметры Web3
   */
  static getWeb3Config() {
    return {
      rpcUrl: this.getRpcUrl(),
      chainId: this.getChainId(),
      chainName: this.getChainName(),
      contractAddress: this.getContractAddress(),
      testAddress: this.getTestAddress(),
      contractName: this.getContractName(),
    };
  }
}

module.exports = Web3Utils;
