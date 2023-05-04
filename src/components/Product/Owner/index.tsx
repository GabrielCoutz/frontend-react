import React, { HtmlHTMLAttributes, PropsWithChildren } from 'react'

const Owner = (
  props: PropsWithChildren<HtmlHTMLAttributes<HTMLSpanElement>>,
) => {
  return (
    <span
      {...props}
      className={`italic block text-gray-400 text-sm mb-2 ${props.className}`}
    >
      @{props.children}
    </span>
  )
}

export default Owner
