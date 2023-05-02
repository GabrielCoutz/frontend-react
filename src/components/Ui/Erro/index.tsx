import React from 'react'

interface ErroProps {
  children?: string | null
}

export const Erro = ({ children }: ErroProps) => {
  if (children)
    return (
      <div
        data-testid="ui-erro"
        className={`text-sm font-medium px-4 py-1 text-red-700 max-md:text-center rounded-lg bg-red-100`}
      >
        {children}
      </div>
    )
  return null
}
