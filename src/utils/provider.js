import Web3 from 'web3'
import LocalProvider from 'web3-local-signing-provider'
import config from '../config'

export const netProvider = new Web3.providers.HttpProvider(config.httpProvider)

export const localProvider = new LocalProvider(
  [
    'c88b703fb08cbea894b6aeff5a544fb92e78a18e19814cd85da83b71f772aa6c',
    'dbb9d19637018267268dfc2cc7aec07e7217c1a2d6733e1184a0909273bf078b',
    '388c684f0ba1ef5017716adb5d21a053ea8e90277d0868337519f97bede61418',
    '8d5366123cb560bb606379f90a0bfd4769eecc0557f1b362dcae9012b548b1e5',
    '0dbbe8e4ae425a6d2687f1a7e3ba17bc98c673636790f1b8ad91193c05875ef1'
  ], netProvider)
export const web3 = () => localProvider.web3
export const userAddress = '0x821aEa9a577a9b44299B9c15c88cf3087F3b5544'
