import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

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

type ProductFormSchema = Pick<IProduct, 'description' | 'name' | 'price'>

interface ContentProps {
  product: IProduct
}

export const EditForm = ({ product }: ContentProps) => {
  const [message, setMessage] = useState('')
  const { token } = useCookie()
  const { error, isLoading } = useSelector(selectUserProductsState)
  const dispatch = useDispatch()
  const productFormMethods = useForm<ProductFormSchema>({
    defaultValues: product,
  })
  const { handleSubmit } = productFormMethods

  const handleUpdate = async (payload: ProductFormSchema) => {
    setMessage('')

    dispatch(updateProductStart())
    const updateProductDto = {
      name: payload.name,
      price: Number(payload.price),
      description: payload.description,
    }

    try {
      const { data } = await api.product.update(
        product.id,
        updateProductDto,
        token,
      )
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
          <Form.Input name="name" errormessage="Preencha o nome" />
          <Form.Error field="name" />
        </Form.Field>

        <Form.Field>
          <Form.Label htmlFor="price">Preço</Form.Label>
          <Form.Input
            name="price"
            type="number"
            errormessage="Preencha o preço"
            prefix="currency"
          />
          <Form.Error field="price" />
        </Form.Field>

        <Form.Field>
          <Form.Label htmlFor="description">Descrição</Form.Label>
          <Form.Textarea name="description" cols={5} rows={3} />
        </Form.Field>

        <div className="col-span-full text-center">
          <UI.Erro>{error}</UI.Erro>
          <UI.Success>{message}</UI.Success>
        </div>

        <div className="col-span-full flex justify-between">
          <Delete product={product} />

          <Button.Primary loading={isLoading}>Atualizar dados</Button.Primary>
        </div>
      </form>
    </FormProvider>
  )
}
