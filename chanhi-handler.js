const axios = require('axios');
const ethers = require('ethers');
const Web3 = require('web3');

class ChanhiHandler {
  constructor(apiKey, blockchain) {
    this.apiKey = apiKey;
    this.blockchain = blockchain;
    this.provider = new ethers.providers.JsonRpcProvider(this.blockchain.rpcEndpoint, {
      headers: { Authorization: `Bearer ${apiKey}` }
    });
    this.web3 = new Web3(new Web3.providers.HttpProvider(this.blockchain.rpcEndpoint));
  }

  async getBalance(address) {
    const balance = await this.provider.getBalance(address);
    return ethers.utils.formatEther(balance);
  }

  async getGasPrice() {
    const gasPrice = await this.provider.getGasPrice();
    return ethers.utils.formatUnits(gasPrice, 'gwei');
  }

  async fetchNFTMetadata(tokenId) {
    const response = await axios.get(`${this.blockchain.apiEndpoint}/nft/${tokenId}`);
    return response.data;
  }

  async sendTransaction(sender, receiver, amount) {
    const wallet = new ethers.Wallet(this.apiKey, this.provider);
    const transaction = await wallet.sendTransaction({
      to: receiver,
      value: ethers.utils.parseEther(amount)
    });
    return transaction.hash;
  }

  async deploySmartContract(contractBytecode, constructorArgs) {
    const wallet = new ethers.Wallet(this.apiKey, this.provider);
    const factory = new ethers.ContractFactory(contractBytecode, [], wallet);
    const contract = await factory.deploy(...constructorArgs);
    await contract.deployed();
    return contract.address;
  }

  async callSmartContractMethod(contractAddress, methodName, methodArgs) {
    const contract = new ethers.Contract(contractAddress, [], this.provider);
    const transaction = await contract[methodName](...methodArgs);
    return transaction.hash;
  }

  async interactWithWeb3Contract(contractAddress, abi, methodName, methodArgs) {
    const contract = new this.web3.eth.Contract(abi, contractAddress);
    const transaction = await contract.methods[methodName](...methodArgs).send({ from: this.apiKey });
    return transaction.transactionHash;
  }

  // Add more methods for blockchain communication logic
}

module.exports = ChanhiHandler;
