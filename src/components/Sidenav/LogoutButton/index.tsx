import { useRouter } from 'next/router'
import React from 'react'
import { useDispatch } from 'react-redux'
import { clearLocalData } from '../../../helpers/clearLocalData'
import { logoutUser } from '../../../redux/user/userSlice'
import { Button } from '../../Button'

export const LogoutButton = () => {
  const { push } = useRouter()
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(logoutUser())
    clearLocalData()
    push('signin')
  }

  return (
    <Button.Terciary className="w-full text-white" onClick={logout}>
      Sair
    </Button.Terciary>
  )
}
