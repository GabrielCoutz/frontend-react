import { CakeIcon } from '@heroicons/react/24/outline'
import { parseCookies } from 'nookies'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { api } from '../../helpers/request'
import { IProduct } from '../../interfaces/Product'
import { selectUserProductsState } from '../../redux/product/productSelectors'
import {
  createProductFail,
  createProductStart,
  createProductSuccess,
} from '../../redux/product/productSlice'
import { Button } from '../Button'
import { Form } from '../Form'
import { Modal } from '../Modal'
import { UI } from '../Ui'

interface createProductFormSchema {
  name: string
  price: number
  description: string
}

export const CreateProduct = () => {
  const createProductFormMethods = useForm<createProductFormSchema>()
  const { isLoading, error } = useSelector(selectUserProductsState)
  const { token } = parseCookies(document.cookie as any)
  const { handleSubmit } = createProductFormMethods
  const dispatch = useDispatch()
  const [productCreated, setProductCreated] = useState<IProduct>()

  const handleCreateProduct = async (payload: createProductFormSchema) => {
    dispatch(createProductStart())
    const createProductDto = {
      name: payload.name,
      price: Number(payload.price),
      description: payload.description,
    }

    try {
      const { data } = await api.product.create(createProductDto, token)
      setProductCreated(data)
    } catch (error) {
      console.log(error)
      dispatch(
        createProductFail(
          'Não foi possível realizar esta ação. Por favor, tente novamente mais tarde',
        ),
      )
    }
  }

  return (
    <>
      <FormProvider {...createProductFormMethods}>
        <form
          onSubmit={handleSubmit(handleCreateProduct)}
          className="grid grid-cols-2 gap-4 max-md:grid-cols-1 my-6"
        >
          <Form.Field>
            <Form.Label htmlFor="name" className="self-start">
              Nome
            </Form.Label>
            <Form.Input
              name="name"
              type="text"
              errormessage="Preencha este campo"
            />
            <Form.Error field="name" />
          </Form.Field>

          <Form.Field className="relative">
            <Form.Label htmlFor="price" className="self-start">
              Preço
            </Form.Label>
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

          <Form.Field className="col-span-full">
            <Form.Label htmlFor="description" className="self-start">
              Descrição
            </Form.Label>
            <Form.Textarea
              name="description"
              errormessage="Preencha este campo"
              className=""
            ></Form.Textarea>
            <Form.Error field="description" />
          </Form.Field>

          <UI.Erro className="col-span-full my-2">{error}</UI.Erro>

          <Button.Primary disabled={isLoading} className="md:col-start-2">
            {isLoading ? 'Aguarde...' : 'Anunciar'}
          </Button.Primary>
        </form>
      </FormProvider>

      <Modal.Trigger trigger={!!productCreated}>
        <Modal.Body
          onClose={() =>
            dispatch(createProductSuccess(productCreated as IProduct))
          }
        >
          <Modal.IconWrapper className="bg-green-200">
            <CakeIcon className="w-6 h-6 text-green-500" />
          </Modal.IconWrapper>
          <Modal.Title>É isso aí</Modal.Title>
          <Modal.Message>Produto criado com sucesso</Modal.Message>
          <Modal.Actions>
            <Button.Primary
              onClick={() =>
                dispatch(createProductSuccess(productCreated as IProduct))
              }
            >
              Ver meus produtos
            </Button.Primary>
          </Modal.Actions>
        </Modal.Body>
      </Modal.Trigger>
    </>
  )
}
