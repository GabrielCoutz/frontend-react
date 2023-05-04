import React from 'react'

interface SubtitleProps {
  children: string
}

export const Subtitle = ({ children }: SubtitleProps) => {
  return (
    <h3
      data-testid="productpage-subtitle"
      className="font-semibold text-lg text-slate-800"
    >
      {children}
    </h3>
  )
}
