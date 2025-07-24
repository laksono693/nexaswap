// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract NEXA is ERC20 {
    constructor(uint256 initialSupply) ERC20("NEXA", "NEXA") {
        _mint(msg.sender, initialSupply);
    }
}
