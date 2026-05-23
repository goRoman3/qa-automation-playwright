# Page Object Models - Руководство

## Структура

В проекте созданы следующие Page Objects:

### 1. **BasePage** (`src/pages/basePage.js`)
Базовый класс со всеми общими методами для работы с страницами:
- `goto(url)` - перейти на страницу
- `click(selector)` - кликнуть на элемент
- `fill(selector, text)` - заполнить поле
- `getText(selector)` - получить текст
- `isVisible(selector)` - проверить видимость
- `waitForPageLoad()` - ждать загрузки страницы

### 2. **HomePage** (`src/pages/homePage.js`)
Page Object для главной страницы `http://localhost:3000/`

**Основные методы:**
- `navigateToHome()` - перейти на главную
- `clickConnectWallet()` - кликнуть на Connect Wallet
- `isConnectWalletVisible()` - проверить видимость кнопки
- `isPageLoaded()` - проверить загрузку страницы
- `getPageTitle()` - получить заголовок
- `isContentVisible()` - проверить видимость контента

**Пример использования:**
```javascript
const { test } = require('@playwright/test');
const HomePage = require('../pages/homePage');

test('test home page', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHome();
  await homePage.clickConnectWallet();
});
```

### 3. **DebugPage** (`src/pages/debugPage.js`)
Page Object для debug страницы `http://localhost:3000/debug`

**Основные методы:**
- `navigateToDebug()` - перейти на debug страницу
- `getButtonCount()` - получить количество кнопок
- `getInputCount()` - получить количество инпутов
- `clickDisconnect()` - отписать кошелек
- `clickBalance()` - кликнуть на баланс
- `getBalance()` - получить баланс
- `getInputValue(index)` - получить значение инпута по индексу
- `getAllInputs()` - получить все инпуты

**Пример использования:**
```javascript
const DebugPage = require('../pages/debugPage');

test('test debug page', async ({ page }) => {
  const debugPage = new DebugPage(page);
  await debugPage.navigateToDebug();
  const balance = await debugPage.getBalance();
  console.log(balance);
});
```

### 4. **Modal** (`src/pages/modal.js`)
Отдельный Page Object для работы с модальными окнами и диалогами

**Рекомендация:** 
Этот класс создан **отдельно**, чтобы его можно было использовать:
- ✅ Независимо в любых тестах
- ✅ В комбинации с другими Page Objects
- ✅ В разных страницах где появляются одни и те же модали

**Основные методы:**
- `isModalOpen()` - проверить, открыта ли модаль
- `getModalText()` - получить текст модали
- `closeModal()` - закрыть модаль по кнопке
- `closeModalByBackdrop()` - закрыть модаль по бэкдропу
- `getModalButtons()` - получить все кнопки в модали
- `clickModalButton(text)` - кликнуть на кнопку по тексту
- `getModalTitle()` - получить заголовок модали
- `waitForModalOpen()` - ждать открытия модали
- `waitForModalClose()` - ждать закрытия модали

**Пример использования:**
```javascript
const HomePage = require('../pages/homePage');
const Modal = require('../pages/modal');

test('test modal on home page', async ({ page }) => {
  const homePage = new HomePage(page);
  const modal = new Modal(page);
  
  await homePage.navigateToHome();
  await homePage.clickConnectWallet();
  
  // Модаль с выбором кошелька может появиться
  expect(await modal.isModalOpen()).toBeTruthy();
  await modal.clickModalButton('MetaMask');
  await modal.waitForModalClose();
});
```

## Когда использовать отдельный Modal класс?

### ✅ **Используйте отдельный Modal класс когда:**
1. **Одна и та же модаль появляется в разных местах** приложения
   - Например, Confirm Dialog может быть на разных страницах
   
2. **Хотите переиспользовать логику работы с модалями**
   - Написали методы работы с модалью один раз, используете везде

3. **Модаль имеет сложную структуру** с несколькими инпутами и кнопками
   - Логичнее вынести её в отдельный класс

### ❌ **Можете оставить в основном Page Object когда:**
1. **Модаль уникальна** для конкретной страницы
2. **Простая логика** (одна кнопка, минимум взаимодействий)
3. **Не переиспользуется** в других страницах

## Структура проекта после изменений

```
src/
├── pages/
│   ├── basePage.js          # Базовый класс
│   ├── homePage.js          # Главная страница
│   ├── debugPage.js         # Debug страница
│   └── modal.js             # Модальные окна и диалоги
└── tests/
    └── ui/
        ├── example.spec.js  # Примеры тестов
        └── pages.spec.js    # Тесты Page Objects
```

## Best Practices

1. **Одна ответственность** - каждый Page Object отвечает за одну страницу или компонент
2. **Описательные имена методов** - методы должны ясно описывать что они делают
3. **Селекторы в переменных** - всегда храните селекторы как свойства класса
4. **Async/await** - используйте async/await везде
5. **Комментарии** - документируйте сложные методы

## Добавление новых страниц

Для добавления новой страницы:

```javascript
const BasePage = require('./basePage');

class NewPage extends BasePage {
  // Селекторы
  selector1 = 'button.primary';
  selector2 = 'input#email';

  constructor(page) {
    super(page);
  }

  async navigateToNewPage() {
    await this.goto('/new-page');
    await this.waitForPageLoad();
  }

  async clickPrimaryButton() {
    await this.click(this.selector1);
  }

  async fillEmail(email) {
    await this.fill(this.selector2, email);
  }
}

module.exports = NewPage;
```

Тогда в тестах:

```javascript
const NewPage = require('../pages/newPage');

test('test new page', async ({ page }) => {
  const newPage = new NewPage(page);
  await newPage.navigateToNewPage();
  await newPage.fillEmail('test@example.com');
  await newPage.clickPrimaryButton();
});
```
