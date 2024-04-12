import { useState } from 'react'
import styles from './ChapterMenu.module.scss'

const ChapterMenu = () => {
  const [isActive, setIsActive] = useState(false)
  const handleShowChapterList = () => {
    setIsActive(!isActive)
  }
  return <div
    className={styles.chapterMenuContainer}
    onClick={() => handleShowChapterList()}
  >
    {/* This is Chapter */}
    <div className={styles.dropDownBtn}>
      <div>Chapters</div>
      <span className={`${styles.dropDownIcon} ${isActive ? styles.active : ''}`} ></span>
    </div>
    <ChapterMenuPanel visible={isActive} />
  </div>
}
export default ChapterMenu

interface ChapterMenuPanelProps {
  visible: boolean
}
const ChapterMenuPanel = ({ visible }: ChapterMenuPanelProps) => {
  return <div className={`${styles.chapterMenuPanel} ${visible ? styles.active : ''}`}>
    <p>This is Chapter Menu Panel</p>
  </div>
}