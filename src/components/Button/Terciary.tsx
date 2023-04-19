import React from 'react'
import { ButtonProps } from '.'

export const Terciary = (props: ButtonProps) => {
  return (
    <button
      className="font-semibold py-2 px-8 text-indigo-700 rounded mt-4 transition underline-offset-2 underline hover:bg-slate-200 border-transparent border"
      {...props}
    >
      {props.children}
    </button>
  )
}
