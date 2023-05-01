import React from 'react'
import { ButtonProps } from '..'

export const Terciary = ({
  children,
  disabled,
  fullWidth,
  loading,
  onClick,
  type
}: ButtonProps) => {
  return (
    <button
      className={`font-semibold text-primary-600 transition hover:text-primary-950 border-transparent border h-min-9 rounded-lg ${
        fullWidth ? 'w-full' : ''
      }`}
      disabled={loading || disabled}
      onClick={onClick}
      type={type}
    >
      {loading ? 'Aguarde...' : children}
    </button>
  )
}
