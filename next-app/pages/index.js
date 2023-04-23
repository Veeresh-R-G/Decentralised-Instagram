import { data } from '../static/example_data'
import { useAppContext } from '../context/context'
import Layout from '../components/Layout'
import Stories from '../components/stories/Stories'
import HomeRightBar from '../components/HomeRightBar'
import FeedItem from '../components/feed/Item'
import { ToastContainer } from 'react-toastify'
import Head from 'next/head'
const style = {
  container: `homepage-feed lg:mr-8 flex flex-col`,
}

const Home = () => {
  const { posts } = useAppContext()

  return (
    <>
      <Head>
      <script src="https://js.upload.io/uploader/v3"></script>

      </Head>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Layout>
        <div className={style.container}>
          <Stories stories={data.stories} />
          {posts.map((item, index) => (
            <FeedItem data={item} key={index} />
          ))}
        </div>
        <HomeRightBar data={data.suggestions} />
      </Layout>
    </>
  )
}

export default Home
