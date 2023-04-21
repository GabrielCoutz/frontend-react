import React, { useState } from 'react'
import { parseCookies } from 'nookies'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { api } from '../../helpers/request'
import { UpdateUserPayload } from '../../helpers/request/user'
import { IUser } from '../../interfaces/User'
import { Button } from '../Button'
import { Form } from '../Form'
import { selectUserState } from '../../redux/user/userSelectors'
import { UI } from '../Ui'
import {
  updateUserSuccess,
  updateUserStart,
  updateUserFail,
} from '../../redux/user/userSlice'

interface UserFormSchema extends IUser {
  password: string
}

export const UserForm = () => {
  const [message, setMessage] = useState('')
  const { user, error, isLoading } = useSelector(selectUserState)
  const dispatch = useDispatch()

  const { token } = parseCookies(document.cookie as any)
  const userFormMethods = useForm<UserFormSchema>({ defaultValues: user })
  const { handleSubmit } = userFormMethods

  const handleUpdate = async (data: UserFormSchema) => {
    dispatch(updateUserStart())
    setMessage('')
    const updateUserDto: UpdateUserPayload = {
      email: data.email,
      name: data.name,
    }

    try {
      const { data } = await api.user.update(user?.id, updateUserDto, token)
      dispatch(updateUserSuccess(data))
      setMessage('Dados atualizados')
    } catch (error) {
      console.log(error)

      dispatch(
        updateUserFail(
          'Um erro inesperado ocorreu! Por favor, tente novamente mais tarde.',
        ),
      )
    }
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
              value: /^[a-zA-Z ]{5,}$/,
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

        <div className="flex justify-end col-span-full flex-col items-end">
          <UI.Erro className="mb-2 max-md:self-stretch">{error}</UI.Erro>

          <UI.Success className="mb-2 max-md:self-stretch">
            {message}
          </UI.Success>

          <Button.Primary
            className="max-md:w-full max-md:mt-2"
            disabled={isLoading}
          >
            {isLoading ? 'Carregando...' : 'Atualizar dados'}
          </Button.Primary>
        </div>
      </form>
    </FormProvider>
  )
}
