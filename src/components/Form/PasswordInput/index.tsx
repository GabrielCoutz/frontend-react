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
    <div className="flex">
      <Form.Input
        {...props}
        name={props.name}
        type={inputType}
        className={`grid grid-cols-[1fr,auto] w-full pr-12 rounded-e-none z-10 ${props.className}`}
      />
      <button
        type="button"
        onClick={togglePassword}
        className="rounded-lg rounded-s-none px-2 shadow border-s-0 border-gray-200 border"
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
