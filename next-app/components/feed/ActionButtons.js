import { useAppContext } from '../../context/context'

import { AiOutlineHeart } from 'react-icons/ai'
import { FaRegComment } from 'react-icons/fa'
import { IoPaperPlaneOutline } from 'react-icons/io5'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'

const style = {
  wrapper: `flex ml-4`,
  icon: `m-2`,
  tipIcon: `flex align-center cursor-pointer mr-[1rem] mt-[10px]`,
}

const ActionButtons = ({ id }) => {
  const { tipOwner } = useAppContext()

  return (
    <div className={style.wrapper}>
      
      <RiMoneyDollarCircleLine
        size={30}
        className={style.tipIcon}
        onClick={() => tipOwner(id)}
      />
    </div>
  )
}

export default ActionButtons
