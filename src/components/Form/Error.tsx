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

  return errors[field]?.message?.toString() ? (
    <span className="text-red-500 flex text-sm items-center">
      <ExclamationCircleIcon className="h-4 w-4 text-red-600 me-1" />
      {errors[field]?.message?.toString()}
    </span>
  ) : null
}
