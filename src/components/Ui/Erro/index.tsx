import React, { HTMLAttributes } from 'react'

export const Erro = (props: HTMLAttributes<HTMLDivElement>) => {
  if (props.children)
    return (
      <div
        {...props}
        className={`text-sm font-medium text-red-500 max-md:text-center max-md:p-1 max-md:rounded-lg max-md:bg-red-100 ${props.className}`}
      >
        {props.children}
      </div>
    )
  return null
}
