const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log('=== MAIN PAGE INSPECTION ===\n');
  await page.goto('http://localhost:3000/');
  await page.waitForLoadState('networkidle');
  
  // Find Faucet button
  console.log('Looking for Faucet button...');
  const bodyText = await page.textContent('body');
  console.log('Contains "Faucet":', bodyText?.includes('Faucet'));
  
  // Get all buttons
  const buttons = await page.locator('button').all();
  console.log(`\nButtons on main page: ${buttons.length}`);
  for (let i = 0; i < buttons.length; i++) {
    const text = await buttons[i].textContent();
    if (text?.trim()) {
      console.log(`  ${i}: ${text.trim()}`);
    }
  }
  
  // Look for Faucet modal after clicking
  console.log('\n--- After clicking button with Faucet ---');
  const faucetBtn = page.locator('text=Faucet, Local Faucet, or similar');
  const foundText = await page.textContent('body');
  
  // Look for input fields
  console.log('\nLooking for input fields...');
  const inputs = await page.locator('input').all();
  console.log(`Inputs found: ${inputs.length}`);
  for (let i = 0; i < inputs.length; i++) {
    const placeholder = await inputs[i].getAttribute('placeholder');
    const name = await inputs[i].getAttribute('name');
    const type = await inputs[i].getAttribute('type');
    console.log(`  ${i}: placeholder="${placeholder}" name="${name}" type="${type}"`);
  }
  
  await browser.close();
})();
