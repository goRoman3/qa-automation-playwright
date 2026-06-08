const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('http://localhost:3000/');
  await page.waitForLoadState('networkidle');

  console.log('=== ДЕТАЛЬНЫЙ АНАЛИЗ МОДАЛЬНЫХ ОКОН ===\n');

  // Получаем информацию о модальных окнах через evaluate
  const modalInfo = await page.evaluate(() => {
    const modals = document.querySelectorAll('[role="dialog"], .modal, [aria-modal="true"]');
    const result = [];

    modals.forEach((modal, idx) => {
      const rect = modal.getBoundingClientRect();
      const styles = window.getComputedStyle(modal);
      const heading = modal.querySelector('h1, h2, h3, h4, h5, h6')?.textContent || 'N/A';

      result.push({
        index: idx,
        heading,
        display: styles.display,
        visibility: styles.visibility,
        opacity: styles.opacity,
        zIndex: styles.zIndex,
        rect: {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height
        },
        class: modal.className,
        hasCloseButton: !!modal.querySelector('[aria-label="Close"], button:has-text("✕"), .close')
      });
    });

    return result;
  });

  console.log('Найденные модальные окна:');
  modalInfo.forEach(m => {
    console.log(`\n📦 Модаль ${m.index + 1}:`);
    console.log(`  Заголовок: ${m.heading}`);
    console.log(`  Display: ${m.display}`);
    console.log(`  Visibility: ${m.visibility}`);
    console.log(`  Opacity: ${m.opacity}`);
    console.log(`  Z-index: ${m.zIndex}`);
    console.log(`  Position: top=${m.rect.top}, left=${m.rect.left}`);
    console.log(`  Размер: ${m.rect.width}x${m.rect.height}`);
    console.log(`  Класс: ${m.class}`);
  });

  // Теперь ищем как открыть фаусет
  console.log('\n\n=== ПОИСК КНОПКИ ОТКРЫТИЯ ФАУСЕТА ===\n');

  // Получить информацию о кнопках которые открывают модали
  const triggersInfo = await page.evaluate(() => {
    const buttons = document.querySelectorAll('button');
    const result = [];

    buttons.forEach((btn, idx) => {
      const rect = btn.getBoundingClientRect();
      const styles = window.getComputedStyle(btn);
      const isVisible = rect.width > 0 && rect.height > 0 && styles.display !== 'none';

      // Проверяем aria атрибуты
      const ariaControl = btn.getAttribute('aria-controls');
      const ariaLabel = btn.getAttribute('aria-label');
      const title = btn.getAttribute('title');

      if (isVisible || ariaControl || ariaLabel) {
        result.push({
          index: idx,
          text: btn.textContent?.trim().substring(0, 30) || '[empty]',
          visible: isVisible,
          ariaControl,
          ariaLabel,
          title,
          class: btn.className,
          onclick: btn.onclick?.toString()?.substring(0, 50)
        });
      }
    });

    return result;
  });

  console.log('Все кнопки:');
  triggersInfo.forEach(t => {
    console.log(`\n🔘 Кнопка ${t.index}:`);
    console.log(`  Текст: ${t.text}`);
    console.log(`  Видима: ${t.visible}`);
    console.log(`  aria-controls: ${t.ariaControl}`);
    console.log(`  aria-label: ${t.ariaLabel}`);
    console.log(`  title: ${t.title}`);
    console.log(`  class: ${t.class}`);
  });

  // Ищем элементы фаусета конкретно
  console.log('\n\n=== ПОИСК ФАУСЕТА ===\n');

  const faucetData = await page.evaluate(() => {
    // Ищем элемент с Local Faucet
    const faucetText = Array.from(document.querySelectorAll('*'))
      .find(el => el.textContent?.includes('Local Faucet'));

    if (faucetText) {
      // Наверх ищем его контейнер
      let container = faucetText;
      for (let i = 0; i < 10; i++) {
        if (container.role === 'dialog' || container.getAttribute('aria-modal') === 'true') {
          break;
        }
        container = container.parentElement;
      }

      const styles = window.getComputedStyle(container);
      const trigger = document.querySelector(`[aria-controls="${container.id}"]`);

      return {
        found: true,
        containerClass: container.className,
        containerId: container.id,
        display: styles.display,
        visibility: styles.visibility,
        triggerText: trigger?.textContent?.trim() || 'не найдена',
        hasInputs: !!container.querySelector('input'),
        inputCount: container.querySelectorAll('input').length
      };
    }

    return { found: false };
  });

  console.log('Информация о Фаусете:');
  console.log(JSON.stringify(faucetData, null, 2));

  await browser.close();
})();
