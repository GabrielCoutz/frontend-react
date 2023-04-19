import React, { PropsWithChildren } from 'react'

export const Field = ({ children }: PropsWithChildren) => {
  return <div className="flex flex-col gap-2">{children}</div>
}
