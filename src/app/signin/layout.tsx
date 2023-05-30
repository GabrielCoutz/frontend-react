import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'
import { cookies } from 'next/headers'

import { tokenIsValid } from '../../helpers/tokenIsValid'

export default async function SigninLayout({ children }: PropsWithChildren) {
  const tokenExist = cookies().get('token')?.value

  if (tokenExist && (await tokenIsValid(tokenExist))) redirect('/profile')

  return <>{children}</>
}
