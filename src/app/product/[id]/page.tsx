import Image from 'next/image'
import React from 'react'
import { Button } from '../../../components/Button'
import { api } from '../../../helpers/request'
import { Page } from '../../../components/Page'
import { IProduct } from '../../../interfaces/Product'
import { fakeInfo } from '../../../__mocks__/productInfo.mock'

interface IProductPageParams {
  params: {
    id: string
  }
}

export type IProductWithFakeInfo = IProduct & typeof fakeInfo

const ProductPage = async ({ params }: IProductPageParams) => {
  const { data } = await api.product.get({ id: params.id })
  const product = {
    ...data,
    ...fakeInfo,
  } as IProductWithFakeInfo

  return (
    <section className="mx-auto my-8 container flex-wrap gap-12 justify-center max-w-7xl px-4 mt-8 max-md:flex-col">
      <div className="space-y-4 flex flex-wrap justify-center gap-4 border-b-4 pb-4 border-slate-100">
        <div>
          <Image
            src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
            alt={product.name}
            height={300}
            width={300}
            className="object-cover bg-green-200 rounded-lg"
          />
        </div>

        <div>
          <Page.Title>{product.name}</Page.Title>
          <Page.Price>{product.price}</Page.Price>
          <Page.Box>
            <Page.Subtitle>Descrição</Page.Subtitle>
            <Page.Text>
              Apresentamos a nova coleção de camisas femininas, perfeitas para
              mulheres modernas que valorizam o conforto e o estilo. Com um
              corte elegante e tecido de alta qualidade, esta camisa é ideal
              para ocasiões formais e informais. <br /> {product.description}
            </Page.Text>
          </Page.Box>
          <div className="md:w-fit">
            <Button.Primary fullWidth>Comprar</Button.Primary>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Page.Box>
          <Page.Subtitle>Características</Page.Subtitle>
          <Page.DotList list={product.characteristics} />
        </Page.Box>

        <Page.Box>
          <Page.Subtitle>Informações adicionais</Page.Subtitle>
          <Page.DotList list={product.aditionalInfo} />
        </Page.Box>

        <Page.AnnouncedBy>{product.user.name}</Page.AnnouncedBy>
      </div>
    </section>
  )
}

export default ProductPage
