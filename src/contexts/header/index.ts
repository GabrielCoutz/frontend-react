import { createContext } from 'react'

interface IHeaderContext {
  menuIsOpen: boolean
  setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const HeaderContext = createContext<IHeaderContext>({} as IHeaderContext)
