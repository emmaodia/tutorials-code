// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.17;

contract HelloWorld {
    address public owner;
    string greeting;

    constructor() {
        owner = msg.sender;
    }

    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
    }

    function getGreeting() public view returns (string memory) {
        return greeting;
    }
}
