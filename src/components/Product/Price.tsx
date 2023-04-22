import React, { HTMLAttributes, PropsWithChildren } from 'react'
import { toCurrency } from '../../helpers/toCurrency'

interface PriceProps
  extends PropsWithChildren<HTMLAttributes<HTMLSpanElement>> {
  children: string
}

const Price = (props: PriceProps) => {
  return (
    <span {...props} className={`text-gray-600 ${props.className}`}>
      {toCurrency(props.children)}
    </span>
  )
}

export default Price
