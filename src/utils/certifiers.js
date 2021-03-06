import userAddress from './provider'
import web3 from './provider'
import Certifiers from '../contracts/Certifiers'

let certifiers = undefined

export const getCertifiers = async () => {
  if(!certifiers) {
    let netId = await web3.eth.net.getId()
    certifiers = new web3.eth.Contract(Certifiers.abi, Certifiers.networks[netId].address, {from: userAddress})
  }
  return certifiers
}

export const listCertifiers = async () => {
  let cert = getCertifiers()
  let addresses = await certifiers.methods.certAddresses()
  let certList = []
  addresses.forEach(async addr => certList.push(await certifiers.methods.certifiers(addr)))
  return certList
}
