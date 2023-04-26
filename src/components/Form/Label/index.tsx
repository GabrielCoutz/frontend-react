import React, { LabelHTMLAttributes } from 'react'

export const Label = (props: LabelHTMLAttributes<HTMLLabelElement>) => {
  return (
    <label
      data-testid="form-label"
      {...props}
      className={`block text-sm font-medium text-gray-700 ${props.className}`}
    />
  )
}
