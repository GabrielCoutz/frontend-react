import React from 'react'
import { ButtonProps } from '.'

export const Secondary = (props: ButtonProps) => {
  return (
    <button
      {...props}
      className={`font-semibold bg-slate-50 hover:bg-slate-300 border-indigo-700 border-2 py-2 px-8 text-indigo-700 rounded transition ${props.className}`}
    >
      {props.children}
    </button>
  )
}
