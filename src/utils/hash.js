const { utils: { sha3 } } = require('web3')

const hashData = myData => sha3(JSON.stringify(myData))

module.exports = { hashData }
