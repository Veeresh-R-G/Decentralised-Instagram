import ContractABI from './Instagram.json'
import Web3 from 'web3'

// export const address = '0x728bf9d22727e8DDD33201Cbc3f1aC6B1eb46A73' // Goerli Testnet
export const address = '0x86d5c8f133f5b844De0A78dFa818f46E51472BbD' // ganache local blockchain

export const createContract = () => {
  const { ethereum } = window
  if (ethereum) {
    const web3 = new Web3(ethereum)
    console.log(ContractABI.abi);
    return new web3.eth.Contract(ContractABI.abi, address)
  }
}

export const modalStyles = {
  content: {
    height: '300px',
    width: '400px',
    margin: 'auto',
    marginTop: '150px',
    display: 'flex',
  },
  overlay: {
    backgroundColor: 'rgb(0 0 0 / 74%)',
  },
}
