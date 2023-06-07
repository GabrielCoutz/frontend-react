'use client'

import React from 'react'

import { capitalize } from '../../../helpers/capitalize'
import { useUserStore } from '../../../hooks/useUserStore'
import { HeaderLink } from '.././HeaderLink'

export const ProfileButton = () => {
  const { data } = useUserStore()

  if (!data) return null
  const firstName = data.name.split(' ')[0]

  return <HeaderLink href="/profile">{capitalize(firstName)}</HeaderLink>
}
