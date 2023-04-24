import React, { HtmlHTMLAttributes, PropsWithChildren } from 'react'

export const Description = (
  props: PropsWithChildren<HtmlHTMLAttributes<HTMLDivElement>>,
) => {
  return <div {...props}>{props.children}</div>
}
