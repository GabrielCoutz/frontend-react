import { InputHTMLAttributes } from 'react'
import { useFormContext, ValidationRule } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  errormessage?: string
  validation?: ValidationRule<RegExp> | undefined
}

export const Input = (props: InputProps) => {
  const { register } = useFormContext()
  return (
    <>
      <input
        {...props}
        {...register(props.name, {
          required: props.errormessage,
          pattern: props.validation,
        })}
        id={props.name}
        className={`rounded-lg h-9 border-gray-200 shadow hover:shadow-sm focus:ring-inset-indigo-600 ring-inset transition text-sm focus:ring-indigo-700 ${props.className}`}
      />
    </>
  )
}
