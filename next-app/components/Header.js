import Image from 'next/image'
import { useRouter } from 'next/router'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Uploader } from 'uploader'
import Modal from 'react-modal'
// import { Upload } from "upload-js";
import SearchBar from './SearchBar'
import UploadModal from './UploadModal'
import React from 'react'

import { modalStyles } from '../utils/constants'

import InstagramLogo from '../static/images/logo.png'
import { GrHomeRounded } from 'react-icons/gr'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { IoPaperPlaneOutline } from 'react-icons/io5'

Modal.setAppElement('#__next')


const uploader = new Uploader({ apiKey: process.env.UPLOAD_IO_API_KEY }); 

const style = {
  wrapper: `navigation fixed z-20 top-0`,
  headerContainer: `header-container`,
  logoContainer: `h-[1.8rem] w-[6.4rem] relative mt-[.6rem]`,
  image: `object-contain`,
  headerMain: `header-icons flex ml-auto items-center`,
  headerIcon: `mr-[.8rem] cursor-pointer`,
}

const Header = () => {
  const router = useRouter()
  const [open , setOpen] = React.useState(false)
  const openUploader = () => {
    {
      uploader.open({ maxFileCount: 1 }).then(
        files => {
          const fileUrls = files.map(x => x.fileUrl).join("\n");
          const success = fileUrls.length === 0
            ? "No file selected."
            : `File uploaded:\n\n${fileUrls}`;
          alert(success);
          if(fileUrls.length !== 0)
          {
            router.push(`/?image=${files[0].fileUrl}`)
          }
        },
        error => {
          alert(error);
        }
      );

      // uploader
      //   .open({ multi: false })
      //   .then(files => {
      //     if (files.length === 0) {
      //       alert('No files selected.')
      //     } else {
      //       router.push(`/?image=${files[0].fileUrl}`)
      //     }
      //   })
      //   .catch(error => {
      //     console.error(error)
      //   })
    }
  }

  return (
    <nav className={style.wrapper}>
      <div className={style.headerContainer}>
        <div className={style.logoContainer}>
          <Image src={InstagramLogo} className={style.image} layout='fill' />
        </div>

        <SearchBar />

        <div className={style.headerMain}>
          <GrHomeRounded className={style.headerIcon} size={20} />
          <IoPaperPlaneOutline className={style.headerIcon} size={22} />

          <AiOutlineCloudUpload
            className={style.headerIcon}
            size={22}
            onClick={() => 
            {
              setOpen(!open)
            }}
          />
          

          <ConnectButton />
        </div>
      </div>
      <Modal
        isOpen={open}
        onRequestClose={() => router.push('/')}
        style={modalStyles}
      >
       
       <UploadModal open={open} setOpen={setOpen} />
      </Modal>
      
    </nav>
  )
}

export default Header
