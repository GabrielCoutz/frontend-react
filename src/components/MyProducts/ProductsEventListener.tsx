import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { selectUserProducts } from '../../redux/product/productSelectors'
import { ProductCreatedModal } from './ProductCreatedModal'
import { ProductDeletedModal } from './ProductDeletedModal'

type ModalTrigger = 'ProductCreated' | 'ProductDeleted' | ''

export const ProductsEventListener = () => {
  const products = useSelector(selectUserProducts)
  const [trigger, setTrigger] = useState<ModalTrigger>('')
  let oldProductsLength = 0

  useEffect(() => {
    if (!products || !products?.length) return
    oldProductsLength = products.length
  }, [])

  useEffect(() => {
    if (!products) return
    const newProductsLength = products.length

    if (newProductsLength > oldProductsLength) setTrigger('ProductCreated')
    else setTrigger('ProductDeleted')
  }, [products?.length])

  return (
    <>
      {trigger === 'ProductCreated' && <ProductCreatedModal />}
      {trigger === 'ProductDeleted' && <ProductDeletedModal />}
    </>
  )
}
