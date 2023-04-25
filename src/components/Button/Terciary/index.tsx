import React from 'react'
import { ButtonProps } from '..'

export const Terciary = (props: ButtonProps) => {
  return (
    <button
      {...props}
      className={`font-semibold text-indigo-600 transition hover:text-indigo-950 border-transparent border h-min-9 rounded-lg ${props.className}`}
    >
      {props.children}
    </button>
  )
}
