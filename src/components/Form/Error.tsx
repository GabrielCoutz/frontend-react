import React from 'react'
import { useFormContext } from 'react-hook-form'
import { ErrorIcon } from '../Icons/Error'

interface ErrorProps {
  field: string
}

export const Error = ({ field }: ErrorProps) => {
  const {
    formState: { errors },
  } = useFormContext()

  return errors[field]?.message?.toString() ? (
    <span className="text-red-500 font-medium flex">
      <ErrorIcon />
      {errors[field]?.message?.toString()}
    </span>
  ) : null
}
