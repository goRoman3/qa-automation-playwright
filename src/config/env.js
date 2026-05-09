require('dotenv').config();

module.exports = {
  BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
  WEB3_RPC_URL: process.env.WEB3_RPC_URL || 'http://127.0.0.1:8545',
  WEB3_CHAIN_NAME: process.env.WEB3_CHAIN_NAME || 'Hardhat',
  WEB3_CHAIN_ID: process.env.WEB3_CHAIN_ID || 31337,
  WEB3_CONTRACT_NAME: process.env.WEB3_CONTRACT_NAME || 'YourContract',
  WEB3_DEFAULT_CONTRACT_ADDRESS: process.env.WEB3_DEFAULT_CONTRACT_ADDRESS || '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  WEB3_DEFAULT_TEST_ADDRESS: process.env.WEB3_DEFAULT_TEST_ADDRESS || '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
};
