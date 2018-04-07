var Certifiers = artifacts.require('Certifiers')
var IDSilo = artifacts.require('IdSilo')

module.exports = function (deployer) {
  return deployer.deploy(Certifiers)
    .then(() => deployer.deploy(IDSilo))
}
