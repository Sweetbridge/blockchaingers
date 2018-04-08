var Certifiers = artifacts.require('Certifiers')
var IDSilo = artifacts.require('IdSilo')

module.exports = function (deployer, network) {
  let c
  return deployer.deploy(Certifiers)
    .then(() => Certifiers.deployed())
    .then((obj) => {
      c = obj
      c.addCertifier('0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef', // accounts[2]
                     'https://sweetbridge.com/id-certifier',
                     'sb_certifier',
                     'https://sweetbridge.com/id-certifier/license')
    })
    .then(() => deployer.deploy(IDSilo, c.address))
}
