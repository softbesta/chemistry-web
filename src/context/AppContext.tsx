import { createContext, useRef, useState } from "react"
import { MenuList, initDots, routes } from "../constants"
import { PageMenuType } from "../helper/types"

interface IAppContext {

  // --- Description --- courseStatus
  // available course(menu) list.
  courseStatus: MenuList[],
  setCourseStatus: React.Dispatch<React.SetStateAction<MenuList[]>>,
  // --- Description --- curMenu
  // menu name for opened page.
  curMenu: PageMenuType,
  setCurMenu: React.Dispatch<React.SetStateAction<PageMenuType>>,
  // --- Description --- curStep
  // current tutorial step for opened page.
  curStep: number,
  setCurStep: React.Dispatch<React.SetStateAction<number>>,

  // --- Description --- concentrationAB
  // ; minValue = 0, maxValue = 100
  // A: concentrationAB[0],  B: concentrationAB[1]    A > B
  valuesC: (number)[],
  setValuesC: React.Dispatch<React.SetStateAction<(number)[]>>,

  // --- Description --- reactionTime
  // ; minValue = 0, maxValue = 20
  // A: reactionTime[0],     B: reactionTime[1]       A < B
  valuesT: number[],
  setValuesT: React.Dispatch<React.SetStateAction<number[]>>,

  // animation time frame
  timeframe: number,
  setTimeframe: React.Dispatch<React.SetStateAction<number>>,

  // *** canvas Time actions
  // setPlayAnimation: React.Dispatch<React.SetStateAction<boolean>>,
  canvaTimeState: number,
  setCanvaTimeState: React.Dispatch<React.SetStateAction<number>>,
  canvaTimeSliderT: number[]
  setCanvaTimeSliderT: React.Dispatch<React.SetStateAction<number[]>>,
  canvaTimeSliderC: number[]
  setCanvaTimeSliderC: React.Dispatch<React.SetStateAction<number[]>>,

  // *** canvas Beaker actions
  canvaBeakerState: number,
  setCanvaBeakerState: React.Dispatch<React.SetStateAction<number>>,
  beakerDots: React.MutableRefObject<number[]>
  beakerDotsEnd: React.MutableRefObject<number[]>
}

const initialState = {
  count: 0,

  stepPlay: 0,
  concentration: [70, 35],
  reactionTime: [10, 15],

  // animation time frame (0-100)
  timeframe: 0,

  // *** canvas Time graph
  // playAnimation: false,
  canvaTimeState: 0, // 0: frame, 1: show graph, 2: animation, 3: show end

  // 0: hidden, 1: disabled, 2: active
  canvaTimeSliderC: [2, 0],
  canvaTimeSliderT: [2, 0],

  // *** canvas Beaker
  canvaBeakerState: 0, // 0: empty, 1: show one, 2: animation, 3: show two
  beakerDots: initDots,
}

const AppContext = createContext({} as IAppContext)

export const AppDataProvider = (props: any) => {
  const { children } = props
  const [count, setCount] = useState(props.count || initialState.count || 0)

  // available course (menu) list in order by
  const [courseStatus, setCourseStatus] = useState<MenuList[]>([MenuList.zero])

  // use Menu, Step to manage page
  const [curMenu, setCurMenu] = useState<PageMenuType>(MenuList.zero)
  const [curStep, setCurStep] = useState(props.stepMotion || initialState.stepPlay || 0)

  // animation time frame (0-100)
  const [timeframe, setTimeframe] = useState<number>(initialState.timeframe)

  //  0; show Frame,  1; show Graph, 2; show Animation, 3; show end of Animation
  const [canvaTimeState, setCanvaTimeState] = useState<number>(initialState.canvaTimeState)

  const [valuesC, setValuesC] = useState<(number)[]>(initialState.concentration)
  const [valuesT, setValuesT] = useState<number[]>(initialState.reactionTime)
  const [canvaTimeSliderC, setCanvaTimeSliderC] = useState<number[]>(initialState.canvaTimeSliderC)
  const [canvaTimeSliderT, setCanvaTimeSliderT] = useState<number[]>(initialState.canvaTimeSliderT)

  const [canvaBeakerState, setCanvaBeakerState] = useState<number>(initialState.canvaBeakerState)
  const beakerDots = useRef<number[]>(initialState.beakerDots)
  const beakerDotsEnd = useRef<number[]>(initialState.beakerDots)

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
        courseStatus,
        setCourseStatus,
        curMenu,
        setCurMenu,
        curStep,
        setCurStep,
        // updateStepPlay,
        valuesC,
        setValuesC,
        valuesT,
        setValuesT,
        // playAnimation,
        // setPlayAnimation,
// controllers - Time Canvas
        canvaTimeState,
        setCanvaTimeState,
        canvaTimeSliderT,
        setCanvaTimeSliderT,
        canvaTimeSliderC,
        setCanvaTimeSliderC,
// controllers - Energy Canvas
        canvaBeakerState,
        setCanvaBeakerState,
        beakerDots,
        beakerDotsEnd,
// animation Time change status (1-100)
        timeframe,
        setTimeframe,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContext