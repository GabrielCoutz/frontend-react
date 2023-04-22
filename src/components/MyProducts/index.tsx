import React from 'react'
import { useSelector } from 'react-redux'

import { Button } from '../Button'
import { Product } from '../Product'
import { EditProduct } from '../EditProduct'
import { selectUserProducts } from '../../redux/product/productSelectors'

export const MyProducts = () => {
  const products = useSelector(selectUserProducts)

  return (
    <Product.List className="col-span-full">
      {products.map((product) => (
        <Product.Card key={product.id} className="grid grid-cols-2">
          <EditProduct.Wrapper>
            <EditProduct.Header>
              <div>
                <Product.Title>{product.name}</Product.Title>
                <Product.Price>{product.price}</Product.Price>
              </div>
            </EditProduct.Header>
            <EditProduct.Toggle
              as="div"
              className="col-start-2 self-start justify-self-end"
            >
              <Button.Terciary>Editar</Button.Terciary>
            </EditProduct.Toggle>

            <EditProduct.Content product={product} />
          </EditProduct.Wrapper>
        </Product.Card>
      ))}
    </Product.List>
  )
}
