/**
 * Hardhat JSON-RPC API tests
 *
 * Validates the local Ethereum node at WEB3_RPC_URL directly,
 * without involving a browser. Uses Playwright's `request` fixture.
 */
const { test, expect } = require('@playwright/test');
const env = require('../../config/env');
const { rpcCall, weiHexToEth } = require('../../utils/apiUtils');

test.describe('Hardhat JSON-RPC API', () => {
  test('RPC node is reachable and returns a valid response', async ({ request }) => {
    const version = await rpcCall(request, 'net_version');
    expect(version).toBeTruthy();
  });

  test('Chain ID is Hardhat local network (31337)', async ({ request }) => {
    const chainIdHex = await rpcCall(request, 'eth_chainId');
    expect(parseInt(chainIdHex, 16)).toBe(parseInt(env.WEB3_CHAIN_ID));
  });

  test('Block number is greater than zero (chain is live)', async ({ request }) => {
    const blockHex = await rpcCall(request, 'eth_blockNumber');
    expect(parseInt(blockHex, 16)).toBeGreaterThan(0);
  });

  test('Hardhat test account has a positive ETH balance', async ({ request }) => {
    const hexBalance = await rpcCall(request, 'eth_getBalance', [
      env.WEB3_DEFAULT_TEST_ADDRESS,
      'latest',
    ]);
    expect(weiHexToEth(hexBalance)).toBeGreaterThan(0);
  });

  test('Contract address has deployed bytecode', async ({ request }) => {
    const code = await rpcCall(request, 'eth_getCode', [
      env.WEB3_DEFAULT_CONTRACT_ADDRESS,
      'latest',
    ]);
    // '0x' means no code — contract must be deployed
    expect(code).not.toBe('0x');
    expect(code.length).toBeGreaterThan(10);
  });

  test('Gas price is available and non-zero', async ({ request }) => {
    const gasPriceHex = await rpcCall(request, 'eth_gasPrice');
    expect(parseInt(gasPriceHex, 16)).toBeGreaterThan(0);
  });

  test('Transaction count for test account is a valid number', async ({ request }) => {
    const nonceHex = await rpcCall(request, 'eth_getTransactionCount', [
      env.WEB3_DEFAULT_TEST_ADDRESS,
      'latest',
    ]);
    expect(parseInt(nonceHex, 16)).toBeGreaterThanOrEqual(0);
  });
});
