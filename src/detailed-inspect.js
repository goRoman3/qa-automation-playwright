const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:3000/');
  await page.waitForLoadState('networkidle');

  console.log('=== ДЕТАЛЬНАЯ ИНСПЕКЦИЯ КНОПОК ===\n');

  // Получаем всю информацию о кнопках
  const buttonsInfo = await page.evaluate(() => {
    const buttons = document.querySelectorAll('button');
    const result = [];

    buttons.forEach((btn, idx) => {
      const rect = btn.getBoundingClientRect();
      const styles = window.getComputedStyle(btn);
      const isVisible = rect.width > 0 && rect.height > 0 && styles.display !== 'none' && styles.visibility !== 'hidden';

      result.push({
        index: idx,
        text: btn.textContent?.trim().substring(0, 50) || '[пусто]',
        visible: isVisible,
        type: btn.type,
        id: btn.id,
        class: btn.className,
        ariaLabel: btn.getAttribute('aria-label'),
        dataTestId: btn.getAttribute('data-testid'),
        onclick: !!btn.onclick,
        innerHTML: btn.innerHTML.substring(0, 100)
      });
    });

    return result;
  });

  console.log(`Всего кнопок: ${buttonsInfo.length}\n`);

  // Выводим видимые
  console.log('ВИДИМЫЕ КНОПКИ:');
  buttonsInfo.filter(b => b.visible).forEach(b => {
    console.log(`  ${b.index}. "${b.text}"`);
    if (b.ariaLabel) console.log(`     aria-label: ${b.ariaLabel}`);
  });

  // Выводим все остальные
  console.log('\nСКРЫТЫЕ КНОПКИ:');
  buttonsInfo.filter(b => !b.visible).forEach(b => {
    console.log(`  ${b.index}. "${b.text}"`);
  });

  // Ищем по текст-контенту
  console.log('\n=== ПОИСК ПО ТЕКСТОВОМУ СОДЕРЖИМОМУ ===\n');

  const searchResults = await page.evaluate(() => {
    const buttons = document.querySelectorAll('button');
    const result = {
      connectWallet: null,
      localFaucet: null,
      send: null
    };

    buttons.forEach((btn, idx) => {
      const text = btn.textContent?.toLowerCase() || '';
      if (text.includes('connect') && text.includes('wallet')) {
        result.connectWallet = {
          index: idx,
          text: btn.textContent?.trim(),
          visible: btn.offsetHeight > 0 && btn.offsetWidth > 0
        };
      }
      if (text.includes('faucet')) {
        result.localFaucet = {
          index: idx,
          text: btn.textContent?.trim(),
          visible: btn.offsetHeight > 0 && btn.offsetWidth > 0
        };
      }
      if (text.includes('send') && !text.includes('transaction')) {
        result.send = {
          index: idx,
          text: btn.textContent?.trim(),
          visible: btn.offsetHeight > 0 && btn.offsetWidth > 0
        };
      }
    });

    return result;
  });

  console.log('Connect Wallet:', searchResults.connectWallet);
  console.log('Faucet:', searchResults.localFaucet);
  console.log('Send:', searchResults.send);

  // Проверяем наличие элементов которые нам нужны
  console.log('\n=== ПРОВЕРКА НЕОБХОДИМЫХ ЭЛЕМЕНТОВ ===\n');

  const hasConnectWalletBtn = await page.locator('button').filter({ hasText: /Connect\s+Wallet/i }).count();
  const hasFaucetText = await page.textContent('body');
  const hasFaucetHeading = await page.locator('h3').filter({ hasText: /Faucet/i }).count();
  const hasSendBtn = await page.locator('button').filter({ hasText: /^Send$/i }).count();
  const hasDestinationInput = await page.locator('input[placeholder*="Destination"]').count();
  const hasAmountInput = await page.locator('input[placeholder*="Amount"]').count();

  console.log(`"Connect Wallet" кнопка: ${hasConnectWalletBtn}`);
  console.log(`Текст "Faucet" на странице: ${hasFaucetText?.includes('Faucet')}`);
  console.log(`Заголовок "Faucet": ${hasFaucetHeading}`);
  console.log(`"Send" кнопка: ${hasSendBtn}`);
  console.log(`Инпут "Destination Address": ${hasDestinationInput}`);
  console.log(`Инпут "Amount to send": ${hasAmountInput}`);

  await browser.close();
})();
