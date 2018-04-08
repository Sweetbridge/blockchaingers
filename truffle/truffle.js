module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8534,
      network_id: '*'
    }
  }
}

//geth --datadir devchain --networkid 1994  --rpc --rpcapi eth,web3,personal,net console 2>> myEth.log
