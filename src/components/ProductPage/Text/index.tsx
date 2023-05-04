import React, { PropsWithChildren } from 'react'

export const Text = ({ children }: PropsWithChildren) => {
  return (
    <p data-testid="productpage-text" className="text-slate-600 max-w-lg">
      {children}
    </p>
  )
}
