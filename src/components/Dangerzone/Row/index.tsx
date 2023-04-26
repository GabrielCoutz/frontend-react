import React, { HtmlHTMLAttributes, PropsWithChildren } from 'react'

export const Row = (
  props: PropsWithChildren<HtmlHTMLAttributes<HTMLDivElement>>,
) => {
  return (
    <div
      {...props}
      className={`flex max-sm:flex-wrap gap-4 justify-between items-end mt-4 ${props.className}`}
    >
      {props.children}
    </div>
  )
}
