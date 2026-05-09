# QA Automation - Playwright

Проект автоматизации тестирования для веб-приложения на localhost:3000 с поддержкой Web3.

## Структура проекта

```
src/
├── pages/           # Page Object Models для страниц приложения
├── tests/           # Тестовые сценарии
│   ├── ui/          # UI тесты
│   └── api/         # API тесты
├── utils/           # Вспомогательные функции и утилиты
├── fixtures/        # Playwright фикстуры
└── config/          # Конфигурационные файлы

test-data/          # Данные для тестирования
reports/            # Отчеты тестирования
```

## Установка

```bash
npm install
```

## Переменные окружения

Создайте файл `.env` с следующими переменными:

```env
BASE_URL=http://localhost:3000
WEB3_RPC_URL=http://127.0.0.1:8545
WEB3_CHAIN_NAME=Hardhat
WEB3_CHAIN_ID=31337
WEB3_CONTRACT_NAME=YourContract
WEB3_DEFAULT_CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
WEB3_DEFAULT_TEST_ADDRESS=0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
```

## Запуск тестов

```bash
# Запуск всех тестов
npm test

# Запуск с UI (видим прогресс в реальном времени)
npm run test:ui

# Запуск с браузером (headless: false)
npm run test:headed

# Запуск в debug режиме
npm run test:debug

# Запуск только smoke тестов
npm run test:smoke

# Просмотр отчета
npm run test:report

# Codegen (запись действий пользователя)
npm run codegen
```

## Требования

- Node.js >= 18
- npm или yarn
- Локальный веб-сервер на http://localhost:3000
- Hardhat сеть на http://127.0.0.1:8545
