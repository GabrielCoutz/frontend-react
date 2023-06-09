'use client'

import React from 'react'
import { Bars2Icon, XMarkIcon } from '@heroicons/react/24/outline'

import { useProfileContext } from '../../../hooks/useProfileContext'

export const NavToggle = () => {
  const { setMenuIsOpen, menuIsOpen } = useProfileContext()

  return (
    <button
      className="p-2 rounded-lg text-white transition border border-transparent hover:border-white md:hidden"
      onClick={() => setMenuIsOpen(!menuIsOpen)}
      data-testid="sidenav-navtoggle"
    >
      {menuIsOpen ? (
        <XMarkIcon className="w-6 h-6" />
      ) : (
        <Bars2Icon className="w-6 h-6" />
      )}
    </button>
  )
}
