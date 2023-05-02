import React, { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { ModalContext } from '../../contexts/modal'
import { api } from '../../helpers/request'
import { useCookie } from '../../hooks/useCookie'
import { selectUserProductsState } from '../../redux/product/productSelectors'
import {
  createProductFail,
  createProductStart,
  createProductSuccess,
} from '../../redux/product/productSlice'
import { Button } from '../Button'
import { Form } from '../Form'
import { UI } from '../Ui'

interface createProductFormSchema {
  name: string
  price: number
  description: string
}

export const CreateProductForm = () => {
  const createProductFormMethods = useForm<createProductFormSchema>()
  const { isLoading, error } = useSelector(selectUserProductsState)
  const { handleSubmit } = createProductFormMethods
  const dispatch = useDispatch()
  const { token } = useCookie()
  const { setTrigger } = useContext(ModalContext)

  const handleCreateProduct = async (payload: createProductFormSchema) => {
    dispatch(createProductStart())
    const createProductDto = {
      name: payload.name,
      price: Number(payload.price),
      description: payload.description,
    }

    try {
      const { data } = await api.product.create(createProductDto, token)
      dispatch(createProductSuccess(data))
      setTrigger('CreatedProduct')
    } catch (error) {
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
            <Form.Input name="name" errormessage="Preencha este campo" />
            <Form.Error field="name" />
          </Form.Field>

          <Form.Field className="relative">
            <Form.Label htmlFor="price" className="self-start">
              Preço
            </Form.Label>
            <Form.Input
              name="price"
              type="number"
              errormessage="Preencha o preço"
              prefix="currency"
            />
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
