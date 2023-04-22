import React, { HTMLAttributes, PropsWithChildren } from 'react'

export const Message = (
  props: PropsWithChildren<HTMLAttributes<HTMLParagraphElement>>,
) => {
  return (
    <p {...props} className={`text-sm text-gray-500 ${props.className}`}>
      {props.children}
    </p>
  )
}
