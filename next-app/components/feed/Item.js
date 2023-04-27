import { useEffect, useState } from 'react'
import { useAppContext } from '../../context/context'
import Border from '../common/Border'
import PostHeader from './PostHeader'
import ActionButtons from './ActionButtons'
import Caption from './Caption'
import AddComment from '../AddComment'
import PostImage from './PostImage'
import truncateEthAddress from 'truncate-eth-address'

const style = {
  wrapper: `feed-item-container flex flex-col`,
  buttonsContainer: `feed-item-buttons-container w-full h-10 pl-2 pr-2 mt-2 flex items-center`,
  likesContainer: `feed-item-text text-14-bold mr-1 ml-4`,
}

const FeedItem = ({ data }) => {
  const { userAddress,tip } = useAppContext()
  const [randomLikeNumber, setRandomLikeNumber] = useState(0)

  useEffect(() => {
    setRandomLikeNumber(Math.floor(Math.random() * 100))
  }, [])
  console.log(tip)
  return (
    <Border className={style.wrapper}>
      <PostHeader username={truncateEthAddress(data.author)} />
      <PostImage imgUrl={data.url} />

      <ActionButtons id={data.id} className={style.buttonsContainer} />

      <a className={style.likesContainer}>
      
      {data.totalTipped/(1000000000000000000*tip)} Tip{data.totalTipped/(1000000000000000000*tip)>1?"s":""}
      
      </a>

      <Caption
        data={{
          username: userAddress,
          caption: data.caption,
        }}
      />

      <AddComment />
    </Border>
  )
}

export default FeedItem
