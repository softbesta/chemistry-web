import { useState } from 'react'
import styles from './OrderMenu.module.scss'

const OrderMenu = () => {
  const [isActive, setIsActive] = useState(false)
  const handleShowChapterList = () => {
    setIsActive(!isActive)
  }
  return <div className={styles.OrderMenuContainer}>
    <div
      className={`${styles.dropDownBtn} ${isActive ? styles.active : ''}`}
      onClick={() => handleShowChapterList()}
    >
      <span className={styles.arrow} />
    </div>
    <OrderMenuPanel visible={isActive} />
  </div>
}
export default OrderMenu

interface OrderMenuPanelProps {
  visible: boolean
}
const OrderMenuPanel = ({ visible }: OrderMenuPanelProps) => {
  return <div className={`${styles.OrderMenuPanel} ${visible ? styles.active : ''}`}>
    <p>This is Order Menu Panel</p>
  </div>
}