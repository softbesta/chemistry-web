import { createContext, useState } from "react"
import { MenuList, routes } from "../constants"
import { PageMenuType } from "../helper/types"

interface IAppContext {
  // menu name for currently opened page.
  curMenu: PageMenuType,
  setCurMenu: React.Dispatch<React.SetStateAction<PageMenuType>>,
  curStep: number,
  setCurStep: React.Dispatch<React.SetStateAction<number>>,

  // concentrationAB; minValue = 0, maxValue = 100
  // A: concentrationAB[0],  B: concentrationAB[1]    A > B
  concentrationAB: (number | undefined)[],
  setConcentrationAB: React.Dispatch<React.SetStateAction<(number | undefined)[]>>,

  // reactionTime; minValue = 0, maxValue = 20
  // A: reactionTime[0],     B: reactionTime[1]       A < B
  reactionTime: number[],
  setReactionTime: React.Dispatch<React.SetStateAction<number[]>>,

  updateStepPlay: (step: number) => void
}

const initialState = {
  count: 0,

  stepPlay: 0,
  concentration: [100, 70],
  reactionTime: [10, 15],
}

const AppContext = createContext({} as IAppContext)

export const AppDataProvider = (props: any) => {
  const { children } = props
  const [count, setCount] = useState(props.count || initialState.count || 0)

  const [curMenu, setCurMenu] = useState<PageMenuType>(MenuList.zero)
  const [curStep, setCurStep] = useState(props.stepMotion || initialState.stepPlay || 0)
  const [concentrationAB, setConcentrationAB] = useState<(number | undefined)[]>(initialState.concentration)
  const [concentrationCD, setConcentrationCD] = useState(initialState.concentration)
  const [concentrationEF, setConcentrationEF] = useState(initialState.concentration)
  const [reactionTime, setReactionTime] = useState<number[]>(initialState.reactionTime);

  // need update, don't use yet
  const updateStepPlay = (step: number) => {
    let update = curStep + step
    if (update < 0) update = 0
    else if (update > 5) update = 5
    setCurStep(update)
  }

  return (
    <AppContext.Provider
      value={{
        curMenu,
        setCurMenu,
        curStep,
        setCurStep,
        updateStepPlay,
        concentrationAB,
        setConcentrationAB,
        reactionTime,
        setReactionTime,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContext