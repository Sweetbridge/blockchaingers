var Certifiers = artifacts.require('Certifiers')
var IDSilo = artifacts.require('IdSilo')

module.exports = function (deployer) {
  console.log('>>>>>>>>>>>>>> doing')
  return deployer.deploy(Certifiers)
    .then(() => deployer.deploy(IDSilo))
}
