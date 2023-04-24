import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserProducts } from '../../redux/product/productSelectors'
import { Accordion } from '../Accordion'
import { Button } from '../Button'
import { EditProduct } from '../EditProduct'
import { Product } from '../Product'

export const Products = () => {
  const products = useSelector(selectUserProducts)

  return (
    <Product.List className="col-span-full">
      {products?.map((product) => (
        <Product.Card key={product.id} className="grid grid-cols-2">
          <Accordion.Wrapper className="grid grid-cols-2 col-span-full gap-y-4">
            <Accordion.Header>
              <Product.Title>{product.name}</Product.Title>
              <Product.Price>{product.price}</Product.Price>
            </Accordion.Header>

            <Accordion.Toggle className="col-start-2 self-start justify-self-end">
              <Button.Terciary>Editar</Button.Terciary>
            </Accordion.Toggle>

            <Accordion.Content className="col-span-full">
              <EditProduct.EditForm product={product} />
            </Accordion.Content>
          </Accordion.Wrapper>
        </Product.Card>
      ))}
    </Product.List>
  )
}
