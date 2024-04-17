import { useLocation, useNavigate } from "react-router-dom"
import { PageMenuType } from "../helper/types"
import useAppData from "./useAppData";
import { MenuList, MenuOrder, routes } from "../constants";
import { useHighLight } from "./useHighlight";
// should be exchanged as App context state
import { maxStep_Zero, tur_Hightlights } from "../pages/ReactionRates/zero/constants";
import { getStorage, setStorage } from "../helper/functions";

const useFunctions = () => {
  const navigate = useNavigate()
  const {
    setCurMenu,
    curMenu,
    curStep,
    setCurStep,
    setCourseStatus,
    setCount,
  } = useAppData()

  const initializePage = (menu: MenuList) => {
    console.log('===initializePage===')
    // update 'courseStatus' in localStorage and context
    let update = getStorage('courseStatus') as MenuList[] || []
    if (!update.includes(menu)) {
      update = [...update, menu]
      setStorage('courseStatus', update)
    }
    console.log({update})
    setCourseStatus(update)

    // Todo: initialize context status.
    setCurStep(0)
  }
  // call when menu is clicked
  const updatePageFromMenu = (menu: MenuList) => {
    // initializePage(menu)
    const path = routes[menu]?.path
    if (!path) {
      navigate('/nopage')
      return
    }
    // setCurMenu(menu)
    navigate(path)
  }

  const handleTest = () => {
    setCount(111)
  }

  // pageStep; -1: returns previous page menu, 1: returns next page menu
  const getNextMenu = (pageStep: number = 1) => {
    const curOrder = MenuOrder.findIndex(item => item === curMenu)
    if (curOrder < -1) return MenuOrder[0]
    let nextOrder = curOrder + pageStep
    if (nextOrder > MenuOrder.length) nextOrder = MenuOrder.length - 1
    else if (nextOrder < 0) nextOrder = 0
    return MenuOrder[nextOrder]
  }

  const returnValues = {
    initializePage,
    updatePageFromMenu,
    getNextMenu,
    handleTest,
  }
  return returnValues
}
export default useFunctions