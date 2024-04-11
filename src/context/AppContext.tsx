import { createContext, useState } from "react"

interface IAppContext {
  count: number,
  setCount: React.Dispatch<React.SetStateAction<number>>,

  stepZero: number,
  setStepZero: React.Dispatch<React.SetStateAction<number>>,
  concentration: number,
  setConcentration: React.Dispatch<React.SetStateAction<number>>,
  reactionTime: number,
  setReactionTime: React.Dispatch<React.SetStateAction<number>>,
}

const initialState = {
  count: 0,

  stepZero: 0,
  concentration: 70,
  reactionTime: 10,
}

const AppContext = createContext({} as IAppContext)

export const AppDataProvider = (props: any) => {
  const { children } = props
  const [count, setCount] = useState(props.count || initialState.count || 0)
  
  const [stepZero, setStepZero] = useState(props.count || initialState.count || 0)
  const [concentration, setConcentration] = useState(initialState.concentration)
  const [reactionTime, setReactionTime] = useState<number>(initialState.reactionTime);

  return (
    <AppContext.Provider
      value={{
        count,
        setCount,

        stepZero,
        setStepZero,
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