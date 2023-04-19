import React, { PropsWithChildren } from 'react'

export const Field = ({ children }: PropsWithChildren) => {
  return <div className="flex flex-col">{children}</div>
}
