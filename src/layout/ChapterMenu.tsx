import { useState } from 'react'
import styles from './ChapterMenu.module.scss'
import { DropDownButton } from '../components/DropDownButton'
import { chaptersMenuList } from '../constants'
import useAppData from '../hooks/useAppData'
import useFunctions from '../hooks/useFunctions'
import { PageMenuType } from '../helper/types'

const ChapterMenu = () => {
  const [isActive, setIsActive] = useState(false)
  const handleShowChapterList = () => {
    setIsActive(!isActive)
  }
  return <div
    className={styles.chapterMenuContainer}
  >
    <DropDownButton
      text='Chapters'
      isActive={isActive}
      toggleActive={() => handleShowChapterList()}
    />
    <ChapterMenuPanel visible={isActive} />
  </div>
}
export default ChapterMenu


interface ChapterMenuPanelProps {
  visible: boolean
}
const ChapterMenuPanel = ({ visible }: ChapterMenuPanelProps) => {
  const { curMenu, setCurMenu } = useAppData()
  const { updatePageFromMenu } = useFunctions()

  const subItemsList = chaptersMenuList.map(menu => menu.subItems?.map(sub => sub.value) || [])
  const pageMenuIndex = subItemsList.findIndex(item => item.includes(curMenu))

  const [openedMenuIndex, setOpenedMenuIndex] = useState(pageMenuIndex)
  // const isActive = menuItem.subItems ? menuItem.subItems.findIndex(item => item.value === activeMenu) >= 0 : false

  const handleMenuItemClick = (menuItemIndex: any) => {
    // console.log({ menuItemIndex })
    let update: number
    if (menuItemIndex === openedMenuIndex) update = -1
    else update = menuItemIndex
    setOpenedMenuIndex(update)
  }
  const handleSubItemClick = (subItem: any) => {
    // console.log({ subItem })
    updatePageFromMenu(subItem.value)
  }

  return <div className={`${styles.chapterMenuPanel} ${visible ? styles.activeChapterPanel : ''}`}>
    {chaptersMenuList.map((menuItem, menuIndex) => {
      return <div
        key={menuIndex}
        className={styles.menuItem}
      >
        <DropDownButton
          text={menuItem.title}
          isActive={openedMenuIndex === menuIndex}
          toggleActive={() => handleMenuItemClick(menuIndex)}
        />

        <div className={`${styles.menuItemPanel} ${openedMenuIndex === menuIndex ? styles.activeMenuItemPane : ''}`}>
          {menuItem.subItems?.map(subItem => {
            const isActiveSubItem = curMenu === subItem.value
            return <div
              key={subItem.value}
              className={`${styles.subItem} ${isActiveSubItem ? styles.activeSubItem : ''}`}
              onClick={() => handleSubItemClick(subItem)}
            >
              {subItem.title}
            </div>
          })}
        </div>
      </div>
    })}
    <span />
    {/* <p>This is Chapter Menu Panel</p> */}
  </div>
}