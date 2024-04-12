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
import useFunctions from '../hooks/useFunctions'

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
  const isCurMenu = ''
  const navigate = useNavigate();
  let location = useLocation()
  const { updatePageFromMenu } = useFunctions()
  const { curMenu, setCurMenu } = useAppData()

  const handleTEST = () => {
    console.log({ curMenu })
  }

  useEffect(() => {
    console.log({ location })

    if (location.pathname === routes[MenuList.zero].path) {
      setCurMenu(MenuList.zero)
    } else if (location.pathname === routes[MenuList.first].path) {
      setCurMenu(MenuList.first)
    } else if (location.pathname === routes[MenuList.second].path) {
      setCurMenu(MenuList.second)
    } else if (location.pathname === routes[MenuList.comparison].path) {
      setCurMenu(MenuList.comparison)
    } else if (location.pathname === routes[MenuList.kinetics].path) {
      setCurMenu(MenuList.kinetics)
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
            src={curMenu === MenuList.zero ? IconZeroOrderPressed : IconZeroOrder}
            alt='IconZero'
            onClick={() => {
              updatePageFromMenu(MenuList.zero)
            }}
          />
          <div onClick={() => updatePageFromMenu(MenuList.zeroQuiz)}>
            <SvgQuiz fillColor={'rgb(68, 150, 247)'} width={40} height={40} />
          </div>
          <div>
            <SvgArchive fillColor={'rgb(68, 150, 247)'} width={40} height={40} />
          </div>
        </div>
        <div className={styles.navMenuItem}>
          <img
            className={styles.imgChapter}
            src={curMenu === MenuList.first ? IconFirstOrderPressed : IconFirstOrder}
            alt='IconFirst'
            onClick={() => {
              updatePageFromMenu(MenuList.first)
            }}
          />
          <div onClick={() => updatePageFromMenu(MenuList.firstQuiz)}>
            <SvgQuiz fillColor={'rgb(68, 150, 247)'} width={40} height={40} />
          </div>
          <div>
            <SvgArchive fillColor={'rgb(68, 150, 247)'} width={40} height={40} />
          </div>
        </div>
        <div className={styles.navMenuItem}>
          <img
            className={styles.imgChapter}
            src={curMenu === MenuList.second ? IconSecondOrderPressed : IconSecondOrder}
            alt='IconSecond'
            onClick={() => {
              updatePageFromMenu(MenuList.second)
            }}
          />
          <div onClick={() => updatePageFromMenu(MenuList.secondQuiz)}>
            <SvgQuiz fillColor={'rgb(68, 150, 247)'} width={40} height={40} />
          </div>
          <div>
            <SvgArchive fillColor={'rgb(68, 150, 247)'} width={40} height={40} />
          </div>
        </div>
        <div className={styles.navMenuItem}>
          <img
            className={styles.imgChapter}
            src={curMenu === MenuList.comparison ? IconComparisonPressed : IconComparison}
            alt='IconComparison'
            onClick={() => {
              updatePageFromMenu(MenuList.comparison)
            }}
          />
          <div onClick={() => updatePageFromMenu(MenuList.comparisonQuiz)}>
            <SvgQuiz fillColor={'rgb(68, 150, 247)'} width={40} height={40} />
          </div>
          <div>
            <SvgArchive fillColor={'rgb(68, 150, 247)'} width={40} height={40} />
          </div>
        </div>
        <div className={styles.navMenuItem}>
          <img
            className={styles.imgChapter}
            src={curMenu === MenuList.kinetics ? IconKineticsPressed : IconKinetics}
            alt='IconKinetics'
            onClick={() => {
              updatePageFromMenu(MenuList.kinetics)
            }}
          />
          <div onClick={() => navigate(MenuList.kineticsQuiz)}>
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