const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;
let INITIAL_STRING = 'Hi there!';

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts()
    // All web3.eth functions return promises => use .then()
        // .then(fetchedAccounts => { 
        //     console.log(fetchedAccounts);
        // });

    // Use one of those accounts to deploy 
    // the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
        .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        // Checks that the contract has an address
        assert.ok(inbox.options.address);
    });

    // Since we are calling a method this will be async
    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_STRING);
    });

    it('can change message', async () => {
        const newMessage = 'bye';
        await inbox.methods.setMessage(newMessage).send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, newMessage);
    });
});