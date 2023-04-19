import Link from 'next/link'
import React from 'react'
import { Product } from '.'
import { IProductList } from '../../interfaces/Product'

const List = ({ products }: { products: IProductList }) => {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 container mx-auto px-4 gap-4 m-4">
      {products.map((product) => (
        <Product.Card key={product.id}>
          <Link href={`repo/${product.id}`} className="py-4 px-8 h-full block">
            <Product.Owner name={product.user.name} />
            <Product.Title name={product.name} />
            <Product.Price price={product.price} />
          </Link>
        </Product.Card>
      ))}
    </ul>
  )
}

export default List
