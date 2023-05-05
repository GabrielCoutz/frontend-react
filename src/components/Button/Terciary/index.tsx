import React from 'react'
import { ButtonProps } from '..'

export const Terciary = (props: ButtonProps) => {
  return (
    <button
      data-testid={props['data-testid']}
      className={`font-semibold text-primary-600 transition hover:text-primary-950 border-transparent border h-min-9 rounded-lg ${
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
