import Link from 'next/link'
import React from 'react'

export const Logo = () => {
  return (
    <Link
      href="/"
      className="flex align-middle p-2 hover:bg-indigo-500 transition rounded-lg"
      data-testid="header-logo"
    >
      Meu app
    </Link>
  )
}
