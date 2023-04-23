import React, { useContext } from 'react'
import { Bars2Icon, XMarkIcon } from '@heroicons/react/24/outline'

import { HeaderContext } from '../../contexts/header'

export const MobileButton = () => {
  const { menuIsOpen, setMenuIsOpen } = useContext(HeaderContext)

  return (
    <button
      onClick={() => setMenuIsOpen(!menuIsOpen)}
      className="md:hidden p-2 hover:border-white focus:border-white border border-transparent rounded-lg transition"
    >
      {menuIsOpen ? (
        <XMarkIcon className="w-6 h-6" />
      ) : (
        <Bars2Icon className="w-6 h-6" />
      )}
    </button>
  )
}
