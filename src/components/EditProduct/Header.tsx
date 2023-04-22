import React, { HtmlHTMLAttributes, PropsWithChildren } from 'react'

export const Header = (
  props: PropsWithChildren<HtmlHTMLAttributes<HTMLDivElement>>,
) => {
  return <div {...props}>{props.children}</div>
}
