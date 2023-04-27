import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Home () {
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

  const styles = {container : "flex flex-col items-center justify-center min-h-screen py-2"}
  return (
    <div className={styles.container}>
      <input type='file' onChange={(e) => setFile(e.target.files[0])}></input>
      <button onClick={handleUpload}>Upload</button>
      <ul>
        {
          pinnedFiles && pinnedFiles.map(file => (
            <li key={file.id}>
              <a href={`https://gateway.pinata.cloud/ipfs/${file.ipfs_pin_hash}`} target='_blank' rel='noreferrer'>{file.metadata.name}</a>
            </li>
          ))

        }
      </ul>
    </div>
  )
}
