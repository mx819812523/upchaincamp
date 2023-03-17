// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Bank {
    mapping(address => uint) private accounts;

    modifier nonReentrant() {
        bool entered;
        require(!entered, "Bank: reentrant call");
        entered = true;
        _;
        entered = false;
    }

    function balanceOf() public view returns(uint) {
        return accounts[msg.sender];
    }

    function withdraw() nonReentrant public  {
        require(accounts[msg.sender] > 0, "not have balance");
        address payable account = payable(msg.sender);
        uint balances = accounts[msg.sender];
        accounts[msg.sender] = 0;
        account.transfer(balances);
    }
    
    receive() external payable {
        accounts[msg.sender] += msg.value;
    }
}
