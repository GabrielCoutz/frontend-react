import React, { HTMLAttributes } from 'react'

interface FieldProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const Field = (item: FieldProps) => {
  return (
    <div {...item} className={`flex flex-col gap-2 ${item?.className}`}>
      {item.children}
    </div>
  )
}
