/**
 * API ↔ UI Cross-check tests
 *
 * Each test fetches data from the Hardhat JSON-RPC node, then navigates
 * to the corresponding UI page and asserts the same data is displayed.
 */
const { test, expect } = require('@playwright/test');
const env = require('../../config/env');
const { rpcCall, weiHexToEth, parseDisplayedBalance } = require('../../utils/apiUtils');
const HomePage = require('../../pages/homePage');
const DebugPage = require('../../pages/debugPage');
const BlockExplorerPage = require('../../pages/blockExplorerPage');

test.describe('API ↔ UI Cross-check', () => {
  test('Faucet balance on UI matches Hardhat account balance from API', async ({ page, request }) => {
    // ── Step 1: get balance from JSON-RPC ──────────────────────────────────
    const hexBalance = await rpcCall(request, 'eth_getBalance', [
      env.WEB3_DEFAULT_TEST_ADDRESS,
      'latest',
    ]);
    const apiBalance = weiHexToEth(hexBalance);
    expect(apiBalance).toBeGreaterThan(0);

    // ── Step 2: load home page and read the faucet balance button ─────────
    // The faucet widget shows the Hardhat account balance as the last ETH button.
    const homePage = new HomePage(page);
    await homePage.navigateToHome();

    const faucetBtn = page.locator('button').filter({ hasText: /\d+\.\d+ETH/ }).last();
    const displayedText = await faucetBtn.textContent();
    const displayedBalance = parseDisplayedBalance(displayedText);

    // ── Step 3: assert values are consistent ──────────────────────────────
    // Allow ±1 ETH tolerance for gas costs and any faucet sends since node start.
    expect(displayedBalance).toBeGreaterThan(0);
    expect(Math.abs(apiBalance - displayedBalance)).toBeLessThan(1.0);
  });

  test('Same faucet balance appears on Debug page as on Home page', async ({ page, request }) => {
    // ── Step 1: API balance ────────────────────────────────────────────────
    const hexBalance = await rpcCall(request, 'eth_getBalance', [
      env.WEB3_DEFAULT_TEST_ADDRESS,
      'latest',
    ]);
    const apiBalance = weiHexToEth(hexBalance);

    // ── Step 2: read from debug page (faucet widget also present there) ───
    const debugPage = new DebugPage(page);
    await debugPage.navigateToDebug();

    // Wait for the faucet balance button to render with its RPC-fetched value
    const faucetBtn = page.locator('button').filter({ hasText: /\d+\.\d+ETH/ }).last();
    await faucetBtn.waitFor({ state: 'attached', timeout: 15000 });
    const displayedText = await faucetBtn.textContent();
    const displayedBalance = parseDisplayedBalance(displayedText);

    expect(Math.abs(apiBalance - displayedBalance)).toBeLessThan(1.0);
  });

  test('Block number from API > 0 and block explorer shows transactions', async ({ page, request }) => {
    // ── Step 1: current block number via API ───────────────────────────────
    const blockHex = await rpcCall(request, 'eth_blockNumber');
    const blockNumber = parseInt(blockHex, 16);
    expect(blockNumber).toBeGreaterThan(0);

    // ── Step 2: block explorer must list at least one transaction ─────────
    const explorerPage = new BlockExplorerPage(page);
    await explorerPage.navigateToBlockExplorer();
    const txCount = await explorerPage.getTransactionCount();
    // A positive block number implies at least the deployment tx exists.
    expect(txCount).toBeGreaterThan(0);
  });

  test('Contract is deployed in API and contract functions visible in Debug UI', async ({ page, request }) => {
    // ── Step 1: verify bytecode exists via API ─────────────────────────────
    const code = await rpcCall(request, 'eth_getCode', [
      env.WEB3_DEFAULT_CONTRACT_ADDRESS,
      'latest',
    ]);
    expect(code).not.toBe('0x');

    // ── Step 2: debug page must list contract read/write functions ─────────
    const debugPage = new DebugPage(page);
    await debugPage.navigateToDebug();

    expect(await debugPage.isPageLoaded()).toBeTruthy();
    expect(await debugPage.hasReadBlock()).toBeTruthy();
    expect(await debugPage.hasSendBlock()).toBeTruthy();

    // Function names (greeting, owner, etc.) appear as headings
    const items = await debugPage.getContractStateItems();
    expect(items.length).toBeGreaterThan(0);
  });
});
