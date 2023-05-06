import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { z } from 'zod'

import { selectUserState } from '../../redux/user/userSelectors'
import { useCookie } from '../../hooks/useCookie'
import { IUser } from '../../interfaces/User'
import { api } from '../../helpers/request'
import { Button } from '../Button'
import { Form } from '../Form'
import { UI } from '../Ui'
import {
  updateUserSuccess,
  updateUserStart,
  updateUserFail,
} from '../../redux/user/userSlice'

const userFormSchema = z.object({
  name: z.string().nonempty().min(6, 'O nome precisa ter no mínimo 4 letras'),
  email: z.string().email('Email inválido').nonempty(),
  password: z
    .string()
    .refine(
      (password) => (password.length ? password.length > 6 : true),
      'A senha precisa ter no mínimo 6 caracteres',
    ),
})
type IUserFormSchema = z.infer<typeof userFormSchema> & IUser

export const UserForm = () => {
  const [message, setMessage] = useState('')
  const { data: user, error, isLoading } = useSelector(selectUserState)
  const dispatch = useDispatch()

  const { token } = useCookie()
  const userFormMethods = useForm<IUserFormSchema>({
    resolver: zodResolver(userFormSchema),
    defaultValues: user as IUser,
  })
  const { handleSubmit } = userFormMethods

  const handleUpdate = async (payload: IUserFormSchema) => {
    if (!user?.id) return

    dispatch(updateUserStart())
    setMessage('')

    try {
      const { data } = await api.user.update(user.id, payload, token)
      dispatch(updateUserSuccess(data))
      setMessage('Dados atualizados')
    } catch (error) {
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
          <Form.Input name="name" />
          <Form.Error field="name" />
        </Form.Field>

        <Form.Field className="max-w-xs">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Input name="email" type="email" />
          <Form.Error field="email" />
        </Form.Field>

        <Form.Field className="max-w-xs">
          <Form.Label htmlFor="password">Senha</Form.Label>
          <Form.PasswordInput name="password" autoComplete="off" />
          <Form.Error field="password" />
        </Form.Field>

        <div className="flex justify-end col-span-full flex-col items-end">
          <div className="mb-2 max-md:self-stretch">
            <UI.Erro>{error}</UI.Erro>
          </div>

          <div className="mb-2 max-md:self-stretch">
            <UI.Success>{message}</UI.Success>
          </div>

          <div className="max-md:w-full max-md:mt-2">
            <Button.Primary
              data-testid="update-user-data"
              fullWidth
              loading={isLoading}
            >
              Atualizar dados
            </Button.Primary>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
