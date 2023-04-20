import React, { useContext } from 'react'
import { ProfileContext } from '../../context/profile'
import { Option } from './Option'

export const Options = () => {
  const { optionsList, menuIsOpen } = useContext(ProfileContext)

  return (
    <ul
      className={`transition-all flex flex-col gap-3 p-4 ${
        menuIsOpen ? 'max-md:hidden' : ''
      }`}
    >
      {optionsList.map((option) => (
        <Option option={option} key={option.key} />
      ))}
    </ul>
  )
}
