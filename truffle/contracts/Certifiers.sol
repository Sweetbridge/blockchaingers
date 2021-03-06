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

pragma solidity 0.4.21;

import "./Owned.sol";


// Certifiers repository
contract Certifiers is Owned {
    enum State{initial, active, inactive}

    struct Certifier {
        string serviceUrl;
        string name;
        string accreditationUrl;  // any document type, either ipfs
        State state;
    }

    mapping(address => Certifier) public certifiers;
    address[] public certAddresses;

    function exists(address certAddr) public view returns(bool) {
        return certifiers[certAddr].state != State.initial;
    }

    function addCertifier(
        address certAddress,
        string serviceUrl,
        string name,
        string accreditationUrl) public onlyOwner {

        if (certifiers[certAddress].state == State.initial) {
            certifiers[certAddress] = Certifier(
                serviceUrl,
                name,
                accreditationUrl,
                State.active);
            certAddresses.push(certAddress);
        }
    }

    function deactivateCertifier(address certAddress) public onlyOwner {
        require(certifiers[certAddress].state != State.initial);
        certifiers[certAddress].state = State.inactive;
    }
}
