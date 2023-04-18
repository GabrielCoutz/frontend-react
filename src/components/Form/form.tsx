import Link from 'next/link'
import React from 'react'
import {useQuery} from 'react-query'
import { request } from '../../helpers/request'
import { toCurrency } from '../../helpers/toCurrency'

interface ProductSchema {
  id: string,
  name: string
  price: string
  created_at: string
  description: string
  user: UserSchema
}

interface UserSchema {
  id: string,
  name: string
}

export default function Form() {
  const {data, isLoading} = useQuery<ProductSchema[]>('products', async () => await request('http://localhost:3000/products'))

  return  (
    <>
    {isLoading && <span className='text-4xl text-center block my-4 text-blue-600 '>Carregando...</span> }

    {data && 
    <ul className='grid grid-cols-2 md:grid-cols-4 container mx-auto px-4 gap-4 m-4'>
      {data.map(product => 
        <li className='rounded border border-gray-200 shadow-sm hover:shadow-md transition-all' key={product.id}>
        <Link href={`repo/${product.id}`} className='py-4 px-8 h-full block'>
          <span className='italic text-gray-400 text-sm mb-2'>@{product.user.name}</span>
          <h1 className='text-gray-800 font-medium'>{product.name}</h1>
          <span className='text-gray-600'>{toCurrency(product.price)}</span>
        </Link>
      </li>
      )}
    </ul>
    }
    
    </>
  )
}
