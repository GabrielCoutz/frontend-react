import React, { useContext } from 'react'
import { ProfileContext } from '../../context/profile'
import { Option } from './Option'

export const Options = () => {
  const { optionsList, menuIsOpen } = useContext(ProfileContext)

  return (
    <ul
      className={`md:h-full transition-all flex flex-col gap-3 p-4 ${
        menuIsOpen ? 'hidden' : 'block'
      }`}
    >
      {optionsList.map((option) => (
        <Option option={option} key={option.key} />
      ))}
    </ul>
  )
}
