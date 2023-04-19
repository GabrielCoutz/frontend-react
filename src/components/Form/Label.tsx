import React, { LabelHTMLAttributes } from 'react'

export const Label = (props: LabelHTMLAttributes<HTMLLabelElement>) => {
  return <label {...props} />
}
