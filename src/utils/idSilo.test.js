import web3 from './provider'
import {createDataEntry, getSilo} from "./idSilo";
import localStorageMock from 'mock-local-storage'

let silo

describe('idSilo', () => {
  beforeAll(() => {
    global.window.localStorage = localStorageMock
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
    return createDataEntry.then(reciept => {
      console.log(receipt)
    })
  })
})

