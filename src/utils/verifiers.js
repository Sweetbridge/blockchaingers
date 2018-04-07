import {getCertifications, getSilo} from "./idSilo";
const { utils: { sha3 } } = require('web3')

/**
 * return true or false depending on the certification state of the entryId
 * @param idSilo the contract address
 * @param entryId the clear text value of the entry ID, like "Micha Passort"
 * @returns {Promise<boolean>} true if a certification with state approved and an expiryTimestamp in the future exists
 */
export const isCertified = async (idSilo, entryId) => {
  let silo = getSilo(idSilo)
  let certifications = await getCertifications(sha3(entryId), idSilo)
  for (let i = 0; i < certifications.length; i++) {
    let expiry = parseInt(certifications[i].expiryTimestamp) * 1000
    if(certifications[i].state == "1" && expiry > (new Date()).getTime()) {
      return true
    }
  }
  return false
}
