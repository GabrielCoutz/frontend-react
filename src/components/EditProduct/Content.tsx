import React, { useState } from 'react'
import { Disclosure, Transition } from '@headlessui/react'
import { FormProvider, useForm } from 'react-hook-form'
import { parseCookies } from 'nookies'
import { useDispatch, useSelector } from 'react-redux'

import { IProduct } from '../../interfaces/Product'
import { api } from '../../helpers/request'
import { Button } from '../Button'
import { EditProduct } from '.'
import { Form } from '../Form'
import { UI } from '../Ui'
import { selectUserProductsState } from '../../redux/product/productSelectors'
import {
  updateProductFail,
  updateProductStart,
  updateProductSuccess,
} from '../../redux/product/productSlice'

type ProductFormSchema = Pick<IProduct, 'description' | 'name' | 'price'>

interface ContentProps {
  product: IProduct
}

export const Content = ({ product }: ContentProps) => {
  const [message, setMessage] = useState('')
  const { token } = parseCookies(document.cookie as any)
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
    <>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        as="div"
        className="col-span-full"
      >
        <Disclosure.Panel>
          <FormProvider {...productFormMethods}>
            <form
              onSubmit={handleSubmit(handleUpdate)}
              className="grid grid-cols-2 gap-4 max-sm:grid-cols-1"
            >
              <Form.Field>
                <Form.Label htmlFor="name">Nome</Form.Label>
                <Form.Input
                  name="name"
                  type="text"
                  errormessage="Preencha o nome"
                />
                <Form.Error field="name" />
              </Form.Field>

              <Form.Field className="relative">
                <Form.Label htmlFor="price">Preço</Form.Label>
                <div className="flex items-center">
                  <span className="me-2 hover:cursor-default">R$</span>
                  <Form.Input
                    name="price"
                    type="number"
                    errormessage="Preencha o preço"
                    className="flex-1"
                  />
                </div>
                <Form.Error field="price" />
              </Form.Field>

              <Form.Field>
                <Form.Label htmlFor="description">Descrição</Form.Label>
                <Form.Textarea name="description" cols={5} rows={3} />
              </Form.Field>

              <UI.Erro className="col-span-full text-center">{error}</UI.Erro>
              <UI.Success className="col-span-full text-center">
                {message}
              </UI.Success>

              <div className="col-span-full flex justify-between">
                <EditProduct.Delete product={product} />

                <Button.Primary disabled={isLoading}>
                  {isLoading ? 'Carregando...' : 'Atualizar dados'}
                </Button.Primary>
              </div>
            </form>
          </FormProvider>
        </Disclosure.Panel>
      </Transition>
    </>
  )
}
