const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:3000/');
  await page.waitForLoadState('networkidle');

  const bodyText = await page.textContent('body');

  console.log('Проверка текста на странице:\n');
  console.log(`Содержит "Local Faucet": ${bodyText?.includes('Local Faucet')}`);
  console.log(`Содержит "Destination Address": ${bodyText?.includes('Destination Address')}`);
  console.log(`Содержит "Amount to send": ${bodyText?.includes('Amount to send')}`);
  console.log(`Содержит "Destination": ${bodyText?.includes('Destination')}`);
  console.log(`Содержит "Amount": ${bodyText?.includes('Amount')}`);

  // Ищем похожие строки
  console.log('\nПоиск по частям:');
  const lines = bodyText?.split('\n') || [];
  lines.forEach((line, idx) => {
    const text = line.trim();
    if (text.toLowerCase().includes('destination') ||
        text.toLowerCase().includes('amount') ||
        text.toLowerCase().includes('address') ||
        text.toLowerCase().includes('faucet')) {
      console.log(`  Line ${idx}: "${text.substring(0, 80)}"`);
    }
  });

  await browser.close();
})();
