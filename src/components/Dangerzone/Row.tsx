import React, { HtmlHTMLAttributes, PropsWithChildren } from 'react'

export const Row = (
  props: PropsWithChildren<HtmlHTMLAttributes<HTMLDivElement>>,
) => {
  return (
    <div
      {...props}
      className={`grid grid-cols-[1fr,300px] justify-between p-2 ${props.className}`}
    >
      {props.children}
    </div>
  )
}
