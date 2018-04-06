import Web3 from 'web3'
import LocalProvider from 'web3-local-signing-provider'

const netProvider = new Web3.providers.HttpProvider('http://localhost:8534')

const localProvider = new LocalProvider('0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3', netProvider)

const storage = window.localStorage

export const createSilo = async () => {

}

export const getSilo = async () => {
  return storage.getItem('siloAddress')
}