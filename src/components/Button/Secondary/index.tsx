import React from 'react'
import { ButtonProps } from '..'

export const Secondary = (props: ButtonProps) => {
  return (
    <button
      data-testid={props['data-testid']}
      className={`font-semibold bg-slate-50 hover:bg-slate-200 border-primary-600 border-2 py-2 px-8 text-primary-600 transition h-min-9 rounded-lg disabled:cursor-not-allowed ${
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
