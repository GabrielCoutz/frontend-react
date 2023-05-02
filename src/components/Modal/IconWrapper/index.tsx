import React from 'react'

interface IconWrapperProps {
  children: React.ReactNode
  className: string
}

export const IconWrapper = ({ children, className }: IconWrapperProps) => {
  return (
    <div
      data-testid="modal-iconwrapper"
      className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10 mb-2 ${className}`}
    >
      {children}
    </div>
  )
}
