const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const {interface, bytecode} = require('../compile');

const web3 = new Web3(ganache.provider());

let accounts;
let lottery;


beforeEach(async()=>{
    accounts = await web3.eth.getAccounts();

    lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
        data: bytecode,
    })
    .send({
        from : accounts[0],
        gas: 1500000,
        gasPrice: '30000000000000'
    })
});

describe('Lottery', ()=>{
    it('deploys a contract',()=>{
     // console.log(accounts);
     // console.log(inbox);
     assert.ok(lottery.options.address);
    });

    it('allow multi account to enter', async()=>{
        //address add = await lottery.methods.managers().call();
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('2','ether')
        });

        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('2','ether')
        });

        await lottery.methods.enter().send({
            from: accounts[2],
            value: web3.utils.toWei('2','ether')
        });

        const players= await lottery.methods.getPlayer().call({
            from: accounts[0]
        });
        assert.equal(accounts[0], players[0]);
        assert.equal(3,players.length);

    });

    it('send monney to winner and reset player', async()=>{
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('2','ether')
        });
        const initialBalance = await web3.eth.getBalance(accounts[0]);
        console.log(initialBalance);
        await lottery.methods.pickWinner().send({
            from: accounts[0]
        })
        const finalBalance = await web3.eth.getBalance(accounts[0]);
        console.log(finalBalance-initialBalance);
        
    });
    /*
    it('has a default message', async ()=>{
        const message = await inbox.methods.message().call();  //call 1 funtion, not fee cost
        assert.equal(message,'Solana');
    });

    it('can change the message', async() =>{
        await inbox.methods.setMessage('bye bye').send({from:accounts[1]}); //return 1 tx, have fee cost
        const message = await inbox.methods.message().call();  
        assert.equal(message,'bye bye');
    });
    */
});