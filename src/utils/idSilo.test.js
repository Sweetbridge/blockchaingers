const { utils: { sha3 } } = require('web3')
import {createDataEntry, getSilo, listDataEntries, requestCertification} from "./idSilo";

let silo

describe('idSilo', () => {
  beforeAll(() => {
    jest.setTimeout(1000000)
  })
  it('creates the idSilo if it does not exist', () => {
    return getSilo()
      .then(s => {
          silo = s
          expect(silo.options.address.length).toEqual(42)
          expect(silo.options.address).not.toEqual('0x0000000000000000000000000000000000000000')
        }
      )
  })

  it('can add a dataEntry', () => {
    return createDataEntry('passport', 'Micha Passport', sha3('Micha Passport')).then(reciept => {
      expect(reciept.gasUsed).toBeGreaterThanOrEqual(100000)
    })
  })

  it('can request a certification', () => {
    return requestCertification('0xe44c4cf797505af1527b11e4f4c6f95531b4be24', 'Micha Passport')
      .then(reciept => {
        expect(reciept.gasUsed).toBeGreaterThanOrEqual(45000)
      })
  })

  it('creates a list of data entries', () => {
    return listDataEntries()
      .then(entries => {
        expect(entries.length).toEqual(1)
        expect(entries[0].dataType).toEqual('passport')
      })
  })
})

