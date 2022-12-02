// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

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
    // uint256 public cnt;
    mapping (address => bool) hasDonated; // To check if the same person has donated before
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
        // cnt = 0;
    }
    // event Donors(
    //     address[] pastdonors
    // );
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
        if (hasDonated[msg.sender] == false)
        {
            doners.push(msg.sender);
        }
        hasDonated[msg.sender]=true;

        // emit Donors(doners);
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

    function getDoners() public view returns (uint256) {
        uint256 x = doners.length;
        return (x*100);
    }
    function getCollectionPercentage() public view returns(uint256){
        return ((amountCollected*100)/requiredAmount);
    }
    

}