import { GetServerSideProps } from 'next'
import Image from 'next/image'
import React from 'react'

import { api } from '../../helpers/request'
import { Button } from '../../components/Button'
import { IProduct } from '../../interfaces/Product'
import { fakeInfo } from '../../__mocks__/productInfo.mock'
import { ProductPage } from '../../components/ProductPage'

export type IProductWithFakeInfo = IProduct & typeof fakeInfo

const index = ({ product }: { product: IProductWithFakeInfo }) => {
  if (!product) return <ProductPage.Empty />
  return (
    <section className="mx-auto my-8 container flex-wrap gap-12 justify-center max-w-7xl px-4 mt-8 max-md:flex-col">
      <div className="space-y-4 flex flex-wrap justify-center gap-4 border-b-4 pb-4 border-slate-100">
        <div>
          <Image
            src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
            alt={`Imagem produto ${product.name}`}
            height={300}
            width={300}
            className="object-cover bg-green-200 rounded-lg"
          />
        </div>

        <div>
          <ProductPage.Title>{product.name}</ProductPage.Title>
          <ProductPage.Price>{product.price}</ProductPage.Price>
          <ProductPage.Box>
            <ProductPage.Subtitle>Descrição</ProductPage.Subtitle>
            <ProductPage.Text>
              Apresentamos a nova coleção de camisas femininas, perfeitas para
              mulheres modernas que valorizam o conforto e o estilo. Com um
              corte elegante e tecido de alta qualidade, esta camisa é ideal
              para ocasiões formais e informais. <br /> {product.description}
            </ProductPage.Text>
          </ProductPage.Box>
          <div className="md:w-fit">
            <Button.Primary fullWidth>Comprar</Button.Primary>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <ProductPage.Box>
          <ProductPage.Subtitle>Características</ProductPage.Subtitle>
          <ProductPage.DotList list={product.characteristics} />
        </ProductPage.Box>

        <ProductPage.Box>
          <ProductPage.Subtitle>Informações adicionais</ProductPage.Subtitle>
          <ProductPage.DotList list={product.aditionalInfo} />
        </ProductPage.Box>

        <ProductPage.AnnouncedBy>{product.user.name}</ProductPage.AnnouncedBy>
      </div>
    </section>
  )
}

export default index

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const productId = params?.['id'] as string
  let product = null

  try {
    const { data } = await api.product.get({ id: productId })
    product = {
      ...data,
      ...fakeInfo,
    }
  } catch {}

  return {
    props: {
      product,
    },
  }
}
