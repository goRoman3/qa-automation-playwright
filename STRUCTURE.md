## 📋 Структура проекта QA Automation Playwright

### ✅ Что было сделано:

1. **Полностью обнулен проект** - удалены старые тесты, утилиты и конфигурации
2. **Создана новая файловая структура** для современной автоматизации тестирования
3. **Установлены переменные окружения** для подключения к локальному сервису

### 📁 Структура папок:

```
qa-automation-playwright/
├── src/                          # Исходный код
│   ├── config/                   # Конфигурация
│   │   ├── constants.js          # Константы (таймауты, браузеры, адреса)
│   │   └── env.js                # Переменные окружения
│   │
│   ├── pages/                    # Page Object Model
│   │   ├── basePage.js           # Базовый класс для всех страниц
│   │   └── homePage.js           # Пример Page Object
│   │
│   ├── tests/                    # Тестовые сценарии
│   │   ├── ui/                   # UI тесты
│   │   │   └── example.spec.js   # Пример UI теста
│   │   └── api/                  # API тесты
│   │       └── example.spec.js   # Пример API теста
│   │
│   ├── utils/                    # Вспомогательные функции
│   │   ├── web3Utils.js          # Работа с Web3 параметрами
│   │   ├── formUtils.js          # Работа с формами
│   │   ├── timeUtils.js          # Работа со временем и таймаутами
│   │   ├── storageUtils.js       # Работа с localStorage и cookies
│   │   └── browserUtils.js       # Работа с браузером
│   │
│   └── fixtures/                 # Playwright фикстуры
│       └── base.js               # Базовые фикстуры
│
├── test-data/                    # Данные для тестирования
│   └── testData.js               # Пример тестовых данных
│
├── reports/                      # Отчеты тестирования
├── playwright-report/            # HTML отчет Playwright
│
├── .env                          # Переменные окружения (локальные)
├── .env.prod                     # Production переменные
├── .env.staging                  # Staging переменные
├── .gitignore                    # Git ignore список
├── playwright.config.js          # Конфигурация Playwright
├── package.json                  # NPM зависимости
├── README.md                     # Документация проекта
└── start.sh                      # Скрипт запуска
```

### 🔑 Переменные окружения (.env):

```env
BASE_URL=http://localhost:3000
WEB3_RPC_URL=http://127.0.0.1:8545
WEB3_CHAIN_NAME=Hardhat
WEB3_CHAIN_ID=31337
WEB3_CONTRACT_NAME=YourContract
WEB3_DEFAULT_CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
WEB3_DEFAULT_TEST_ADDRESS=0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
```

### 🚀 Команды для запуска:

```bash
# Установка зависимостей
npm install

# Запуск всех тестов
npm test

# Интерактивный UI режим
npm run test:ui

# Запуск с видимым браузером
npm run test:headed

# Debug режим
npm run test:debug

# Smoke тесты
npm run test:smoke

# Просмотр отчета
npm run test:report

# Запись действий пользователя (codegen)
npm run codegen
```

### 📝 Использование Page Object Model:

```javascript
// Создание Page Object
class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailField = 'input[name="email"]';
    this.passwordField = 'input[name="password"]';
    this.submitButton = 'button[type="submit"]';
  }

  async login(email, password) {
    await this.fill(this.emailField, email);
    await this.fill(this.passwordField, password);
    await this.click(this.submitButton);
  }
}
```

### 💡 Использование утилит:

```javascript
// Web3 утилиты
const Web3Utils = require('../utils/web3Utils');
const contractAddress = Web3Utils.getContractAddress();
const chainId = Web3Utils.getChainId();

// Утилиты для форм
const FormUtils = require('../utils/formUtils');
await FormUtils.fillForm(page, {
  '#email': 'test@example.com',
  '#password': 'password123'
});

// Утилиты для времени
const TimeUtils = require('../utils/timeUtils');
await TimeUtils.sleep(1000);
await TimeUtils.waitFor(() => condition, 5000);

// Storage утилиты
const StorageUtils = require('../utils/storageUtils');
await StorageUtils.setLocalStorage(page, 'token', 'abc123');
```

### 🔍 Тестовые данные:

Используйте предзаполненные адреса из `test-data/testData.js`:
- Admin адрес: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
- User1 адрес: `0x70997970C51812e339D9B73b0245ad59cc793a3A`
- User2 адрес: `0x3C44CdDdB6a900c6671B6369AD27029B6F7EE369`

### 📊 Отчеты:

После запуска тестов отчеты будут доступны:
- HTML отчет: `playwright-report/index.html`
- JSON отчет: `test-results/results.json`
- JUnit отчет: `test-results/junit.xml`

### ✨ Готово к использованию!

Проект полностью настроен и готов к написанию тестов для вашего локального веб-приложения на localhost:3000 с поддержкой Web3/Hardhat сети.
