import React from 'react'
import { selectUserName } from '../../redux/user/userSelectors'
import { HeaderLink } from './HeaderLink'

export const ProfileButton = () => {
  const userName = selectUserName()

  return <HeaderLink href="profile">{userName}</HeaderLink>
}
