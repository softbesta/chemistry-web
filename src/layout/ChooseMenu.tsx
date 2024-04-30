import { useEffect, useState } from 'react'
import styles from './ChooseMenu.module.scss'
import useAppData from '../hooks/useAppData'

const chooseMenuItems = [
  {
    title: 'A to B',
    disabled: true,
  },
  {
    title: 'C to D',
  },
  {
    title: 'E to F',
  },
]

interface ChooseMenuProps {
  menuItems?: { title: string }[]
  isEnable?: boolean
  onClickItem?: () => void
}
const ChooseMenu = ({ menuItems = chooseMenuItems, isEnable = false, onClickItem }: ChooseMenuProps) => {
  const { activeDotIndex, setActiveDotIndex } = useAppData()
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    console.log('===ChooseMenu.useEffect===')
    console.log({ isEnable })
    setIsActive(isEnable)
  }, [isEnable])

  const toogleShowChapterPanel = () => {
    console.log("===ChooseMenu.toogleShowChapterPanel===", { isEnable })
    if (!isEnable) {
      setIsActive(false)
      return
    }
    setIsActive(!isActive)
  }
  const handleItemClick = (index: number) => {
    console.log('ChooseMenu.handleItemClick', { index })
    setActiveDotIndex(index)
    onClickItem?.()
    toogleShowChapterPanel()
  }
  return <div
    id='tur_chooseMenuIcon'
    className={styles.ChooseMenuContainer}
  >
    <div
      className={`${styles.chooseDropDownBtn} ${isActive ? styles.active : ''}`}
      onClick={() => toogleShowChapterPanel()}
    >
      <span className={styles.arrow} />
    </div>
    <ChooseMenuPanel
      visible={isActive}
      items={menuItems}
      activeItemIndex={activeDotIndex}
      onItemClick={handleItemClick}
    />
  </div>
}
export default ChooseMenu

interface ChooseMenuPanelProps {
  visible: boolean
  items: { title: string, disabled?: boolean }[]
  activeItemIndex: number,
  onItemClick: (val: number) => void
}
const ChooseMenuPanel = ({
  visible,
  items,
  activeItemIndex,
  onItemClick
}: ChooseMenuPanelProps) => {
  return <div className={`${styles.ChooseMenuPanel} ${visible ? styles.active : ''}`}>
    {/* <p>This is Order Menu Panel</p> */}
    <div className={styles.ChooseMenuHeader}>
      Choose a reaction
    </div>
    <div className={styles.ChooseMenuItemContainer}>
      {items.map((item, index) => {
        const isActiveItem = index === activeItemIndex + 1
        // console.log({ isActiveItem, index, activeItemIndex })
        return <button
          key={index}
          className={`
            ${styles.ChooseMenuItem} 
            ${isActiveItem ? styles.activated : ''} 
          `}
          onClick={() => onItemClick(index)}
          disabled={!(activeItemIndex + 1 === index)}
        >
          {item.title}
        </button>
      })}
    </div>
  </div >
}