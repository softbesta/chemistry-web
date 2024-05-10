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
  const { curMenu, scrollable } = useAppData()
  const isQuiz = routes[curMenu].type === 'quiz'
  // console.log({ isQuiz, curMenu, curMenuType: routes[curMenu].type })
  const scaleX = window.innerWidth / contentSize.width
  const scaleY = window.innerHeight / contentSize.height
  const [scale, setScale] = useState<number | undefined>(Math.min(scaleX, scaleY))

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1150 || window.innerHeight < contentSize.height) {
        // console.log('------------resize ---------', window.innerWidth / contentSize.width)
        const scaleX = window.innerWidth / contentSize.width
        const scaleY = window.innerHeight / contentSize.height
        // console.log({ scaleX, scaleY })
        setScale(Math.min(scaleX, scaleY))
      } else {
        setScale(undefined)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    function preventBehavior(e: { preventDefault: () => void }) {
      if (scrollable.current) return
      // e.preventDefault(); 
    };

    document.addEventListener("touchmove", preventBehavior, {passive: false});
    return () => {
      window.removeEventListener('resize', handleResize)
      document.addEventListener("touchmove", preventBehavior, {passive: false});
    }
  }, [])

  return <div className={styles.layout}>
    <div className={styles.wrapper}>
      <div
        style={{
          padding: '0 30px',
          // transform: `scale(${scaleX})`,
          ...(scale ? {
            // zoom: `${scale}`,
            // transformOrigin: 0,
            '-ms-transform': `scale(${scale})`, /* IE 9 */
            // '-ms-transform-origin': '0 0',
            '-moz-transform': `scale(${scale})`, /* Firefox */
            // '-moz-transform-origin': '0 0',
            '-o-transform': `scale(${scale})`, /* Opera */
            // '-o-transform-origin': '0 0',
            '-webkit-transform': `scale(${scale})`, /* Safari And Chrome */
            // '-webkit-transform-origin': '0 0',
            'transform': `scale(${scale})`, /* Standard Property */
            // 'transform-origin': '0 0',  /* Standard Property */
            '-webkit-transform-origin-y': 0,
          } : {}),
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