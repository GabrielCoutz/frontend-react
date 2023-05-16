import React, { ReactNode } from 'react'

interface SignupLayoutProps {
  children: ReactNode
  modal: ReactNode
}

const SignupLayout = ({ children, modal }: SignupLayoutProps) => {
  return (
    <>
      {modal}
      {children}
    </>
  )
}

export default SignupLayout
