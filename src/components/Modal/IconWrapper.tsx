import React, { HtmlHTMLAttributes, PropsWithChildren } from 'react'

export const IconWrapper = (
  props: PropsWithChildren<HtmlHTMLAttributes<HTMLDivElement>>,
) => {
  return (
    <div
      {...props}
      className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10 ${props.className}`}
    >
      {props.children}
    </div>
  )
}
