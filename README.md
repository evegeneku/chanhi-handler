## Chanhi Handler

This npm package provides a versatile handler for blockchain communication and smart contract interactions.

### Features
- Connects to different blockchains using a custom API key.
- Supports Ethereum and other compatible networks.
- Simplifies interaction with smart contracts, NFTs, and blockchain data.

### Installation
```bash
npm install chanhi-handler

Usage
const ChanhiHandler = require('chanhi-handler');

const apiKey = 'YOUR_API_KEY';
const blockchainConfig = {
  rpcEndpoint: 'YOUR_RPC_ENDPOINT',
  apiEndpoint: 'https://api.example.com'
};

const handler = new ChanhiHandler(apiKey, blockchainConfig);

// Example: Get balance for a specific address
handler.getBalance('0xYourAddress').then(balance => {
  console.log('Balance:', balance);
});
