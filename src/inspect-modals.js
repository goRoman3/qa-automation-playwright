const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:3000/');
  await page.waitForLoadState('networkidle');

  console.log('=== ИНСПЕКЦИЯ СТРАНИЦЫ ===\n');

  // 1. Проверяем все заголовки и тексты
  console.log('📋 Текстовые элементы на странице:');
  const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
  for (let h of headings) {
    const text = await h.textContent();
    console.log(`  ${text?.trim()}`);
  }

  // 2. Проверяем все кнопки
  console.log('\n🔘 Кнопки:');
  const buttons = await page.locator('button').all();
  console.log(`  Всего кнопок: ${buttons.length}`);
  for (let i = 0; i < buttons.length; i++) {
    const text = await buttons[i].textContent();
    const visible = await buttons[i].isVisible().catch(() => false);
    console.log(`  ${i+1}. "${text?.trim()}" (видима: ${visible})`);
  }

  // 3. Проверяем модальные окна
  console.log('\n🪟 Модальные окна и диалоги:');
  const modals = await page.locator('[role="dialog"], .modal, .dialog, [aria-modal="true"]').all();
  console.log(`  Найдено модальных окон: ${modals.length}`);
  for (let i = 0; i < modals.length; i++) {
    const text = await modals[i].textContent();
    const visible = await modals[i].isVisible().catch(() => false);
    console.log(`  Модаль ${i+1}: видима=${visible}, текст="${text?.substring(0, 50)}..."`);
  }

  // 4. Проверяем оверлеи/бэкдропы
  console.log('\n🎭 Оверлеи и фоновые слои:');
  const overlays = await page.locator('[class*="overlay"], [class*="backdrop"], [class*="modal-bg"]').all();
  console.log(`  Найдено оверлеев: ${overlays.length}`);

  // 5. Проверяем наличие Hidden элементов
  console.log('\n👻 Скрытые элементы:');
  const hidden = await page.locator('[style*="display: none"], [style*="visibility: hidden"], [hidden]').all();
  console.log(`  Скрытых элементов: ${hidden.length}`);

  // 6. Проверяем фокус
  console.log('\n🎯 Элемент в фокусе:');
  const focused = await page.evaluate(() => {
    const el = document.activeElement;
    return {
      tag: el?.tagName,
      text: el?.textContent?.substring(0, 50),
      class: el?.className
    };
  });
  console.log(`  ${JSON.stringify(focused, null, 2)}`);

  // 7. Проверяем Local Faucet конкретно
  console.log('\n💧 Faucet элементы:');
  const faucetHeading = await page.locator('h3:has-text("Local Faucet")').count();
  console.log(`  h3 "Local Faucet": ${faucetHeading}`);

  const faucetSection = await page.locator('text=Local Faucet').all();
  console.log(`  Элементы с текстом "Local Faucet": ${faucetSection.length}`);

  for (let el of faucetSection) {
    const visible = await el.isVisible().catch(() => false);
    const tag = await el.evaluate(e => e.tagName);
    console.log(`    <${tag}> видима=${visible}`);
  }

  // 8. Инпуты
  console.log('\n📝 Input элементы:');
  const inputs = await page.locator('input').all();
  console.log(`  Всего инпутов: ${inputs.length}`);
  for (let i = 0; i < inputs.length; i++) {
    const placeholder = await inputs[i].getAttribute('placeholder');
    const type = await inputs[i].getAttribute('type');
    const visible = await inputs[i].isVisible().catch(() => false);
    if (placeholder || type !== 'checkbox') {
      console.log(`  ${i+1}. placeholder="${placeholder}" type="${type}" видим=${visible}`);
    }
  }

  await browser.close();
  console.log('\n✅ Инспекция завершена');
})();
