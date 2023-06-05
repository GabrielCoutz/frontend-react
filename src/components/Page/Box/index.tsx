import React, { PropsWithChildren } from 'react'

export const Box = ({ children }: PropsWithChildren) => {
  return (
    <div data-testid="productpage-box" className="my-4 space-y-2">
      {children}
    </div>
  )
}
