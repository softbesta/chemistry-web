import { createContext, useState } from "react"

interface IAppContext {
  count: number,
  setCount: React.Dispatch<React.SetStateAction<number>>,
}

const initialState = {
  count: 0
}

const AppContext = createContext({} as IAppContext)

export const AppDataProvider = (props: any) => {
  const { children } = props
  const [count, setCount] = useState(props.count || initialState.count || 0)
  return (
    <AppContext.Provider
      value={{
        count,
        setCount,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContext