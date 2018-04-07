import web3 from './provider'
import IdSilo from '../../build/contracts/IdSilo'

import userAddress from './provider'

const storage = window.localStorage

let idSilo = undefined

export const getSilo = async () => {
  if(!idSilo){
    let siloAddress = storage.getItem('siloAddress')
    idSilo = new web3.eth.Contract(IdSilo.abi, siloAddress, {from: userAddress})
    if (!siloAddress) {
      let receipt = await idSilo.deploy({data: IdSilo.bytecode}).send()
      idSilo.options.address = receipt.contractAddress
      storage.setItem('siloAddress', idSilo.options.address)
    }
  }
  return idSilo
}

export const createDataEntry = async (type, name, hash) => {
  let silo = await getSilo()
  await silo.methods.addClaim(name, type, hash).send()
}

export const listDataEntries = async () => {
  let silo = await getSilo()
  let entryIds = silo.methods.entrIds().call()
  let entries = []
  entryIds.forEach(async id => entries.push(await silo.methods.dataEntries(id).call()))
  return entries
}
