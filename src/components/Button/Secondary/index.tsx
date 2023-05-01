import React from 'react'
import { ButtonProps } from '..'

export const Secondary = ({
  children,
  disabled,
  fullWidth,
  loading,
  onClick,
  type
}: ButtonProps) => {
  return (
    <button
      className={`font-semibold bg-slate-50 hover:bg-slate-200 border-primary-600 border-2 py-2 px-8 text-primary-600 transition h-min-9 rounded-lg disabled:cursor-not-allowed ${
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
