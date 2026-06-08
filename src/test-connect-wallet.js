const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:3000/');
  await page.waitForLoadState('networkidle');

  console.log('=== КЛИК НА CONNECT WALLET И АНАЛИЗ ===\n');

  // Получаем текущий HTML
  console.log('ПЕРЕД КЛИКОМ:');
  const bodyBefore = await page.innerHTML('body');
  console.log(`Размер HTML: ${bodyBefore.length} символов`);
  console.log(`Содержит "Local Faucet": ${bodyBefore.includes('Local Faucet')}`);
  console.log(`Содержит "Destination Address": ${bodyBefore.includes('Destination Address')}`);

  // Проверяем видимые элементы
  let visibleButtons = await page.locator('button:visible').count();
  console.log(`Видимых кнопок до клика: ${visibleButtons}`);

  // Кликаем на Connect Wallet
  console.log('\n⏳ Кликаем на Connect Wallet...');
  try {
    await page.click('button:has-text("Connect Wallet")');
    await page.waitForTimeout(1000);

    console.log('✓ Клик выполнен');

    // Проверяем что изменилось
    const bodyAfter = await page.innerHTML('body');
    console.log(`\nПОСЛЕ КЛИКА:`);
    console.log(`Размер HTML: ${bodyAfter.length} символов`);
    console.log(`Содержит "Local Faucet": ${bodyAfter.includes('Local Faucet')}`);
    console.log(`Содержит "Destination Address": ${bodyAfter.includes('Destination Address')}`);

    visibleButtons = await page.locator('button:visible').count();
    console.log(`Видимых кнопок после клика: ${visibleButtons}`);

    // Получаем все видимые кнопки с текстом
    const allVisibleButtons = await page.locator('button:visible').all();
    console.log(`\nВидимые кнопки:`);
    for (let btn of allVisibleButtons) {
      const text = await btn.textContent();
      console.log(`  • "${text?.trim()}"`);
    }

    // Ищем что-то с "Faucet" в видимом тексте
    const bodyText = await page.textContent('body');
    if (bodyText?.includes('Faucet')) {
      console.log(`\n✓ Текст "Faucet" видим на странице`);
    }

    // Проверяем все headings
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    console.log(`\nЗаголовки:`);
    for (let h of headings) {
      const text = await h.textContent();
      const visible = await h.isVisible().catch(() => false);
      if (visible || text?.includes('Faucet')) {
        console.log(`  ${text?.trim()} (видим: ${visible})`);
      }
    }

  } catch (e) {
    console.log(`✗ Ошибка при клике: ${e.message}`);
  }

  await browser.close();
})();
