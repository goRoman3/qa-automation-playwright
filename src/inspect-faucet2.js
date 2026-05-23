const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3000/');
  await page.waitForLoadState('networkidle');
  
  // Find Faucet button/link
  console.log('=== FINDING FAUCET ===');
  const allElements = await page.locator('*:has-text("Faucet")').all();
  console.log(`Elements with "Faucet": ${allElements.length}`);
  
  for (let i = 0; i < allElements.length; i++) {
    const tag = await allElements[i].evaluate(el => el.tagName);
    const text = await allElements[i].textContent();
    console.log(`  ${i}: <${tag}> ${text?.substring(0, 50)}`);
  }
  
  // Click on Faucet button/link
  const faucetLink = page.locator('text="Local Faucet", text="Faucet"').first();
  console.log('\nAttempting to find and interact with Faucet...');
  
  // Look for button with "Send" text (faucet send button)
  const sendBtns = await page.locator('button:has-text("Send")').all();
  console.log(`\nSend buttons: ${sendBtns.length}`);
  
  for (let i = 0; i < sendBtns.length; i++) {
    const text = await sendBtns[i].textContent();
    const classes = await sendBtns[i].getAttribute('class');
    console.log(`  ${i}: "${text?.trim()}" class="${classes?.substring(0, 50)}"`);
  }
  
  // Get all h2/h3 headings
  console.log('\n=== HEADINGS ===');
  const headings = await page.locator('h1, h2, h3, h4').all();
  for (let h of headings) {
    const text = await h.textContent();
    console.log(`- ${text?.trim()}`);
  }
  
  // Get specific text that mentions faucet
  const bodyText = await page.textContent('body');
  const faucetIndex = bodyText?.indexOf('Faucet') || 0;
  if (faucetIndex > -1) {
    const snippet = bodyText?.substring(Math.max(0, faucetIndex - 50), faucetIndex + 100);
    console.log('\n=== FAUCET CONTEXT ===');
    console.log(snippet);
  }
  
  await browser.close();
})();
