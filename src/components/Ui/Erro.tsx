import React, { HTMLAttributes } from 'react'

export const Erro = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={`text-sm font-medium text-red-500 ${props.className}`}
    >
      {props.children}
    </div>
  )
}
