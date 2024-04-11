import { createContext, useState } from "react"
import { MenuList, routes } from "../constants"

interface IAppContext {
  count: number,
  setCount: React.Dispatch<React.SetStateAction<number>>,

  activeMenu: keyof typeof routes,
  setActiveMenu: React.Dispatch<React.SetStateAction<keyof typeof routes>>,
  curStep: number,
  setCurStep: React.Dispatch<React.SetStateAction<number>>,
  concentration: number,
  setConcentration: React.Dispatch<React.SetStateAction<number>>,
  reactionTime: number,
  setReactionTime: React.Dispatch<React.SetStateAction<number>>,

  updateStepPlay: (step: number) => void
}

const initialState = {
  count: 0,

  stepPlay: 0,
  concentration: 70,
  reactionTime: 10,
}

const AppContext = createContext({} as IAppContext)

export const AppDataProvider = (props: any) => {
  const { children } = props
  const [count, setCount] = useState(props.count || initialState.count || 0)

  const [activeMenu, setActiveMenu] = useState<keyof typeof routes>(MenuList.zero)
  const [curStep, setCurStep] = useState(props.stepMotion || initialState.stepPlay || 0)
  const [concentration, setConcentration] = useState(initialState.concentration)
  const [reactionTime, setReactionTime] = useState<number>(initialState.reactionTime);

  // need update
  const updateStepPlay = (step: number) => {
    let update = curStep + step
    if (update < 0) update = 0
    else if (update > 5) update = 5
    setCurStep(update)
  }

  return (
    <AppContext.Provider
      value={{
        count,
        setCount,

        activeMenu,
        setActiveMenu,
        curStep,
        setCurStep,
        updateStepPlay,
        concentration,
        setConcentration,
        reactionTime,
        setReactionTime,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContext