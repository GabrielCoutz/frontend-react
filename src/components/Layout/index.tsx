import React, { PropsWithChildren, useState } from 'react'
import { HeaderContext } from '../../contexts/header'
import { Header } from '../Header'

const Layout = ({ children }: PropsWithChildren) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  return (
    <>
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
      {children}
    </>
  )
}

export default Layout
