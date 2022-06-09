// SPDX-License-Identifier: GPL-3

pragma solidity ^0.8.14;

/// @title Train Ticket Contract V2
/// @author Emma Odia
/// @notice This contract is used to demonstrate Upgrading Smart Contracts. This is the V2
/// @dev All function calls are currently implemented without side effects
/// @custom:experimental This is an experimental contract.
contract TrainTicketV2 {

    uint amount;
    address public owner;

    ///@notice Set the owner of the contract to the address calling this function
    ///@dev please note that once deployed in this state, any user can set themselves as owner
    ///@dev do not use this code in production
    function setOwner() public {
        owner = msg.sender;
    }

     ///@notice Set the Ticket Price. This is 2 GWEI 10 ^ 9
     ///@dev The change made is the Price increase
    function setTicketPrice() public {
        require(owner == msg.sender, "Only the owner can set price");
        amount = 20000000000;
    }

    ///@notice returns the ticket price
    ///@dev returns an int
    function getTicketPrice() view public returns (uint){
        return amount;
    }
}