import React from 'react'

interface SuccessProps {
  children?: string | null
}

export const Success = ({ children }: SuccessProps) => {
  if (children)
    return (
      <div
        data-testid="ui-success"
        className={`text-sm font-medium px-4 py-1 text-green-600 max-md:text-center rounded-lg bg-green-100`}
      >
        {children}
      </div>
    )
  return null
}
