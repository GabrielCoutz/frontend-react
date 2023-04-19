import React from 'react'
import { ButtonProps } from '.'

export const Primary = (props: ButtonProps) => {
  return (
    <button
      className="font-semibold bg-indigo-600 hover:bg-indigo-700 py-2 px-8 text-slate-50 rounded mt-4 transition border-transparent border"
      {...props}
    >
      {props.children}
    </button>
  )
}
