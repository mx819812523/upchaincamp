// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {
    uint256 public counter = 0;
    address owner;

    constructor() {
        owner = msg.sender;
    }
    
    function add(uint256 number) public {
        counter += number;
    }

    function count() public returns(uint256){
        require(msg.sender == owner, "failed call");
        counter += 0;
        return counter;
    }
}