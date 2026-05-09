/**
 * Тестовые данные
 */
const testData = {
  /**
   * Пользовательские аккаунты для тестирования
   */
  users: {
    admin: {
      address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
      privateKey: '0xac0974bec39a17e36ba4a6b4d238ff944bacb476c6b8d9a88a0c7a3e4f5c3f1e',
    },
    user1: {
      address: '0x70997970C51812e339D9B73b0245ad59cc793a3A',
      privateKey: '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d',
    },
    user2: {
      address: '0x3C44CdDdB6a900c6671B6369AD27029B6F7EE369',
      privateKey: '0x5de4111afa1a4b94908f83103db1fb1da94b0bc5be30dd5a1017139be0e6521e',
    },
  },

  /**
   * Контракт и адреса
   */
  contracts: {
    greeterAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    deployerAddress: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  },

  /**
   * Примеры значений для формы
   */
  forms: {
    greeting: 'Hello, Blockchain!',
    invalidInput: '!@#$%^&*()',
    longText: 'A'.repeat(1000),
  },

  /**
   * Селекторы UI элементов (примеры)
   */
  selectors: {
    // Добавьте ваши селекторы здесь
    // button.submitBtn
    // input#greetingInput
  },
};

module.exports = testData;
