const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {abi, bytecode} = require('./compile');
//console.log(abi);
//console.log(bytecode);


//provider: class to interact between web3 and a specified eth chain
const provider = new HDWalletProvider(
    'suit wide prefer kind engage boil devote favorite hobby runway convince point',
    'https://data-seed-prebsc-1-s1.binance.org:8545'
);
const web3= new Web3(provider);
const deploy =  async() =>{
   const accounts = await web3.eth.getAccounts();
   console.log('attempt to deploy from accout', accounts[0]);

   results = await new web3.eth.Contract(JSON.parse(abi))
   .deploy({
       data: bytecode 
   })
   .send({
       from : accounts[0],
       gas: 1500000,
      //  gasPrice: '30000000000000'
   })
   console.log('Contract deployed to', results.options.address);
   console.log(abi);
   provider.engine.stop();
};
deploy();

