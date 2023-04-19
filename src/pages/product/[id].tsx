import { useRouter } from 'next/router'
import React from 'react'

const Product = () => {
  const { query } = useRouter()
  return <div>product: {query.id}</div>
}

export default Product
