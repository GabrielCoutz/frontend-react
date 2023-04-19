import React from 'react'
import { ButtonProps } from '.'

export const Primary = (props: ButtonProps) => {
  return (
    <button
      {...props}
      className={`font-semibold bg-indigo-600 hover:bg-indigo-700 py-2 px-8 text-slate-50 transition border-transparent border h-min-9 rounded-lg ${props.className}`}
    >
      {props.children}
    </button>
  )
}
