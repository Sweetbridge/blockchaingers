import web3 from './provider'
import {getSilo} from "./idSilo";

  let idSilo

  it('creates the idSilo if it does not exist', () => {
    return getSilo
      .then(silo => {
        expect(silo.options.address.length).toEqual(42)
        expect(silo.options.address).not.toEqual('0x0000000000000000000000000000000000000000')
      }
    )
  })