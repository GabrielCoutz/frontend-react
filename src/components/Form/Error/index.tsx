import React from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { useFormContext } from 'react-hook-form'

interface ErrorProps {
  field: string
}

export const Error = ({ field }: ErrorProps) => {
  const {
    formState: { errors },
  } = useFormContext()
  const erroMessage = errors[field]?.message?.toString()

  return erroMessage ? (
    <span
      className="text-red-500 flex text-sm items-center"
      data-testid="form-error"
    >
      <ExclamationCircleIcon className="h-4 w-4 text-red-600 me-1" />
      {erroMessage}
    </span>
  ) : null
}
