import Border from '../common/Border'
import StoryItem from './StoryItem'

const style = {
  wrapper: `stories-container w-full border-0`,
  container: `stories-feed overflow-y-hidden py-4 px-2 items-center stories-feed-floating flex relative transition ease-linear duration-300`,
}

const Stories = ({ stories }) => {
  return (
    <Border className={style.wrapper}>
      <div className={style.container}>
        {stories &&
          stories.map(item => <StoryItem data={item} key={item.username} />)}
      </div>
    </Border>
  )
}

export default Stories
