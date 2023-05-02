import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

import { Form } from '..'
import { InputProps } from '../Input'

type InputType = 'password' | 'text'

export const PasswordInput = (props: InputProps) => {
  const [inputType, setInputType] = useState<InputType>('password')

  const togglePassword = () => {
    const type = inputType === 'password' ? 'text' : 'password'

    setInputType(type)
  }

  return (
    <div className="flex relative">
      <Form.Input {...props} name={props.name} type={inputType} />
      <button
        type="button"
        onClick={togglePassword}
        className="rounded-lg rounded-s-none px-2 shadow border-s-0 border-gray-200 border absolute right-0 top-0 h-full bg-white"
      >
        {inputType === 'password' ? (
          <EyeIcon className="w-6 h-6" />
        ) : (
          <EyeSlashIcon className="w-6 h-6" />
        )}
      </button>
    </div>
  )
}
