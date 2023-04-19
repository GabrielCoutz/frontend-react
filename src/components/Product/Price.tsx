import React from 'react'
import { toCurrency } from '../../helpers/toCurrency'
import { IProduct } from '../../interfaces/Product'

const Price = ({ price }: Pick<IProduct, 'price'>) => {
  return <span className="text-gray-600">{toCurrency(price)}</span>
}

export default Price
