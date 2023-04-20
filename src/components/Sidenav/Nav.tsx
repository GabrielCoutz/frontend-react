import React, { PropsWithChildren } from 'react'

export const Nav = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-indigo-700 md:p-4 rounded-lg rounded-e-none max-md:rounded-b-none max-md:rounded-t-lg">
      <nav>{children}</nav>
    </div>
  )
}
