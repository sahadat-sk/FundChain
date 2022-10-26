// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract createCharity {
    uint256 public availableContracts = 0;
    address payable public contractAddress;
    address payable charityowner;

    struct charityContract {
        address payable charityOwner;
        string charityName;
        uint256 requiredAmount;
        string description;
        string[] tags;
        uint256 minAmount;
        uint256 amountCollected;
        bool isOpen;
        address[] doners;
    }
    mapping(uint256 => charityContract) public charities;

    function createFund(
        address payable _charityowner,
        string memory _charityname,
        uint256 _requiredamount,
        string memory _funddescription,
        uint256 _minamount
    ) public payable {
        charities[availableContracts] = charityContract(
            _charityowner,
            _charityname,
            _requiredamount,
            _funddescription,
            new string[](0),
            _minamount,
            0,
            true,
            new address[](0)
        );

        availableContracts++;
    }

    constructor() {
        charityowner = payable(msg.sender);
        contractAddress = payable(address(this)); // setting the contract creator
    }

    function donate(uint256 _amount, uint256 _id) public payable {
        require(charities[_id].amountCollected < charities[_id].requiredAmount);
        require(_amount >= charities[_id].minAmount);
        charities[_id].charityOwner.transfer(10**18 * _amount);
        charities[_id].doners.push(msg.sender);
        charities[_id].amountCollected += _amount;
        if (charities[_id].amountCollected >= charities[_id].requiredAmount) {
            fullfilled(_id);
        }
    }

    function addTags(string[] memory _s, uint256 _id) public {
        for (uint i=0;i<_s.length;i++)
        {
        charities[_id].tags.push(_s[i]);
        }
    }

    function getTags(uint256 id) public view returns (string[] memory) {
        return charities[id].tags;
    }

    function isoopen(uint256 _id) public view returns (bool) {
        return charities[_id].isOpen;
    }

    function fullfilled(uint256 _id) public {
        charities[_id].isOpen = false;
    }

    fallback() external payable {}

    receive() external payable {}
}