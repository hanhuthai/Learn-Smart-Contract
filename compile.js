
// const path = require('path'); //tham chieu toi module path va gan = path
// const fs = require('fs');
// const solc = require('solc');

// const lotteryPath = path.resolve(__dirname,'contracts', 'Lottery.sol');
// const source = fs.readFileSync(lotteryPath,'utf8');

// console.log("kkkkkkkkkkkkk")
// console.log(solc.compile(source,1));
//export innterface and byte code from Inbox co1ntract
//module.exports = solc.compile(source,1).contracts[':Lottery'];
//console.log(JSON.parse(solc.compile(source,1).contracts[':Lottery']));

const path = require('path');
const fs = require('fs');
const solc = require('solc');

const Lotterypath = path.resolve(__dirname, 'Contracts', 'Lottery.sol');
const source = fs.readFileSync(Lotterypath, 'UTF-8');

var input = {
    language: 'Solidity',
    sources: {
        'Lottery.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));

//console.log(output.contracts['Lottery.sol']['Lottery']);

exports.abi = output.contracts['Lottery.sol']['Lottery'].abi;
exports.bytecode = output.contracts['Lottery.sol']['Lottery'].evm.bytecode.object;