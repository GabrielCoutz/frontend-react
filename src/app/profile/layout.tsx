import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'
import { cookies } from 'next/headers'

import { ProfileContext } from '../../contexts/profile'

interface ProfileLayoutProps {
  children: ReactNode
}

const ProfileLayout = async ({ children }: ProfileLayoutProps) => {
  const userIsLogged = cookies().get('token')?.value

  if (!userIsLogged) redirect('/signin')

  return (
    <>
      <ProfileContext>{children}</ProfileContext>
    </>
  )
}

export default ProfileLayout
