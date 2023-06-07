import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React, { useState } from 'react'

import { IProductFormSchema, productFormSchema } from './schema'
import { IProduct } from '../../../interfaces/Product'
import { useCookie } from '../../../hooks/useCookie'
import { useAxios } from '../../../hooks/useAxios'
import { api } from '../../../helpers/request'
import { Button } from '../../Button'
import { Form } from '../../Form'
import { UI } from '../../Ui'

import { useProductStore } from '../../../hooks/useProductStore'

interface ContentProps {
  product: IProduct
}

export const EditForm = ({ product }: ContentProps) => {
  const { send, error: requestErro } = useAxios(api.product.update)
  const productFormMethods = useForm<IProductFormSchema>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      description: product.description,
      name: product.name,
      price: product.price as unknown as number,
    },
  })
  const { handleSubmit } = productFormMethods
  const [message, setMessage] = useState('')
  const {
    updateProductFail,
    updateProductStart,
    updateProductSuccess,
    error,
    isLoading,
  } = useProductStore()
  const { token } = useCookie()

  const handleUpdate = async (payload: IProductFormSchema) => {
    setMessage('')
    updateProductStart()

    const result = await send({ payload, id: product.id, token })
    if (!result) return updateProductFail(`${requestErro}`)

    const { data } = result
    updateProductSuccess(data)
    setMessage('Produto atualizado')
  }

  return (
    <FormProvider {...productFormMethods}>
      <form
        onSubmit={handleSubmit(handleUpdate)}
        className="grid grid-cols-2 gap-4 max-sm:grid-cols-1"
      >
        <Form.Field>
          <Form.Label htmlFor="name">Nome</Form.Label>
          <Form.Input name="name" />
          <Form.Error field="name" />
        </Form.Field>

        <Form.Field>
          <Form.Label htmlFor="price">Preço</Form.Label>
          <Form.Input name="price" type="number" prefix="currency" />
          <Form.Error field="price" />
        </Form.Field>

        <Form.Field>
          <Form.Label htmlFor="description">Descrição</Form.Label>
          <Form.Textarea name="description" cols={5} rows={3} />
          <Form.Error field="description" />
        </Form.Field>

        <div className="col-span-full text-center">
          <UI.Erro>{error}</UI.Erro>
          <UI.Success>{message}</UI.Success>
        </div>

        <div className="col-span-full flex justify-between max-md:flex-col max-md:gap-4">
          <Link href={`/profile/product/delete/${product.id}`}>
            <Button.Terciary data-testid="delete-product-button">
              Deletar
            </Button.Terciary>
          </Link>

          <Button.Primary loading={isLoading} data-testid="update-product-data">
            Atualizar dados
          </Button.Primary>
        </div>
      </form>
    </FormProvider>
  )
}
