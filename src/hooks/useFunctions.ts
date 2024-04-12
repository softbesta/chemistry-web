import { useLocation, useNavigate } from "react-router-dom"
import { PageMenuType } from "../helper/types"
import useAppData from "./useAppData";
import { routes } from "../constants";

const useFunctions = () => {
  const navigate = useNavigate()
  let location = useLocation()
  const { setCurMenu } = useAppData()

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
    updatePageFromMenu
  }
  return returnValues
}
export default useFunctions