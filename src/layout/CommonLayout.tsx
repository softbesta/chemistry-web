import { ReactNode } from "react"
import './styles.module.scss'

interface CommonLayoutProps {
  children: ReactNode,
}

const CommonLayout = ({
  children,
}: CommonLayoutProps) => {
  return <div>
    <p>This is CommonLayout</p>
    {children}
  </div>
}

export default CommonLayout