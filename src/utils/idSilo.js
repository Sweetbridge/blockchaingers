import {web3, userAddress} from './provider'
import IdSilo from '../../build/contracts/IdSilo'


const storage = window.localStorage || {
  getItem: (key) => undefined,
  setItem: (key, value) => true
}

let idSilo = undefined

export const getSilo = async () => {
  if(!idSilo){
    let siloAddress = storage.getItem('siloAddress')
    let eth = web3().eth
    idSilo = new eth.Contract(IdSilo.abi, siloAddress, {from: userAddress})
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
  return silo.methods.addDataEntry(name, type, hash).send()
}

export const listDataEntries = async () => {
  let silo = await getSilo()
  let entries = []
  let entryId
  let i = 0
  let notStop = true
  do {
    try{
      entryId = await silo.methods.entryIds(i++).call()
      let entry = await silo.methods.dataEntries(entryId).call()
      entries.push(entry)
    } catch (err) {
      notStop = false
    }
  } while (notStop)
  return entries
}

export const requestCertification = async (certAddress, name) => {
  let silo = await getSilo()
  return silo.methods.requestCertification(certAddress, name).send()
}