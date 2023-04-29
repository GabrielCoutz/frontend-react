import React, { PropsWithChildren } from 'react'

export const Nav = ({ children }: PropsWithChildren) => {
  return (
    <div
      className="shadow-md bg-indigo-700 rounded-lg rounded-e-none max-md:rounded-b-none max-md:rounded-t-lg md:h-80"
      data-testid="sidenav-nav"
    >
      <nav className="md:h-full">{children}</nav>
    </div>
  )
}
