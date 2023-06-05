import React from 'react'
import { toCurrency } from '../../../helpers/toCurrency'

interface PriceProps {
  children: string
}

export const Price = ({ children }: PriceProps) => {
  return (
    <div data-testid="productpage-price" className="font-normal text-slate-600">
      {toCurrency(children)}
    </div>
  )
}
