// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract VotingContract is AccessControl {
    bytes32 public constant REGISTRAR_ROLE = keccak256("REGISTRAR_ROLE");

    event ContenderRegistered(
        address indexed contender,
        string code
    );

    event VoteSuccess(
        address indexed voter, 
        address indexed contender, 
        string code
    ); 

    event VotingEnded(
        address[] winners,
        uint32 highestVotes
    );

    event RegistrarRoleTransferred(
        address indexed previousRegistrar,
        address indexed newRegistrar
    );

    uint256 public votingStartTime;
    uint256 public votingEndTime;
    uint256 public constant VOTING_DURATION = 7 days;
    bool public votingActive;
    bool public votingEnded;

    struct ContDetails {
        address contender;
        string code;
        uint32 votersNo;
        bool exists;
    }

}