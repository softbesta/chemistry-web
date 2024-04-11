import { ReactNode } from "react"
import styles from './CommonLayout.module.scss'
import Menu from "./Menu"

interface CommonLayoutProps {
  children: ReactNode,
}

const CommonLayout = ({
  children,
}: CommonLayoutProps) => {
  return <div className={styles.layout}>
    <Menu />
    <div className={styles.container}>
      {/* <p>This is CommonLayout</p> */}
      {children}
    </div>
  </div>
}

export default CommonLayout