import { createContext, Dispatch, SetStateAction } from "react"

export interface IOption {
  component: JSX.Element
  name: string
  active: boolean
}

export type IOptionList = IOption[]

export interface IProfileContext {
  activeOption: IOption | null
  setActiveOption: Dispatch<SetStateAction<IOption | null>>
  menuIsOpen: boolean
  setMenuIsOpen: Dispatch<SetStateAction<boolean>>
}

export const ProfileContext = createContext<IProfileContext>({} as IProfileContext)