import { ReactNode } from "react"
import styles from './CommonLayout.module.scss'
import NavMenu from "./NavMenu"
import useAppData from "../hooks/useAppData"
import { MenuList, routes } from "../constants"

interface CommonLayoutProps {
  children: ReactNode,
}

const chapterMenu = [MenuList.zero, MenuList.first, MenuList.second, MenuList.comparison, MenuList.kinetics] as string[]
// const chooseMenu = [MenuList.zero, MenuList.first, MenuList.second, MenuList.comparison, MenuList.kinetics] as string[]
// const watchMenu = [MenuList.zero, MenuList.first, MenuList.second, MenuList.comparison, MenuList.kinetics] as string[]
const quizMenus = [MenuList.zeroQuiz, MenuList.firstQuiz, MenuList.secondQuiz, MenuList.comparisonQuiz, MenuList.kineticsQuiz] as string[]

const CommonLayout = ({
  children,
}: CommonLayoutProps) => {
  const { curMenu } = useAppData()
  const isQuiz = routes[curMenu].type === 'quiz'
  // console.log({ isQuiz, curMenu, curMenuType: routes[curMenu].type })

  return <div className={styles.layout}>
    {isQuiz && <div className={styles.navMenuDivider} />}
    <div className={styles.container}>
      <NavMenu />
      {/* {showChapterMenu && <ChapterMenu />} */}
      {/* {showChooseMenu && <ChooseMenu />} */}
      {/* {showWatchMenu && <WatchMenu />} */}
      {/* <p>This is CommonLayout</p> */}
      {children}
    </div>
  </div>
}

export default CommonLayout