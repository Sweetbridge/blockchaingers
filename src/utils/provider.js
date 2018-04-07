import Web3 from 'web3'
import LocalProvider from 'web3-local-signing-provider'
import config from '../config'

export const netProvider = new Web3.providers.HttpProvider(config.httpProvider)

export const localProvider = new LocalProvider(
  [
    'c88b703fb08cbea894b6aeff5a544fb92e78a18e19814cd85da83b71f772aa6c',
    'dbb9d19637018267268dfc2cc7aec07e7217c1a2d6733e1184a0909273bf078b'
  ], netProvider)
export const web3 = () => localProvider.web3
export const userAddress = '0x821aEa9a577a9b44299B9c15c88cf3087F3b5544'
