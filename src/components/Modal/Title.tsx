import React, { HTMLAttributes, PropsWithChildren } from 'react'

export const Title = (
  props: PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>,
) => {
  return (
    <h3
      {...props}
      className={`text-base font-semibold leading-6 text-slate-900 mb-2 ${props.className}`}
    >
      {props.children}
    </h3>
  )
}
