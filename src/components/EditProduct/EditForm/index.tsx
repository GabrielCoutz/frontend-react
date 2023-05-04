import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { IProduct } from '../../../interfaces/Product'
import { api } from '../../../helpers/request'
import { Delete } from '../Delete'
import { Button } from '../../Button'
import { Form } from '../../Form'
import { UI } from '../../Ui'
import { selectUserProductsState } from '../../../redux/product/productSelectors'
import {
  updateProductFail,
  updateProductStart,
  updateProductSuccess,
} from '../../../redux/product/productSlice'
import { useCookie } from '../../../hooks/useCookie'

const productFormSchema = z.object({
  name: z.string().nonempty('Preencha o nome'),
  price: z
    .string()
    .refine((price) => +price > 0, 'O preço precisa ser maior que 0')
    .transform((price) => +price),
  description: z.string().nonempty('Preencha a descrição'),
})
type IProductFormSchema = z.infer<typeof productFormSchema>

interface ContentProps {
  product: IProduct
}

export const EditForm = ({ product }: ContentProps) => {
  const [message, setMessage] = useState('')
  const { token } = useCookie()
  const { error, isLoading } = useSelector(selectUserProductsState)
  const dispatch = useDispatch()
  const productFormMethods = useForm<IProductFormSchema>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      description: product.description,
      name: product.name,
      price: product.price as unknown as number,
    },
  })
  const { handleSubmit } = productFormMethods

  const handleUpdate = async (payload: IProductFormSchema) => {
    setMessage('')
    dispatch(updateProductStart())

    try {
      const { data } = await api.product.update(product.id, payload, token)
      dispatch(updateProductSuccess(data))
      setMessage('Produto atualizado')
    } catch (error) {
      dispatch(
        updateProductFail(
          'Um erro inesperado ocorreu. Por favor, tente novamente mais tarde',
        ),
      )
    }
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
          <Delete product={product} />

          <Button.Primary loading={isLoading}>Atualizar dados</Button.Primary>
        </div>
      </form>
    </FormProvider>
  )
}
