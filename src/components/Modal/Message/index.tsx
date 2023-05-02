import React from 'react'

interface MessageProps {
  children: React.ReactNode
}

export const Message = ({ children }: MessageProps) => {
  return (
    <p data-testid="modal-message" className="text-sm text-gray-500 mb-4">
      {children}
    </p>
  )
}
