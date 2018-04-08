import {web3, userAddress} from './provider'
import IdSilo from '../contracts/IdSilo'
const { utils: { sha3 } } = require('web3')


const storage = window.localStorage || {
  getItem: (key) => undefined,
  setItem: (key, value) => true
}

let idSilo = undefined

export const getSilo = async (siloAddress) => {
  if(!idSilo){
    siloAddress = siloAddress || storage.getItem('siloAddress')
    let eth = web3().eth
    let code = '0x0'
    idSilo = new eth.Contract(IdSilo.abi, siloAddress, {from: userAddress})

    if(siloAddress) code = await eth.getCode(siloAddress)

    if (code == '0x0') {
      let receipt = await idSilo.deploy({data: IdSilo.bytecode}).send()
      idSilo.options.address = receipt.contractAddress
      storage.setItem('siloAddress', idSilo.options.address)
      await idSilo.methods.addDataEntry('firstName', 'First Name', sha3('Abraham')).send()
      await idSilo.methods.addDataEntry('lastName', 'Last Name', sha3('Rosenblum')).send()
      let certAddress = '0x5AEDA56215b167893e80B4fE645BA6d5Bab767DE'
      await idSilo.methods.requestCertification(certAddress, 'firstName').send()
      await idSilo.methods.requestCertification(certAddress, 'lastName').send()
      await idSilo.methods.certifyClaim('firstName', 1, (new Date()).getTime(), 9600).send({from: certAddress})
      await idSilo.methods.certifyClaim('lastName', 1, (new Date()).getTime(), 9600).send({from: certAddress})
    }
  }
  return idSilo
}

export const createDataEntry = async (type, name, hash) => {
  let silo = await getSilo()
  return silo.methods.addDataEntry(name, type, hash).send()
}

export const getCertifications = async (entryId, siloAddress) => {
  let silo = await getSilo(siloAddress)
  let certs = []
  let notStop = true
  let i = 0
  do {
    try {
      let certAddr = await silo.methods.dataCertifiers(entryId, i++).call()
      let cert = await silo.methods.getCertification(entryId, certAddr).call()
      certs.push(cert)
    } catch (err) {
      notStop = false
    }
  } while (notStop)
  return certs
}

export const listDataEntries = async () => {
  let silo = await getSilo()
  let entries = []
  let entryId
  let i = 0
  let notStop = true
  do {
    try {
      entryId = await silo.methods.entryIds(i++).call()
      let entry = await silo.methods.dataEntries(entryId).call()
      entry.certifications = await getCertifications(entryId)
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
