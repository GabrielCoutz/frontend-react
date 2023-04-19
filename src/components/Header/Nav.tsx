import Link from 'next/link'
import React, { useState } from 'react'
import CloseIcon from '../Icons/Close'
import MenuIcon from '../Icons/Menu'

interface ILink {
  path: string
  name: string
}

const links: ILink[] = [
  {
    path: 'signup',
    name: 'Cadastrar-se',
  },
  {
    path: 'signin',
    name: 'Login',
  },
]

export const Nav = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden p-2 hover:border-white focus:border-white border border-transparent rounded-lg transition"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>
      <nav
        className={`${
          open
            ? 'max-md:absolute max-md:bg-slate-800 max-md:w-full max-md:left-0 max-md:top-14'
            : 'max-md:hidden'
        }`}
      >
        <ul className="flex gap-4 max-md:flex-col max-md:p-4">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                href={link.path}
                className="py-2 px-3 rounded-lg hover:bg-indigo-500 transition block max-md:hover:bg-slate-600"
                onClick={() => setOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
