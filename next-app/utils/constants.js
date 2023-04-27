import ContractABI from './Instagram.json'
import Web3 from 'web3'

// export const address = '0x23625b5fb53779dE53bdc560ba8616E500522488' // Goerli Testnet
export const address = '0xF26E4B52ED1a7B1AA34935d9E0610897D9C27A35' // ganache local blockchain

export const createContract = () => {

  //if (typeof window === 'undefined') return

  //Describes the contract interface
  //Destrucutre the ethereum object from the window object to check if ethereum is supported by the browser or not
  const { ethereum } = window
  if (ethereum) {
    const web3 = new Web3(ethereum)
    console.log(ContractABI.abi);
    return new web3.eth.Contract(ContractABI.abi, address)
  }
}

export const modalStyles = {
  content: {
    height: '400px',
    width: '400px',
    margin: 'auto',
    marginTop: '150px', 
  },
  overlay: {
    backgroundColor: 'rgb(0 0 0 / 74%)',
  },
}
