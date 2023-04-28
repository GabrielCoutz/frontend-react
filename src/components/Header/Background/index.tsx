import React, { PropsWithChildren } from 'react'

export const Background = ({ children }: PropsWithChildren) => {
  return (
    <header
      className="bg-indigo-600 shadow-lg shadow-indigo-200"
      data-testid="header-background"
    >
      {children}
    </header>
  )
}
