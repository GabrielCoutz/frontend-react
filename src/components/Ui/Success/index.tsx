import React, { HTMLAttributes } from 'react'

export const Success = (props: HTMLAttributes<HTMLDivElement>) => {
  if (props.children)
    return (
      <div
        {...props}
        className={`text-sm font-medium text-green-600 max-md:text-center max-md:p-1 max-md:rounded-lg max-md:bg-green-100 ${props.className}`}
      >
        {props.children}
      </div>
    )
  return null
}
