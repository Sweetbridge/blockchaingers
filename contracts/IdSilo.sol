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

    struct Claim {
        string name;
        bytes32 hash;  // document / claim body hash
        mapping(address => Cert) certificactions;  // certifier -> Cert instance
    }

    Certifiers public certifiers;
    Claim[] public attributes;  // document.id -> claim

    // must only be executable by active certifiers
    function certifyClaim(string entryId,
                          ApprovalState state,
                          uint256 expiryTimestamp,
                          uint16 certainty) public;

    // check that the certifier is still valid
    // add the request with state requested to the certifications mapping
    function requestCertification(address certAddr, string entryId) public onlyOwner {}
}