const { test, expect } = require('@playwright/test');

test.describe('Анализ модальных окон', () => {
  test('Инспекция всех доступных модальных окон', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.waitForLoadState('networkidle');

    // Найти все видимые кнопки
    console.log('\n=== ВИДИМЫЕ КНОПКИ ===');
    const buttons = await page.locator('button:visible').all();
    console.log(`Найдено видимых кнопок: ${buttons.length}`);

    for (let btn of buttons) {
      const text = await btn.textContent();
      console.log(`  • "${text?.trim()}"`);
    }

    // Проверяем есть ли кнопка которая может открыть фаусет
    const ethButton = page.locator('button:has-text("ETH")');
    console.log(`\nКнопка с ETH: ${await ethButton.count()}`);

    // Попробуем найти кнопку которая открывает модали
    console.log('\n=== ПОИСК КНОПКИ ДЛЯ ОТКРЫТИЯ МОДАЛЕЙ ===');

    // Проверяем все кнопки без текста (они часто это иконки)
    const iconButtons = await page.locator('button:visible').filter({
      has: page.locator('svg, img, i, [class*="icon"]')
    }).all();
    console.log(`Кнопок с иконками: ${iconButtons.length}`);

    // Получим информацию о странице для анализа
    const bodyText = await page.textContent('body');
    const hasWallet = bodyText?.includes('Wallet');
    const hasFaucet = bodyText?.includes('Faucet');

    console.log(`\nСтраница содержит "Wallet": ${hasWallet}`);
    console.log(`Страница содержит "Faucet": ${hasFaucet}`);

    // Попробуем кликнуть на кнопки которые видны и посмотреть что откроется
    console.log('\n=== ПОПЫТКА ОТКРЫТЬ ФАУСЕТ ===');

    // Кнопка с адресом/кошельком (первая видимая кнопка)
    const firstBtn = buttons[0];
    if (firstBtn) {
      const btnText = await firstBtn.textContent();
      console.log(`Кликаем на кнопку: "${btnText?.trim()}"`);

      try {
        await firstBtn.click();
        await page.waitForTimeout(500);

        // Проверяем что открылось
        const modals = await page.locator('[role="dialog"]').all();
        console.log(`После клика открыто модальных окон: ${modals.length}`);

        for (let modal of modals) {
          const visible = await modal.isVisible().catch(() => false);
          if (visible) {
            const text = await modal.textContent();
            console.log(`  ✓ Видимое окно: ${text?.substring(0, 60)}...`);
          }
        }
      } catch (e) {
        console.log(`Ошибка при клике: ${e.message}`);
      }
    }
  });
});
