import { useState } from 'react'
import styles from './ChooseMenu.module.scss'

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

const ChooseMenu = () => {
  const [isActive, setIsActive] = useState(false)
  const handleShowChapterList = () => {
    setIsActive(!isActive)
  }
  return <div
    id='tur_chooseMenuIcon'
    className={styles.ChooseMenuContainer}
  >
    <div
      className={`${styles.chooseDropDownBtn} ${isActive ? styles.active : ''}`}
      onClick={() => handleShowChapterList()}
    >
      <span className={styles.arrow} />
    </div>
    <ChooseMenuPanel
      visible={isActive}
      items={chooseMenuItems}
      activeItemIndex={1}
    />
  </div>
}
export default ChooseMenu

interface ChooseMenuPanelProps {
  visible: boolean
  items: { title: string, disabled?: boolean }[]
  activeItemIndex?: number,
}
const ChooseMenuPanel = ({ visible, items, activeItemIndex }: ChooseMenuPanelProps) => {
  return <div className={`${styles.ChooseMenuPanel} ${visible ? styles.active : ''}`}>
    {/* <p>This is Order Menu Panel</p> */}
    <div className={styles.ChooseMenuHeader}>
      Choose a reaction
    </div>
    <div className={styles.ChooseMenuItemContainer}>
      {items.map((item, index) => {
        const isActiveItem = index === activeItemIndex
        // console.log({ isActiveItem, index, activeItemIndex })
        return <div
          key={index}
          className={`${styles.ChooseMenuItem} ${isActiveItem ? styles.activated : ''} ${item.disabled ? styles.disable : ''}`}
        >
          {item.title}
        </div>
      })}
    </div>
  </div >
}