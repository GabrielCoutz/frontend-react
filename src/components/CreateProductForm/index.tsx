import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'

import { createProductFormSchema, ICreatedProductFormSchema } from './schema'
import { selectUserProductsState } from '../../redux/product/productSelectors'
import { useCookie } from '../../hooks/useCookie'
import { useModal } from '../../hooks/useModal'
import { useAxios } from '../../hooks/useAxios'
import { api } from '../../helpers/request'
import { Button } from '../Button'
import { Form } from '../Form'
import { UI } from '../Ui'
import {
  createProductFail,
  createProductStart,
  createProductSuccess,
} from '../../redux/product/productSlice'

export const CreateProductForm = () => {
  const createProductFormMethods = useForm<ICreatedProductFormSchema>({
    resolver: zodResolver(createProductFormSchema),
  })
  const { isLoading, error } = useSelector(selectUserProductsState)
  const { handleSubmit, reset } = createProductFormMethods
  const { Modal, showModal } = useModal()
  const { send, error: requestErro } = useAxios(api.product.create)
  const dispatch = useDispatch()
  const { token } = useCookie()

  const handleCreateProduct = async (payload: ICreatedProductFormSchema) => {
    dispatch(createProductStart())
    const result = await send({ payload, token })

    if (!result) return dispatch(createProductFail(`${requestErro}`))

    const { data } = result
    dispatch(createProductSuccess(data))
    showModal('createdProduct')
  }

  return (
    <>
      {Modal ? <Modal callback={reset} /> : null}

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
            <Button.Primary fullWidth loading={isLoading}>
              Anunciar
            </Button.Primary>
          </div>
        </form>
      </FormProvider>
    </>
  )
}
