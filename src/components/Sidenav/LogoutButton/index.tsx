import { useRouter } from 'next/router'
import React from 'react'
import { useDispatch } from 'react-redux'
import { clearLocalData } from '../../../helpers/clearLocalData'
import { logoutUser } from '../../../redux/user/userSlice'

export const LogoutButton = () => {
  const { push } = useRouter()
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(logoutUser())
    clearLocalData(['token', 'id'])
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
