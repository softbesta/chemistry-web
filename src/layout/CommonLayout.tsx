import { ReactNode } from "react"
import styles from './styles.module.scss'

interface CommonLayoutProps {
  children: ReactNode,
}

const CommonLayout = ({
  children,
}: CommonLayoutProps) => {
  return <div className={styles.layout}>
    {/* <p>This is CommonLayout</p> */}
    {children}
  </div>
}

export default CommonLayout