import React, { useContext, useEffect } from 'react'
import { ProfileContext } from '../../contexts/profile'
import { Config } from '../Configs'
import { MyProducts } from '../MyProducts'
import { UserForm } from '../UserForm'
import { Option } from './Option'

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
      className={`transition-all flex flex-col gap-3 p-4 ${
        menuIsOpen ? '' : 'max-md:hidden'
      }`}
    >
      {optionsList.map((option) => (
        <Option option={option} key={option.name} />
      ))}
    </ul>
  )
}
