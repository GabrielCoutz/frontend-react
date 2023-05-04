import { HTMLInputTypeAttribute } from 'react'
import { useFormContext, ValidationRule } from 'react-hook-form'

export interface InputProps {
  name: string
  errormessage?: string
  validation?: ValidationRule<RegExp> | undefined
  error?: boolean
  type?: HTMLInputTypeAttribute
  placeholder?: string
  autoComplete?: string
  prefix?: 'currency' | 'default'
}

export const Input = ({
  name,
  error = false,
  errormessage,
  validation,
  type = 'text',
  placeholder,
  autoComplete,
  prefix,
}: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const fieldErro = errors[name]?.message?.toString()

  return (
    <div className="flex items-center flex-1">
      {prefix === 'currency' && (
        <span className="me-2 inline text-gray-600 hover:cursor-default">
          R$
        </span>
      )}
      <input
        data-testid="form-input"
        id={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register(name, {
          required: errormessage,
          pattern: validation,
        })}
        className={`rounded-lg h-9 border-gray-200 shadow hover:shadow-sm focus:ring-inset-primary-600 w-full ring-inset transition text-sm focus:ring-primary-700 ${
          fieldErro || error ? 'ring-2 ring-red-500' : ''
        }`}
      />
    </div>
  )
}
