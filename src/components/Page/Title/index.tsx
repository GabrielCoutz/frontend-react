import React from 'react'

interface TitleProps {
  children: string
}

export const Title = ({ children }: TitleProps) => {
  return (
    <h1
      data-testid="productpage-title"
      className="font-semibold text-2xl text-slate-800"
    >
      {children}
    </h1>
  )
}
