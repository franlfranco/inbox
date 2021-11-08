const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi, evm } = require('./compile');
 
provider = new HDWalletProvider(
  'scrap evidence hunt police advance shell scrub empower struggle topic early skirt',
  'https://rinkeby.infura.io/v3/6f1827cc208b4f57a32b3970374d99b5'
);
 
const web3 = new Web3(provider);
 
// The only reason we do this as a function
// is to use async calls
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
 
  console.log('Attempting to deploy from account ', accounts[0]);
 
  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: ['Hi there!'] })
    .send({ gas: '1000000', from: accounts[0] });
 
  console.log('Contract deployed to ', result.options.address);
  provider.engine.stop();
};
 
deploy();