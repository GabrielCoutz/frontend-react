import React from 'react'

interface FieldProps {
  children: React.ReactNode
  className?: string
}

export const Field = ({ children, className }: FieldProps) => {
  return (
    <div
      data-testid="form-field"
      className={`flex flex-col gap-2 ${className}`}
    >
      {children}
    </div>
  )
}
