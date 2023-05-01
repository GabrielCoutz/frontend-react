import React from 'react'
import { ButtonProps } from '..'

export const Danger = ({
  children,
  disabled,
  fullWidth,
  loading,
  onClick,
  type,
}: ButtonProps) => {
  return (
    <button
      className={`font-semibold bg-red-500 hover:bg-red-700 whitespace-nowrap py-2 px-8 text-slate-50 transition border-transparent border h-min-9 rounded-lg disabled:bg-red-400 disabled:cursor-not-allowed ${
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
