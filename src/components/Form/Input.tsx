import { InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  errorMessage?: string
}

export const Input = (props: InputProps) => {
  const { register } = useFormContext()
  return (
    <>
      <input
        {...props}
        {...register(props.name, { required: props.errorMessage })}
        id={props.name}
        className="rounded border-2 border-gray-400 hover:border-indigo-600 focus:border-indigo-600 transition"
      />
    </>
  )
}
