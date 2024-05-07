import { ReactNode, useEffect, useRef, useState } from "react"
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
  const contentSize = { width: 1150, height: 650 }
  const { curMenu } = useAppData()
  const isQuiz = routes[curMenu].type === 'quiz'
  // console.log({ isQuiz, curMenu, curMenuType: routes[curMenu].type })
  const scaleX = window.innerWidth / contentSize.width
  const scaleY = window.innerHeight / contentSize.height
  const [scale, setScale] = useState<number | undefined>(1)
  console.log({ window })

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1150 || window.innerHeight < contentSize.height) {
        console.log('------------resize ---------', window.innerWidth / contentSize.width)
        const scaleX = window.innerWidth / contentSize.width
        const scaleY = window.innerHeight / contentSize.height
        console.log({ scaleX, scaleY })
        setScale(Math.min(scaleX, scaleY))
      } else {
        setScale(undefined)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <div className={styles.layout}>
    <div className={styles.wrapper}>
      <div
        style={{
          // transform: `scale(${scaleX})`,
          ...(scale ? { zoom: `${scale}` } : {}),
        }}
      >
        {/* <span>{window.innerWidth}</span> and       fasdfasdfdsfds
        <span>{scale}</span> -
        <span>{window.innerHeight / 720}</span> */}
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
    </div>
  </div>
}

export default CommonLayout