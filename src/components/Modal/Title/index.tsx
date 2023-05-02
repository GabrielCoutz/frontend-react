import React from 'react'

interface TitleProps {
  children: React.ReactNode
}

export const Title = ({ children }: TitleProps) => {
  return (
    <h3
      data-testid="modal-title"
      className="text-base font-semibold leading-6 text-slate-900 mb-2"
    >
      {children}
    </h3>
  )
}
