'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'

import { createProductFormSchema, ICreatedProductFormSchema } from './schema'
import { useCookie } from '../../hooks/useCookie'
import { useAxios } from '../../hooks/useAxios'
import { api } from '../../helpers/request'
import { Button } from '../Button'
import { Form } from '../Form'
import { UI } from '../Ui'
import { useProductStore } from '../../hooks/useProductStore'

export const CreateProductForm = () => {
  const createProductFormMethods = useForm<ICreatedProductFormSchema>({
    resolver: zodResolver(createProductFormSchema),
  })
  const { handleSubmit, reset } = createProductFormMethods
  const { send, error: requestErro } = useAxios(api.product.create)
  const {
    createProductStart,
    createProductFail,
    createProductSuccess,
    isLoading,
    error,
  } = useProductStore()
  const { token } = useCookie()
  const { push } = useRouter()

  const handleCreateProduct = async (payload: ICreatedProductFormSchema) => {
    createProductStart()
    const result = await send({ payload, token })

    if (!result) return createProductFail(`${requestErro}`)

    const { data } = result
    createProductSuccess(data)
    push('/profile/product/created')
    reset()
  }

  return (
    <FormProvider {...createProductFormMethods}>
      <form
        onSubmit={handleSubmit(handleCreateProduct)}
        className="grid grid-cols-2 gap-4 max-md:grid-cols-1 my-6"
      >
        <Form.Field>
          <Form.Label htmlFor="name" className="self-start">
            Nome
          </Form.Label>
          <Form.Input name="name" />
          <Form.Error field="name" />
        </Form.Field>

        <Form.Field className="relative">
          <Form.Label htmlFor="price" className="self-start">
            Preço
          </Form.Label>
          <Form.Input name="price" type="number" prefix="currency" />
          <Form.Error field="price" />
        </Form.Field>

        <Form.Field className="col-span-full">
          <Form.Label htmlFor="description" className="self-start">
            Descrição
          </Form.Label>
          <Form.Textarea name="description"></Form.Textarea>
          <Form.Error field="description" />
        </Form.Field>

        <div className="col-span-full my-2">
          <UI.Erro>{error}</UI.Erro>
        </div>
        <div className="md:col-start-2 md:justify-self-end">
          <Button.Primary
            fullWidth
            loading={isLoading}
            data-testid="announce-product-button"
          >
            Anunciar
          </Button.Primary>
        </div>
      </form>
    </FormProvider>
  )
}
