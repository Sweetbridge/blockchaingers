import Web3 from 'web3'
import LocalProvider from 'web3-local-signing-provider'
import IdSilo from '../build/contracts/IdSilo'

const netProvider = new Web3.providers.HttpProvider('http://localhost:8534')

const localProvider = new LocalProvider('c88b703fb08cbea894b6aeff5a544fb92e78a18e19814cd85da83b71f772aa6c', netProvider)
const web3 = localProvider.web3
const userAddress = '0x821aEa9a577a9b44299B9c15c88cf3087F3b5544'

const storage = window.localStorage

let idSilo = undefined

export const getSilo = async () => {
  if(!idSilo){
    let siloAddress = storage.getItem('siloAddress')
    idSilo = new web3.eth.Contract(IdSilo.abi, siloAddress, {from: userAddress})
    if (!siloAddress) {
      let receipt = await idSilo.deploy({data: IdSilo.bytecode}).send()
      idSilo.options.address = receipt.contractAddress
    }
  }
  return idSilo
}

export const createClaim = async () => {

}
