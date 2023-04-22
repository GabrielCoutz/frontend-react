import React from 'react'
import { Disclosure, Transition } from '@headlessui/react'
import { FormProvider, useForm } from 'react-hook-form'

import { IProduct } from '../../interfaces/Product'
import { Button } from '../Button'
import { Form } from '../Form'

type ProductFormSchema = Pick<IProduct, 'description' | 'name' | 'price'>

interface ContentProps {
  product: IProduct
}

export const Content = ({ product }: ContentProps) => {
  const productFormMethods = useForm<ProductFormSchema>({
    defaultValues: product,
  })
  const { handleSubmit } = productFormMethods

  const handleUpdate = (payload: any) => {
    console.log(payload)
  }

  return (
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

            <Form.Field>
              <Form.Label htmlFor="price">Preço</Form.Label>
              <Form.Input
                name="price"
                type="number"
                errormessage="Preencha o preço"
              />
              <Form.Error field="price" />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="description">Descrição</Form.Label>
              <Form.Textarea name="description" cols={5} rows={3} />
            </Form.Field>

            <Button.Primary className="col-span-full">Atualizar</Button.Primary>
          </form>
        </FormProvider>
      </Disclosure.Panel>
    </Transition>
  )
}
