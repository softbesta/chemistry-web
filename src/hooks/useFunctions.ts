import { useLocation, useNavigate } from "react-router-dom"
import { PageMenuType } from "../helper/types"
import useAppData from "./useAppData";
import { routes } from "../constants";
import { useHighLight } from "./useHighlight";
// should be exchanged as App context state
import { maxStepCount_Zero, tur_Hightlights } from "../pages/ReactionRates/zero/constants";

const useFunctions = () => {
  const navigate = useNavigate()
  let location = useLocation()
  const {
    setCurMenu,
    curMenu,
    curStep,
    setCurStep,
  } = useAppData()

  // call when menu is clicked
  const updatePageFromMenu = (menu: PageMenuType) => {
    const path = routes[menu]?.path
    if (!path) {
      navigate('/nopage')
      return
    }
    setCurMenu(menu)
    navigate(path)
  }

  const returnValues = {
    updatePageFromMenu,
  }
  return returnValues
}
export default useFunctions