import React, { HtmlHTMLAttributes, PropsWithChildren } from 'react'

export const Action = (
  props: PropsWithChildren<HtmlHTMLAttributes<HTMLDivElement>>,
) => {
  return <div {...props}>{props.children}</div>
}
