import React, { LabelHTMLAttributes } from 'react'

export const Label = (props: LabelHTMLAttributes<HTMLLabelElement>) => {
  return (
    <label
      {...props}
      className={`block text-sm font-medium text-gray-700 ${props.className}`}
    />
  )
}
