import { createContext, Dispatch, SetStateAction } from "react"

export interface IOption {
  component: string
  key: string
  active: boolean
}

export type IOptionList = IOption[]

export const optionsList: IOptionList = [
  {
    component: 'componente 1',
    key: 'my data',
    active: true,
  },
  {
    component: 'componente 2',
    key: 'my products',
    active: false,
  },
  {
    component: 'componente 3',
    key: 'config',
    active: false,
  },
]

export interface IProfileContext {
  optionsList: IOptionList
  activeOption: IOption
  setActiveOption: Dispatch<SetStateAction<IOption>>
  menuIsOpen: boolean
  setMenuIsOpen: Dispatch<SetStateAction<boolean>>
}

export const ProfileContext = createContext<IProfileContext>({} as IProfileContext)