import React from 'react'
import { IProduct } from '../../interfaces/Product'

const Title = ({ name: title }: Pick<IProduct, 'name'>) => {
  return <h1 className="text-gray-800 font-medium">{title}</h1>
}

export default Title
