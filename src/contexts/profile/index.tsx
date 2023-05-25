'use client'

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from 'react'

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

export const CreateProfileContext = createContext<IProfileContext>(
  {} as IProfileContext,
)
export const ProfileContext = ({ children }: PropsWithChildren) => {
  const [activeOption, setActiveOption] = useState<IOption | null>(null)
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  return (
    <CreateProfileContext.Provider
      value={{
        activeOption,
        setActiveOption,
        menuIsOpen,
        setMenuIsOpen,
      }}
    >
      {children}
    </CreateProfileContext.Provider>
  )
}
