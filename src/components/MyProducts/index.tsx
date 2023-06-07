'use client'

import React from 'react'

import { Products } from './Products'
import { Empty } from './Empty'
import { useProductStore } from '../../hooks/useProductStore'

export const MyProducts = () => {
  const { data: products } = useProductStore()
  const userHasProducts = products?.length

  return userHasProducts ? <Products /> : <Empty />
}
