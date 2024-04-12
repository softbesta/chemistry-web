import { useState } from 'react'
import styles from './WatchMenu.module.scss'

const WatchMenu = () => {
  const [isActive, setIsActive] = useState(false)
  const handleShowChapterList = () => {
    setIsActive(!isActive)
  }
  return <div className={styles.WatchMenuContainer}>
    <button
      className={`${styles.closeIcon} ${isActive ? styles.active : ''}`}
      onClick={() => handleShowChapterList()}
    ></button>
    <WatchMenuPanel visible={isActive} />
  </div>
}
export default WatchMenu

interface WatchMenuPanelProps {
  visible: boolean
}
const WatchMenuPanel = ({ visible }: WatchMenuPanelProps) => {
  return <div className={`${styles.WatchMenuPanel} ${visible ? styles.active : ''}`}>
    <p>This is Watch Menu Panel</p>
  </div>
}