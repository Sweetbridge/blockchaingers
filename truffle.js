module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8534,
      network_id: '9'
    },
    ganache: {
      host: 'localhost',
      port: 7545,
      network_id: '5777'
    },
    'backstage-dev': {
      host: '34.213.220.128',
      gas: 600000,
      port: 10003,
      network_id: '1337'
    },
    'backstage-parity': {
      host: '54.218.98.244',
      gas: 600000,
      port: 10001,
      network_id: '17'
    },
    local: {  // locahost private chain
      host: 'localhost',
      gas: 4700000,
      port: 8544,
      network_id: '*'
    },
    'localhost-dev': {  // locahost private chain --dev
      host: 'localhost',
      port: 8545,
      network_id: '1337'
    },
    'rinkeby': {  // locahost private chain --dev
      host: '34.213.220.128',
      port: 10001,
      network_id: '4'
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
}

//geth --datadir devchain --networkid 1994  --rpc --rpcapi eth,web3,personal,net console 2>> myEth.log
