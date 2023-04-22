import React, { PropsWithChildren } from 'react'

export const Wrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        {children}
      </div>
    </div>
  )
}
