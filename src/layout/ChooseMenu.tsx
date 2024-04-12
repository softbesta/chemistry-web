import { useState } from 'react'
import styles from './ChooseMenu.module.scss'

const ChooseMenu = () => {
  const [isActive, setIsActive] = useState(false)
  const handleShowChapterList = () => {
    setIsActive(!isActive)
  }
  return <div className={styles.ChooseMenuContainer}>
    <div
      className={`${styles.dropDownBtn} ${isActive ? styles.active : ''}`}
      onClick={() => handleShowChapterList()}
    >
      <span className={styles.arrow} />
    </div>
    <ChooseMenuPanel visible={isActive} />
  </div>
}
export default ChooseMenu

interface ChooseMenuPanelProps {
  visible: boolean
}
const ChooseMenuPanel = ({ visible }: ChooseMenuPanelProps) => {
  return <div className={`${styles.ChooseMenuPanel} ${visible ? styles.active : ''}`}>
    <p>This is Order Menu Panel</p>
  </div>
}