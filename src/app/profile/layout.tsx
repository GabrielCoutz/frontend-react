import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'
import { cookies } from 'next/headers'

import { tokenIsValid } from '../../helpers/tokenIsValid'
import { ProfileContext } from '../../contexts/profile'

interface ProfileLayoutProps {
  children: ReactNode
  modal: ReactNode
}

const ProfileLayout = async ({ children, modal }: ProfileLayoutProps) => {
  const tokenExist = cookies().get('token')?.value

  if (tokenExist && !(await tokenIsValid(tokenExist))) redirect('/signin')

  return (
    <ProfileContext>
      {modal}
      {children}
    </ProfileContext>
  )
}

export default ProfileLayout
