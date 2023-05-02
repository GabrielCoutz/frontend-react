import React from 'react'
import { useFormContext } from 'react-hook-form'

interface TextareaProps {
  name: string
  errormessage?: string
  cols?: number
  rows?: number
  placeholder?: string
  error?: boolean
}

export const Textarea = ({ name, errormessage, cols, rows, placeholder, error }: TextareaProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const fieldErro = errors[name]?.message?.toString()

  return (
    <textarea
      data-testid="form-textarea"
      id={name}
      cols={cols}
      rows={rows}
      placeholder={placeholder}
      {...register(name, { required: errormessage })}
      className={`rounded-lg border-gray-200 shadow hover:shadow-sm focus:ring-inset-primary-600 ring-inset transition text-sm focus:ring-primary-700 h-auto ${
        fieldErro || error ? 'ring-2 ring-red-500' : ''
      }`}
    ></textarea>
  )
}
