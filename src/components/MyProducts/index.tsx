import React from 'react'
import { useSelector } from 'react-redux'

import { selectUserProducts } from '../../redux/product/productSelectors'
import { Products } from './Products'
import { Empty } from './Empty'
import { ProductsEventListener } from './ProductsEventListener'

export const MyProducts = () => {
  const products = useSelector(selectUserProducts)
  const userHasProducts = products?.length

  return (
    <>
      <ProductsEventListener />
      {userHasProducts ? <Products /> : <Empty />}
    </>
  )
}
