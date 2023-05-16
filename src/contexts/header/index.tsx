'use client'

import { createContext } from 'react'

interface IHeaderContext {
  menuIsOpen: boolean
  setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const HeaderContext = createContext<IHeaderContext>({} as IHeaderContext)

import React, { useState } from 'react'
import { Header } from '../../components/Header'

const HeaderWithContext = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  return (
    <HeaderContext.Provider value={{ menuIsOpen, setMenuIsOpen }}>
      <Header.Background>
        <Header.Container>
          <Header.Logo />
          <Header.MobileButton />
          <Header.Nav>
            <Header.Links />
          </Header.Nav>
        </Header.Container>
      </Header.Background>
    </HeaderContext.Provider>
  )
}

export default HeaderWithContext
