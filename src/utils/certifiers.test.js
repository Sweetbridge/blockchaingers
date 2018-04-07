import {getCertifiers} from "./certifiers";

let certifiers

describe('certifiers', () => {
  it('gets the certifiers contract from the chain', () => {
    return getCertifiers()
      .then(cert => {
          certifiers = cert
          expect(certifiers.options.address.length).toEqual(42)
          expect(certifiers.options.address).not.toEqual('0x0000000000000000000000000000000000000000')
        }
      )
  })

  it('adds the list of certifiers', () => {
    certAddresses = [
      '0xe44c4cf797505af1527b11e4f4c6f95531b4be24',
      '0x69e1cb5cfca8a311586e3406ed0301c06fb839a2',
      '0xf014343bdffbed8660a9d8721dec985126f189f3',
      '0x0e79edbd6a727cfee09a2b1d0a59f7752d5bf7c9',
      '0x9bc1169ca09555bf2721a5c9ec6d69c8073bfeb4',
      '0xa23eaef02f9e0338eecda8fdd0a73add781b2a86',
      '0xc449a27b106be1120bd1fd62f8166a2f61588eb9',
      '0xf24ae9ce9b62d83059bd849b9f36d3f4792f5081',
      '0xc44b027a94913fb515b19f04caf515e74ae24fd6',
      '0xcb0236b37ff19001633e38808bd124b60b1fe1ba'
    ]
    return createDataEntry().then(reciept => {
      console.log(receipt)
    })
  })
})

