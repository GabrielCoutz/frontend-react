import React, { useContext } from 'react'
import { ProfileContext } from '../../contexts/profile'

export const ProfileDisplay = () => {
  const { activeOption } = useContext(ProfileContext)
  return (
    <div className="shadow-md border border-slate-200 rounded-lg rounded-s-none p-4 max-md:rounded-t-none max-md:rounded-b-lg">
      {activeOption?.component}
    </div>
  )
}
