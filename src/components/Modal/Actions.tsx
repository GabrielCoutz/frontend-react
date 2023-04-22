import React, { HTMLAttributes, PropsWithChildren } from 'react'

export const Actions = (
  props: PropsWithChildren<HTMLAttributes<HTMLDivElement>>,
) => {
  return <div {...props}>{props.children}</div>
}
