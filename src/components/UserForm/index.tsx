'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'

import { useCookie } from '../../hooks/useCookie'
import { api } from '../../helpers/request'
import { Button } from '../Button'
import { Form } from '../Form'
import { UI } from '../Ui'
import {
  IUserFormSchema,
  userFormDefaultValues,
  userFormSchema,
} from './schema'
import { useAxios } from '../../hooks/useAxios'
import { useUserStore } from '../../hooks/useUserStore'

export const UserForm = () => {
  const {
    data: user,
    error,
    isLoading,
    updateUserFail,
    updateUserStart,
    updateUserSuccess,
  } = useUserStore()
  const { send, error: requestErro } = useAxios(api.user.update)
  const userFormMethods = useForm<IUserFormSchema>({
    resolver: zodResolver(userFormSchema),
    defaultValues: userFormDefaultValues,
  })
  const [message, setMessage] = useState('')
  const { handleSubmit, reset } = userFormMethods
  const { token } = useCookie()

  useEffect(
    () =>
      reset({
        ...user,
      }),
    [user],
  )

  const handleUpdate = async (payload: IUserFormSchema) => {
    updateUserStart()
    setMessage('')

    const result = await send({
      id: `${user?.id}`,
      payload,
      token,
    })
    if (!result) return updateUserFail(`${requestErro}`)

    const { data } = result

    updateUserSuccess(data)
    setMessage('Dados atualizados')
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
