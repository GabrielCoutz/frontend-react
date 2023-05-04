import React from 'react'
import { useSelector } from 'react-redux'

import { capitalize } from '../../../helpers/capitalize'
import { selectUserName } from '../../../redux/user/userSelectors'
import { HeaderLink } from '.././HeaderLink'

export const ProfileButton = () => {
  const userName = useSelector(selectUserName)

  if (!userName) return null
  const firstName = userName.split(' ')[0]

  return <HeaderLink href="/profile">{capitalize(firstName)}</HeaderLink>
}
