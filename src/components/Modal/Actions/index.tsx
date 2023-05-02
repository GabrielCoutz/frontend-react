import React from 'react'

interface ActionsProps {
  children: React.ReactNode
}

export const Actions = ({ children }: ActionsProps) => {
  return (
    <div
      data-testid="modal-actions"
      className="flex gap-2 justify-center max-md:flex-col"
    >
      {children}
    </div>
  )
}
