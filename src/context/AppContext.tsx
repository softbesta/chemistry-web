import { createContext, useState } from "react"

interface IAppContext {
  count: number,
  setCount: React.Dispatch<React.SetStateAction<number>>,

  stepPlay: number,
  setStepPlay: React.Dispatch<React.SetStateAction<number>>,
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

  const [stepPlay, setStepPlay] = useState(props.stepMotion || initialState.stepPlay || 0)
  const [concentration, setConcentration] = useState(initialState.concentration)
  const [reactionTime, setReactionTime] = useState<number>(initialState.reactionTime);

  const updateStepPlay = (step: number) => {
    let update = stepPlay + step
    if (update < 0) update = 0
    else if (update > 5) update = 5
    setStepPlay(update)
  }

  return (
    <AppContext.Provider
      value={{
        count,
        setCount,

        stepPlay,
        setStepPlay,
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