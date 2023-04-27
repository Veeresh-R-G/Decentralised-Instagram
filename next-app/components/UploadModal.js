
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'
import { useAppContext } from '../context/context'
import { useEffect, useState } from 'react'
import axios from 'axios'
const style = {
  wrapper: `w-full h-full flex flex-col`,
  title: `text-center text-3xl font-bold mb-11`,
  input: `w-full h-10 border-2 border-gray-300 rounded-md p-2 `,
  button: `flex bg-[#3898ff] text-white font-bold items-center justify-center flex-1  rounded-[1rem]`,
}

const UploadModal = ({open , setOpen}) => {
  const router = useRouter()
  const [description, setDescription] = useState('')

  const [pinnedFiles, setPinnedFiles] = useState([])
  const [file, setFile] = useState(null)


  const handleUpload = async () => {
    try {
      if (file !== undefined) {
        const formData = new FormData();
        console.log(file)
        formData.append('file', file);
        const pinataBody = {
          options: {
            cidVersion: 1,
          },
          metadata: {
            name: file.name,
          }
        }
        formData.append('pinataOptions', JSON.stringify(pinataBody.options));
        formData.append('pinataMetadata', JSON.stringify(pinataBody.metadata));
        const url = `${pinataConfig.root}/pinning/pinFileToIPFS`;
        const response = await axios({
          method: 'post',
          url: url,
          data: formData,
          headers: pinataConfig.headers
        })
        console.log(response.data)
        queryPinataFiles();
      } else {
        alert('select file first')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const queryPinataFiles = async () => {
    try {
      const url = `${pinataConfig.root}/data/pinList?status=pinned`;
      const response = await axios.get(url, pinataConfig);
      console.log(response.data.rows)
      setPinnedFiles(response.data.rows);
    } catch (error) {
      console.log(error)
    }
  };


  const pinataConfig = {
    root: 'https://api.pinata.cloud',
    headers: {
      'pinata_api_key': process.env.API_KEY,
      'pinata_secret_api_key': process.env.API_SECRET
    }
  };

  const testPinataConnection = async () => {
    try {
      console.log(pinataConfig)
      const url = `${pinataConfig.root}/data/testAuthentication`
      const res = await axios.get(url, { headers: pinataConfig.headers });
      console.log(res.data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    testPinataConnection()
  });


  const { uploadImage } = useAppContext()

  const handleSubmit = async (
    event,
    caption = description,
  ) => {
    event.preventDefault()
   

    ///----
    try {
      if (file !== undefined) {
        const formData = new FormData();
        console.log(file)
        formData.append('file', file);
        const pinataBody = {
          options: {
            cidVersion: 1,
          },
          metadata: {
            name: file.name,
          }
        }
        formData.append('pinataOptions', JSON.stringify(pinataBody.options));
        formData.append('pinataMetadata', JSON.stringify(pinataBody.metadata));
        const url = `${pinataConfig.root}/pinning/pinFileToIPFS`;
        const response = await axios({
          method: 'post',
          url: url,
          data: formData,
          headers: pinataConfig.headers
        })
        console.log(response.data)
        let imgUrl = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`
        uploadImage(imgUrl, caption)
        queryPinataFiles();
      } else {
        alert('select file first')
      }
    } catch (error) {
      console.log(error)
    }


    setOpen(false)

    router.push('/')
  }
  
  return (
    <div className='flex flex-col justify-center items-center space-y-4 '>
      <h3 className='text-2xl font-semibold uppercase mt-10'>Upload Image here</h3>
      {/* <input type='file'/> */}
     
<input  onChange={(e) => setFile(e.target.files[0])} className="rounded-lg mb-10 hover:file:bg-violet-100 cursor-pointer file:rounded-2xl file:border-0 file:px-4 file:bg-violet-50 file:text-violet-700 file:font-semibold" type="file" />

      <h3 className='text-2xl font-semibold uppercase mt-5'>Enter a Description</h3>
      <input
        type='text'
        value={description}
        onChange={event => setDescription(event.target.value)}
        placeholder='Enter a Description'
        className={style.input}
      />
      {/* <button onClick={handleSubmit} className={style.button}>
        Submit
      </button> */}
      <button onClick={handleSubmit} type="button" className="text-violet-700 mt-20 bg-violet-200
       hover:bg-violet-300 focus:ring-4 focus:ring-blue-300 font-semibold 
        rounded-lg text-base px-5 py-2.5 mr-2 mb-2 
         focus:outline-none ">Submit</button>
    </div>
  )
}

export default UploadModal
