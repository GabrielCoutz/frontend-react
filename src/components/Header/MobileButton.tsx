import React, { useContext } from 'react'
import { HeaderContext } from '../../contexts/header'
import CloseIcon from '../Icons/Close'
import MenuIcon from '../Icons/Menu'

export const MobileButton = () => {
  const { menuIsOpen, setMenuIsOpen } = useContext(HeaderContext)

  return (
    <button
        onClick={() => setMenuIsOpen(!menuIsOpen)}
        className="md:hidden p-2 hover:border-white focus:border-white border border-transparent rounded-lg transition"
      >
        {menuIsOpen ? <CloseIcon /> : <MenuIcon />}
      </button>
  )
}
