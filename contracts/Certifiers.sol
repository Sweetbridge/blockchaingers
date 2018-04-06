pragma solidity ^0.4.19;

import "./Owned.sol";


contract Certifiers is Owned {

    struct Certifier {
        string certificationtUrl;
        string name;
        string accreditationIpfsHash;
        string accreditationUrl;
        bool active;
    }

    mapping(address => Certifier) public certifiers;

    function addCertifier(address certAddress,
        string certificationtUrl,
        string name,
        string accreditationIpfsHash,
        string accreditationUrl) onlyOwner {

        Certifier certifier;
        certifier.certificationtUrl = certificationtUrl;
        certifier.name = name;
        certifier.accreditationIpfsHash = accreditationIpfsHash;
        certifier.accreditationUrl = accreditationUrl;
        certifiers[certAddress] = certifier;
    }

    function deactivteCertifier(address certAddress) onlyOwner;

}