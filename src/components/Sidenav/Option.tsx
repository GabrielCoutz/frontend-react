import React, { useContext } from 'react'
import { IOption, ProfileContext } from '../../contexts/profile'
import { Button } from '../Button'

export const Option = ({ option }: { option: IOption }) => {
  const { activeOption, setActiveOption, setMenuIsOpen, menuIsOpen } =
    useContext(ProfileContext)
  const optionIsSelected = option.name === activeOption?.name

  const changeOption = (selectedOption: IOption) => {
    selectedOption.active = true
    setActiveOption(selectedOption)
    setMenuIsOpen(!menuIsOpen)
  }

  return (
    <li>
      {optionIsSelected ? (
        <Button.Primary className="w-full" onClick={() => changeOption(option)}>
          {option.name}
        </Button.Primary>
      ) : (
        <Button.Secondary
          className="w-full"
          onClick={() => changeOption(option)}
        >
          {option.name}
        </Button.Secondary>
      )}
    </li>
  )
}
