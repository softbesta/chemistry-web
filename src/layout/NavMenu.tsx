import { useEffect, useState } from 'react'
import styles from './NavMenu.module.scss'
import IconZeroOrder from '../assets/ReactionRates/navpanel/zeroordericon@3x.png'
import IconZeroOrderPressed from '../assets/ReactionRates/navpanel/zeroordericon-pressed@3x.png'
import IconFirstOrder from '../assets/ReactionRates/navpanel/firstordericon@3x.png'
import IconFirstOrderPressed from '../assets/ReactionRates/navpanel/firstordericon-pressed@3x.png'
import IconSecondOrder from '../assets/ReactionRates/navpanel/secondordericon@3x.png'
import IconSecondOrderPressed from '../assets/ReactionRates/navpanel/secondordericon-pressed@3x.png'
import IconComparison from '../assets/ReactionRates/navpanel/comparisonicon@3x.png'
import IconComparisonPressed from '../assets/ReactionRates/navpanel/comparisonicon-pressed@3x.png'
import IconKinetics from '../assets/ReactionRates/navpanel/kineticsicon@3x.png'
import IconKineticsPressed from '../assets/ReactionRates/navpanel/kineticsicon-pressed@3x.png'
import { useLocation, useNavigate } from 'react-router-dom'
import { MenuList, routes } from '../constants'
import SvgQuiz from '../components/SVGIcons/SvgQuiz'
import SvgArchive from '../components/SVGIcons/SvgArchive'
import useAppData from '../hooks/useAppData'

const NavMenu = () => {
  const [showMenu, setShowMenu] = useState(false)
  const toggleMenu = () => {
    console.log({ showMenu })
    setShowMenu(v => !v)
  }
  return <div className={styles.menuContainer} id='menuContainer'>
    <div
      className={`${styles.menuIcon} ${showMenu ? styles.active : ''}`}
      onClick={() => toggleMenu()}
    >
      <div /><div /><div />
    </div>

    <NavPanel visible={showMenu} onClose={() => setShowMenu(false)} />
  </div>
}
export default NavMenu


interface NavPanelProps {
  visible: boolean
  onClose: () => void
}
const NavPanel = ({ visible = false, onClose }: NavPanelProps) => {
  const isActiveMenu = ''
  const navigate = useNavigate();
  let location = useLocation()
  const { activeMenu, setActiveMenu } = useAppData()

  const handleTEST = () => {
    console.log({ activeMenu })
  }

  useEffect(() => {
    console.log({ location })

    if (location.pathname === routes[MenuList.zero].path) {
      setActiveMenu(MenuList.zero)
    } else if (location.pathname === routes[MenuList.first].path) {
      setActiveMenu(MenuList.first)
    } else if (location.pathname === routes[MenuList.second].path) {
      setActiveMenu(MenuList.second)
    } else if (location.pathname === routes[MenuList.comparison].path) {
      setActiveMenu(MenuList.comparison)
    } else if (location.pathname === routes[MenuList.kinetics].path) {
      setActiveMenu(MenuList.kinetics)
    }
  }, [location.pathname])

  return <div className={`${styles.navPanel} ${visible ? styles.active : ''}`}>
    <div
      className={`${styles.closeIcon}`}
      onClick={() => onClose()}
    >
      <div /><div /><div />
    </div>

    <div className={styles.navContent}>
      <div className={styles.navLinks}>

      </div>
      <div className={styles.navMenus}>
        <div className={styles.navMenuItem}>
          <img
            className={styles.imgChapter}
            src={activeMenu === MenuList.zero ? IconZeroOrderPressed : IconZeroOrder}
            alt='IconZero'
            onClick={() => {
              navigate(routes[MenuList.zero].path)
            }}
          />
          <div onClick={() => navigate(routes[MenuList.zero].quizPath)}>
            <SvgQuiz fillColor={'rgb(68, 150, 247)'} width={40} height={40} />
          </div>
          <div>
            <SvgArchive fillColor={'rgb(68, 150, 247)'} width={40} height={40} />
          </div>
        </div>
        <div className={styles.navMenuItem}>
          <img
            className={styles.imgChapter}
            src={activeMenu === MenuList.first ? IconFirstOrderPressed : IconFirstOrder}
            alt='IconFirst'
            onClick={() => {
              navigate(routes[MenuList.first].path)
            }}
          />
          <div onClick={() => navigate(routes[MenuList.first].quizPath)}>
            <SvgQuiz fillColor={'rgb(68, 150, 247)'} width={40} height={40} />
          </div>
          <div>
            <SvgArchive fillColor={'rgb(68, 150, 247)'} width={40} height={40} />
          </div>
        </div>
        <div className={styles.navMenuItem}>
          <img
            className={styles.imgChapter}
            src={activeMenu === MenuList.second ? IconSecondOrderPressed : IconSecondOrder}
            alt='IconSecond'
            onClick={() => {
              navigate(routes[MenuList.second].path)
            }}
          />
          <div onClick={() => navigate(routes[MenuList.second].quizPath)}>
            <SvgQuiz fillColor={'rgb(68, 150, 247)'} width={40} height={40} />
          </div>
          <div>
            <SvgArchive fillColor={'rgb(68, 150, 247)'} width={40} height={40} />
          </div>
        </div>
        <div className={styles.navMenuItem}>
          <img
            className={styles.imgChapter}
            src={activeMenu === MenuList.comparison ? IconComparisonPressed : IconComparison}
            alt='IconComparison'
            onClick={() => {
              navigate(routes[MenuList.comparison].path)
            }}
          />
          <div onClick={() => navigate(routes[MenuList.comparison].quizPath)}>
            <SvgQuiz fillColor={'rgb(68, 150, 247)'} width={40} height={40} />
          </div>
          <div>
            <SvgArchive fillColor={'rgb(68, 150, 247)'} width={40} height={40} />
          </div>
        </div>
        <div className={styles.navMenuItem}>
          <img
            className={styles.imgChapter}
            src={activeMenu === MenuList.kinetics ? IconKineticsPressed : IconKinetics}
            alt='IconKinetics'
            onClick={() => {
              navigate(routes[MenuList.kinetics].path)
            }}
          />
          <div onClick={() => navigate(routes[MenuList.kinetics].quizPath)}>
            <SvgQuiz fillColor={'rgb(68, 150, 247)'} width={40} height={40} />
          </div>
          <div>
            <SvgArchive fillColor={'rgb(68, 150, 247)'} width={40} height={40} />
          </div>
        </div>
      </div>
    </div>

    {/* <button onClick={() => handleTEST()}>TEST HERE</button> */}

  </div>
}