import React from 'react'
import { ButtonProps } from '..'

export const Primary = (props: ButtonProps) => {
  return (
    <button
      {...props}
      className={`font-semibol bg-primary hover:bg-primary-700 py-2 px-8 text-slate-50 transition border-transparent border h-min-9 rounded-lg disabled:bg-primary-400 disabled:cursor-not-allowed ${props.className}`}
    >
      {props.children}
    </button>
  )
}
