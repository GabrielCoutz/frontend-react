import React, { useContext, useEffect } from 'react'

import { ProfileContext } from '../../../contexts/profile'
import { LogoutButton } from '.././LogoutButton'
import { MyProducts } from '../../MyProducts'
import { UserForm } from '../../UserForm'
import { Config } from '../../Configs'
import { Option } from '.././Option'

export const optionsList = [
  {
    component: <UserForm />,
    name: 'Meus dados',
    active: true,
  },
  {
    component: <MyProducts />,
    name: 'Meus produtos',
    active: false,
  },
  {
    component: <Config />,
    name: 'Configurações',
    active: false,
  },
]

export const Options = () => {
  const { menuIsOpen, setActiveOption } = useContext(ProfileContext)

  useEffect(() => setActiveOption(optionsList[0]), [])

  return (
    <ul
      className={`transition-all flex flex-col gap-3 p-4 md:h-full ${
        menuIsOpen ? '' : 'max-md:hidden'
      }`}
      data-testid="sidenav-options"
    >
      {optionsList.map((option) => (
        <Option option={option} key={option.name} />
      ))}
      <li className="md:flex md:items-end md:flex-1">
        <LogoutButton />
      </li>
    </ul>
  )
}
