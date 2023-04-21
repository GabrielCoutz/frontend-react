import React, { PropsWithChildren } from 'react'

export const Container = ({ children }: PropsWithChildren) => {
  return (
    <div className="container flex justify-between align-middle px-4 py-2 relative text-slate-50 mx-auto">
      {children}
    </div>
  )
}
