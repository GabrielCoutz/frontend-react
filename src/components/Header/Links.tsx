import Link from 'next/link'
import React, { useContext } from 'react'
import { HeaderContext } from '../../contexts/header'

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

export const Links = () => {
  const { setMenuIsOpen } = useContext(HeaderContext)

  return (
    <ul className="flex gap-4 max-md:flex-col max-md:p-4">
      {links.map((link) => (
        <li key={link.path}>
          <Link
            href={link.path}
            className="py-2 px-3 rounded-lg hover:bg-indigo-500 transition block max-md:hover:bg-slate-600"
            onClick={() => setMenuIsOpen(false)}
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}
