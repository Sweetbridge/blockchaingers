// Copyright (c) 2017 Sweetbridge Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

pragma solidity 0.4.19;

import "./Owned.sol";
import "./Certifiers.sol";


// IDSilo is a user claim container. Each user has it's own Silo.
contract IdSilo is Owned {
    enum ApprovalState{initial, approved, denied, requested}

    struct Cert {
        ApprovalState state;
        uint256 expiryTimestamp;
        uint16 certainty; // basis points of certainty
    }

    struct DataEntry {
        string dataType;
        string name;
        bytes32 hash;  // document / claim body hash
        mapping(address => Cert) certifications;  // certifier -> Cert instance
    }

    Certifiers public certifiers;
    mapping(bytes32 => DataEntry) public dataEntries;  // document.id -> dataEntry
    mapping(bytes32 => address[]) public dataCertifiers;
    bytes32[] public entryIds;

    function getCertification(bytes32 entryId, address certifier) public view
        returns(ApprovalState state, uint256 expiryTimestamp, uint16 certainty){
        Cert storage cert = dataEntries[entryId].certifications[certifier];
        state = cert.state;
        expiryTimestamp = cert.expiryTimestamp;
        certainty = cert.certainty;
    }

    function addDataEntry(string name, string dataType, bytes32 hash) public onlyOwner {
        bytes32 hashedName = keccak256(name);
        dataEntries[hashedName] = DataEntry(dataType, name, hash);
        entryIds.push(hashedName);
    }

    // check that the certifier is still valid
    // add the request with state requested to the certifications mapping
    function requestCertification(address certAddr, string entryId) public onlyOwner {
        bytes32 hashedEntryId = keccak256(entryId);
        dataEntries[hashedEntryId].certifications[certAddr].state = ApprovalState.requested;
        dataCertifiers[hashedEntryId].push(certAddr);
    }

    // must only be executable by active certifiers
    function certifyClaim(
            string entryId,
            ApprovalState state,
            uint256 expiryTimestamp,
            uint16 certainty) public {
        bytes32 hashedEntryId = keccak256(entryId);
        DataEntry storage entry = dataEntries[hashedEntryId];
        Cert storage cert = entry.certifications[msg.sender];
        require(cert.state == ApprovalState.requested);
        cert.state = state;
        cert.expiryTimestamp = expiryTimestamp;
        cert.certainty = certainty;
    }
}
