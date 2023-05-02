import React from 'react'

interface ActionsProps {
  children: React.ReactNode
}

export const Actions = ({ children }: ActionsProps) => {
  return <div data-testid="modal-actions">{children}</div>
}
