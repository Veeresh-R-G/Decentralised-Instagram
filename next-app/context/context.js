import { createContext, useState, useEffect, useContext } from 'react'
import { createContract } from '../utils/constants'
import { useAccount } from 'wagmi'
import truncateEthAddress from 'truncate-eth-address'
import { toast } from 'react-toastify'
import Web3 from 'web3'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [posts, setPosts] = useState([])
  const [userAddress, setUserAddress] = useState('')
  const [tip, setTip] = useState(1)

  // Account hook from wagmi to get the current account address that is in USE
  const { address } = useAccount()
  console.log(address);
  useEffect(() => {
    getAllImages()
  }, [])

  useEffect(() => {
    if (!address) return

    setUserAddress(truncateEthAddress(address))
  }, [address])

  const getAllImages = async () => {
    console.log('getting images')


    const contract = createContract()
    console.log("Contract : ", contract);
    //get image count from contract using 
    const imageCount = await contract.methods.imageCount().call()
    //This calls the imageCount() function of the contract instance to get the total number of images stored on the blockchain.
    console.log(imageCount);
    let newPosts = []

    for (let index = 1; index <= imageCount; index++) {
      const image = await contract.methods.images(index).call()

      console.log(image);

      newPosts.push({
        id: image.id,
        url: image.url,
        caption: image.caption,
        totalTipped: image.totalTipped,
        author: image.author,
      })
    }
    console.log(newPosts);
    //sort based on totalTipped
    newPosts.sort((a, b) => b.totalTipped - a.totalTipped)

    setPosts(newPosts)
  }

  const uploadImage = async (imgUrl, caption) => {
    if (!address) return
    const contract = createContract()
    console.log(imgUrl, caption);



    const data = contract.methods.uploadImage(imgUrl, caption).send({
      from: address,
      gas: 3000000,
    })


    await toast.promise(data, {
      pending: 'Uploading image... This can take a minute ⏳',
      success: 'Image uploaded successfully! 🎉',
      error: 'Something went wrong. Please try again later.',
    })

    getAllImages()
  }

  const tipOwner = async imageId => {
    const { ethereum } = window
    if (ethereum) {
      const contract = createContract()
      //0.01 ETH in wei
      const amount = Web3.utils.toWei(tip.toString(), 'ether')

      const tx = contract.methods.tipImageOwner(imageId).send({
        from: address,
        gas: 3000000,
        value: amount,
        gasLimit: null,
      })

      toast.promise(tx, {
        pending: 'Sending tip... 🤑',
        success: 'Tip sent! 💸',
        error: 'Error sending tip 😢',
      })
    }
  }

  return (
    <AppContext.Provider value={{ posts, userAddress,tip, tipOwner, uploadImage }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext)
}
