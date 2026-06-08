const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:3000/');
  await page.waitForLoadState('networkidle');

  const html = await page.content();

  console.log('Проверка HTML:\n');
  console.log(`HTML содержит "Destination Address": ${html.includes('Destination Address')}`);
  console.log(`HTML содержит "Amount to send": ${html.includes('Amount to send')}`);
  console.log(`HTML содержит placeholder: ${html.includes('placeholder')}`);

  // Найти контекст вокруг этих строк
  if (html.includes('Destination Address')) {
    const idx = html.indexOf('Destination Address');
    console.log(`\nКонтекст вокруг "Destination Address":`);
    console.log(html.substring(Math.max(0, idx - 100), idx + 150));
  }

  if (html.includes('Amount to send')) {
    const idx = html.indexOf('Amount to send');
    console.log(`\nКонтекст вокруг "Amount to send":`);
    console.log(html.substring(Math.max(0, idx - 100), idx + 150));
  }

  // Посчитаем элементы
  const inputs = await page.locator('input').all();
  console.log(`\nВсего input элементов: ${inputs.length}`);

  for (let inp of inputs) {
    const placeholder = await inp.getAttribute('placeholder');
    console.log(`  placeholder: "${placeholder}"`);
  }

  await browser.close();
})();
