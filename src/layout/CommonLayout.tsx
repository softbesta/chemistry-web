import { ReactNode } from "react"
import styles from './CommonLayout.module.scss'
import NavMenu from "./NavMenu"
import ChapterMenu from "./ChapterMenu"
import WatchMenu from "./WatchMenu"
import OrderMenu from "./OrderMenu"

interface CommonLayoutProps {
  children: ReactNode,
}

const CommonLayout = ({
  children,
}: CommonLayoutProps) => {
  return <div className={styles.layout}>
    <div className={styles.container}>
      <NavMenu />
      <ChapterMenu />
      <OrderMenu />
      <WatchMenu />
      {/* <p>This is CommonLayout</p> */}
      {children}
    </div>
  </div>
}

export default CommonLayout