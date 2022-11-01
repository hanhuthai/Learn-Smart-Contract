// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17 ;

/** 
 * @title Ballot
 * @dev Implements voting process along with vote delegation
 */

contract Lottery{
    address[] public players;
    address public managers;
     constructor() {
        managers = msg.sender;
    }

    function enter() public payable{
       // require(msg.value > 1000000000000000000);// money will be sent to pool of contract
        require(msg.value > .01 ether);
        players.push(msg.sender);
    }   

    function random() private view restricted returns (uint){
        return uint(keccak256(abi.encodePacked(players)));
    }

    function pickWinner() public restricted {
        uint index = random() % players.length;
        payable(players[index]).transfer(address(this).balance);   // // if 0 will sent 0 ether
        players = new address[](0);
    }

    modifier restricted(){
        require(managers == msg.sender);
        _;
    }
    function getPlayer() public view returns( address[] memory )
    {
        return players;
    }

}