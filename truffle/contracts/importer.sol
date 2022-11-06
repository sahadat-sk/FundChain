// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
// import "./importer.sol";

contract Charity{
    address payable public charityOwner;
    string public charityName;
    uint256 public requiredAmount;
    string public description;
    string[] public tags;
    uint256 public minAmount;
    uint256 public amountCollected;
    bool public isOpen;
    address[] public doners;
    constructor (address _charityowner, string memory _charityname, uint256 _requiredamount, string memory _funddescription, uint256 _minamount)  {
        charityOwner = payable(_charityowner);
        charityName = _charityname;
        requiredAmount = _requiredamount;
        description = _funddescription;
        minAmount = _minamount;
        tags = new string[](0);
        isOpen = true;
        doners = new address[](0);
        amountCollected = 0;
    }
  
    function pay() external payable {
        if (msg.value<minAmount)
        {
            revert();
        }
        if (isOpen!=true)
        {
            revert();
        }
        amountCollected+= msg.value;
        if (amountCollected>=requiredAmount)
        {
            isOpen=false;
            charityOwner.transfer(address(this).balance);
        }
        doners.push(msg.sender);
    }
     function addTags(string[] memory _s) public {
        for (uint i=0;i<_s.length;i++)
        {
           tags.push(_s[i]);
        }
    }

    function getTags() public view returns (string[] memory) {
        return tags;
    }
      function withdraw() public payable {
        charityOwner.transfer(address(this).balance);
        isOpen=false;
    }
    function getDoners() public view returns (address[] memory) {
        return doners;
    }

}