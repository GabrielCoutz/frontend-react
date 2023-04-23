import React, { useContext } from 'react'
import { Bars2Icon, XMarkIcon } from '@heroicons/react/24/outline'

import { ProfileContext } from '../../contexts/profile'

export const NavToggle = () => {
  const { setMenuIsOpen, menuIsOpen } = useContext(ProfileContext)

  return (
    <button
      className="p-2 rounded-lg text-white transition border border-transparent hover:border-white md:hidden"
      onClick={() => setMenuIsOpen(!menuIsOpen)}
    >
      {menuIsOpen ? (
        <XMarkIcon className="w-6 h-6" />
      ) : (
        <Bars2Icon className="w-6 h-6" />
      )}
    </button>
  )
}
