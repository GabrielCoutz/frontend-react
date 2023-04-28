import React, { PropsWithChildren, useContext } from 'react'
import { HeaderContext } from '../../../contexts/header'

export const Nav = ({ children }: PropsWithChildren) => {
  const { menuIsOpen } = useContext(HeaderContext)

  return (
    <>
      <nav
        className={`${
          menuIsOpen
            ? 'max-md:absolute max-md:bg-slate-800 max-md:w-full max-md:left-0 max-md:top-14 rounded-b-lg'
            : 'max-md:hidden'
        }`}
        data-testid="header-nav"
      >
        {children}
      </nav>
    </>
  )
}
