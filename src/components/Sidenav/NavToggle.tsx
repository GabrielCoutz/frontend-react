import React, { useContext } from 'react'
import { ProfileContext } from '../../context/profile'
import CloseIcon from '../Icons/Close'
import MenuIcon from '../Icons/Menu'

export const NavToggle = () => {
  const { setMenuIsOpen, menuIsOpen } = useContext(ProfileContext)

  return (
    <button
      className="p-2 rounded-lg text-white transition border border-transparent hover:border-white md:hidden"
      onClick={() => setMenuIsOpen(!menuIsOpen)}
    >
      {menuIsOpen ? <CloseIcon /> : <MenuIcon />}
    </button>
  )
}
