'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

import { clearLocalData } from '../../../helpers/clearLocalData'
import { useUserStore } from '../../../hooks/useUserStore'

export const LogoutButton = () => {
  const { push } = useRouter()
  const { logoutUser } = useUserStore()

  const logout = () => {
    logoutUser()
    clearLocalData(['token', 'userId'])
    push('signin')
  }

  return (
    <button
      data-testid="logoutbutton"
      className="w-full text-white border border-transparent hover:border-slate-100 rounded-lg transition"
      onClick={logout}
    >
      Sair
    </button>
  )
}
