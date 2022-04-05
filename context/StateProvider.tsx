import {
  useContext,
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react'

const StateContext = createContext(
  {} as {
    toggle: boolean
    setToggle: Dispatch<SetStateAction<boolean>>
  }
)

interface StateProviderProps {
  children: ReactNode
}

export const StateProvider = ({ children }: StateProviderProps) => {
  const [toggle, setToggle] = useState(false)
  return (
    <StateContext.Provider value={{ toggle, setToggle }}>
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)
