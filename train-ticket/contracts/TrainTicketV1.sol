// SPDX-License-Identifier: GPL-3

pragma solidity ^0.8.14;

/// @title A Train Ticket Contract
/// @author Emma Odia
/// @notice This contract is used to demonstrate Upgrading Smart Contracts
/// @dev All function calls are currently implemented without side effects
/// @custom:experimental This is an experimental contract.
contract TrainTicketV1 {

    uint amount;
    address public owner;

    ///@notice Set the owner of the contract to the address calling this function
    ///@dev please note that once deployed in this state, any user can set themselves as owner
    ///@dev do not use this code in production
    function setOwner() public {
        owner = msg.sender;
    }

    ///@notice Set the Ticket Price. This is 1 GWEI 10 ^ 9
    function setTicketPrice() public {
        require(owner == msg.sender, "Only the owner can set price");
        amount = 10000000000;
    }

    ///@notice returns the ticket price
    ///@dev returns an int
    function getTicketPrice() view public returns (uint){
        return amount;
    }
}