'use client'

import React from 'react'
import { useProfileContext } from '../../hooks/useProfileContext'

export const ProfileDisplay = () => {
  const { activeOption } = useProfileContext()

  return (
    <div
      className="shadow-md border border-slate-200 rounded-lg rounded-s-none p-4 max-md:rounded-t-none max-md:rounded-b-lg"
      data-testid="profiledisplay"
    >
      {activeOption?.component}
    </div>
  )
}
