import React, { PropsWithChildren } from 'react'

export const Background = ({ children }: PropsWithChildren) => {
  return (
    <header
      className="bg-primary-600 shadow-lg shadow-primary-200"
      data-testid="header-background"
    >
      {children}
    </header>
  )
}
