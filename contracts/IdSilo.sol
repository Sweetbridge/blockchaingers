pragma solidity ^0.4.19;

import "./Owned.sol";

contract IdSilo is Owned{
    enum ApprovalState{initial, pending, approved, denied, requested}

    struct Certification {
        ApprovalState state;
        uint256 expiryTimestamp;
        uint16 certainty; //basis points of certainty
    }

    struct DataEntry {
        bytes32 hash;
        mapping(address => Certification) certificactions;
    }

    mapping(string => DataEntry) public attributes;

    //must only be executable by active certifiers
    function certifyDataEntry(string entryId, ApprovalState state, uint256 expiryTimestamp, uint16 certainty);

    //check that the certifier is still valid
    //add the request with state requested to the certifications mapping
    function requestCertification(address certAddr, string entryId) onlyOwner;

}