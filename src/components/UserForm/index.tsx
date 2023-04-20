import React from 'react'
import { parseCookies } from 'nookies'
import { FormProvider, useForm } from 'react-hook-form'

import { api } from '../../helpers/request'
import { ApiErrorResponse } from '../../helpers/request/error'
import { UpdateUserPayload } from '../../helpers/request/user'
import { IUser } from '../../interfaces/User'
import { Button } from '../Button'
import { Form } from '../Form'

const defaultValues = {
  name: 'xampson',
  email: 'xampson@gmail.com',
}

interface UserFormSchema extends IUser {
  password: string
}

export const UserForm = () => {
  const userFormMethods = useForm<UserFormSchema>({ defaultValues })
  const { id, token } = parseCookies(document.cookie as any)
  const { handleSubmit } = userFormMethods

  const handleUpdate = (data: UserFormSchema) => {
    const updateUserDto: UpdateUserPayload = {
      email: data.email,
      name: data.name,
    }

    api.user
      .update(id, updateUserDto, token)
      .then(({ data }) => console.log(data))
      .catch(({ response }: ApiErrorResponse) => console.log(response?.data))
  }

  return (
    <FormProvider {...userFormMethods}>
      <form
        onSubmit={handleSubmit(handleUpdate)}
        className="grid grid-cols-2 h-full gap-4"
      >
        <Form.Field className="max-w-xs">
          <Form.Label htmlFor="name">Nome</Form.Label>
          <Form.Input
            name="name"
            type="text"
            errormessage="O nome não pode ser vazio"
            validation={{
              value: /^[a-zA-Z]{5,}$/,
              message: 'O nome precisa ser maior que 5 letras',
            }}
          />
          <Form.Error field="name" />
        </Form.Field>

        <Form.Field className="max-w-xs">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Input
            name="email"
            type="email"
            errormessage="Preencha este campo"
            validation={{ value: /\S+@\S+\.\S+/, message: 'Email inválido' }}
          />
          <Form.Error field="email" />
        </Form.Field>

        <Form.Field className="max-w-xs">
          <Form.Label htmlFor="password">Senha</Form.Label>
          <Form.Input name="password" type="password" autoComplete="off" />
          <Form.Error field="password" />
        </Form.Field>

        <div className="flex justify-end col-span-full">
          <Button.Primary className="max-md:w-full max-md:mt-2">
            Atualizar dados
          </Button.Primary>
        </div>
      </form>
    </FormProvider>
  )
}
