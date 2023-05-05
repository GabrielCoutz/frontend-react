import React from 'react'
import { ButtonProps } from '..'

export const Danger = (props: ButtonProps) => {
  return (
    <button
      data-testid={props['data-testid']}
      className={`font-semibold bg-red-500 hover:bg-red-700 whitespace-nowrap py-2 px-8 text-slate-50 transition border-transparent border h-min-9 rounded-lg disabled:bg-red-400 disabled:cursor-not-allowed ${
        props.fullWidth ? 'w-full' : ''
      }`}
      disabled={props.loading || props.disabled}
      onClick={props.onClick}
      type={props.type}
    >
      {props.loading ? 'Aguarde...' : props.children}
    </button>
  )
}
