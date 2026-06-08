const env = require('../config/env');

/**
 * Make a JSON-RPC 2.0 call to the Ethereum node.
 * Works in both API tests (via Playwright request fixture) and plain Node contexts.
 *
 * @param {import('@playwright/test').APIRequestContext | null} request - Playwright request fixture, or null to use fetch
 * @param {string} method - RPC method name
 * @param {Array} [params=[]] - RPC params
 */
async function rpcCall(request, method, params = []) {
  const body = { jsonrpc: '2.0', id: 1, method, params };

  let responseBody;
  if (request) {
    const res = await request.post(env.WEB3_RPC_URL, { data: body });
    responseBody = await res.json();
  } else {
    const res = await fetch(env.WEB3_RPC_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    responseBody = await res.json();
  }

  if (responseBody.error) throw new Error(`RPC error [${method}]: ${responseBody.error.message}`);
  return responseBody.result;
}

/**
 * Convert a hex Wei string (e.g. "0x1bc16d674ec80000") to ETH as a float.
 * Precision is sufficient for display comparison (±0.0001 ETH).
 */
function weiHexToEth(hexWei) {
  return Number(BigInt(hexWei)) / 1e18;
}

/**
 * Parse a balance string as displayed in the UI, e.g. "9999.9994ETH" → 9999.9994.
 */
function parseDisplayedBalance(text) {
  return parseFloat(text?.replace(/[^0-9.]/g, '') || '0');
}

module.exports = { rpcCall, weiHexToEth, parseDisplayedBalance };
