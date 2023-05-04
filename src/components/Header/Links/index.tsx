import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { HeaderContext } from '../../../contexts/header'
import { selectUserName } from '../../../redux/user/userSelectors'
import { HeaderLink } from '.././HeaderLink'
import { ProfileButton } from '.././ProfileButton'

export interface ILink {
  path: string
  name: string
}

const links: ILink[] = [
  {
    path: '/signup',
    name: 'Cadastrar-se',
  },
  {
    path: '/signin',
    name: 'Login',
  },
]

export const Links = () => {
  const { setMenuIsOpen } = useContext(HeaderContext)

  const [userIsLogged, setUserIslogged] = useState(false)
  const userName = useSelector(selectUserName)

  useEffect(() => {
    if (userName) setUserIslogged(true)
    else setUserIslogged(false)
  }, [userName])

  return (
    <ul
      className="flex gap-4 max-md:flex-col max-md:p-4"
      data-testid="header-links"
    >
      {userIsLogged ? (
        <ProfileButton />
      ) : (
        links.map((link) => (
          <li key={link.path}>
            <HeaderLink href={link.path} onClick={() => setMenuIsOpen(false)}>
              {link.name}
            </HeaderLink>
          </li>
        ))
      )}
    </ul>
  )
}
