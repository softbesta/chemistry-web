import { createContext, useState } from "react"

interface IAppContext {
  count: number,
  setCount: React.Dispatch<React.SetStateAction<number>>,

  concentration: number,
  setConcentration: React.Dispatch<React.SetStateAction<number>>,
  reactionTime: number,
  setReactionTime: React.Dispatch<React.SetStateAction<number>>,
}

const initialState = {
  count: 0,

  concentration: 50,
  time: 0,
}

const AppContext = createContext({} as IAppContext)

export const AppDataProvider = (props: any) => {
  const { children } = props
  const [count, setCount] = useState(props.count || initialState.count || 0)

  const [concentration, setConcentration] = useState(50)
  const [reactionTime, setReactionTime] = useState<number>(0);

  return (
    <AppContext.Provider
      value={{
        count,
        setCount,

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