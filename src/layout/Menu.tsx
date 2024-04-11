import { useState } from 'react'
import styles from './Menu.module.scss'

const Menu = () => {
  const [showMenu, setShowMenu] = useState(false)
  const toggleMenu = () => {
    console.log({ showMenu })
    setShowMenu(v => !v)
  }
  return <div className={styles.menuContainer}>
    <div className={`${styles.menuIcon} ${showMenu ? styles.active : ''}`} onClick={() => toggleMenu()}>
      <div /><div /><div />
    </div>
    <div className={`${styles.menus} ${showMenu ? styles.active : ''}`}>
      This is Menu
    </div>
  </div>
}
export default Menu