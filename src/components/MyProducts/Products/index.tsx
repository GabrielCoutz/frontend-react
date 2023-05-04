import { useSelector } from 'react-redux'
import Link from 'next/link'
import React, { useState } from 'react'

import { selectUserProducts } from '../../../redux/product/productSelectors'
import { EditProduct } from '../../EditProduct'
import { Accordion } from '../../Accordion'
import { Product } from '../../Product'
import { Button } from '../../Button'
import { CreateProductForm } from '../../CreateProductForm'

export const Products = () => {
  const [accordionIsOpen, setAccordionIsOpen] = useState(false)
  const products = useSelector(selectUserProducts)

  return (
    <>
      <Accordion.Wrapper>
        <Accordion.Header></Accordion.Header>
        <Accordion.Toggle
          onClick={() => setAccordionIsOpen(!accordionIsOpen)}
          className="flex justify-center"
        >
          {accordionIsOpen ? (
            <Button.Secondary>Cancelar</Button.Secondary>
          ) : (
            <Button.Primary>Anunciar produto</Button.Primary>
          )}
        </Accordion.Toggle>

        <Accordion.Content>
          <CreateProductForm />
        </Accordion.Content>
      </Accordion.Wrapper>
      <Product.List
        className="col-span-full border-t-2 border-slate-100 pt-4"
        data-testid="myproducts-products"
      >
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
              <Link href={`/product/${product.id}`}>
                <Button.Terciary>Ver produto</Button.Terciary>
              </Link>

              <Accordion.Content className="col-span-full">
                <EditProduct.EditForm product={product} />
              </Accordion.Content>
            </Accordion.Wrapper>
          </Product.Card>
        ))}
      </Product.List>
    </>
  )
}
