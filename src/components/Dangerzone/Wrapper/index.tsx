import React, { HtmlHTMLAttributes, PropsWithChildren } from 'react'

export const Wrapper = (
  props: PropsWithChildren<HtmlHTMLAttributes<HTMLDivElement>>,
) => {
  return (
    <div
      {...props}
      className={`border border-red-500 p-4 rounded-lg ${props.className}`}
    >
      {props.children}
    </div>
  )
}
