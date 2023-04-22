import React, { TextareaHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
}

export const Textarea = (props: TextareaProps) => {
  const { register } = useFormContext()

  return (
    <textarea
      {...props}
      id={props.name}
      {...register(props.name)}
      className={`rounded-lg border-gray-200 shadow hover:shadow-sm focus:ring-inset-indigo-600 ring-inset transition text-sm focus:ring-indigo-700 h-auto ${props.className}`}
    ></textarea>
  )
}
