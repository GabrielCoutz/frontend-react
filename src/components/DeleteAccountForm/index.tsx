'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'

import { LoginUserPayload } from '../../helpers/request/auth/interface'
import { deleteAccountSchema, IDeleteAccountSchema } from './schema'
import { clearLocalData } from '../../helpers/clearLocalData'
import { useUserStore } from '../../hooks/useUserStore'
import { useCookie } from '../../hooks/useCookie'
import { useAxios } from '../../hooks/useAxios'
import { api } from '../../helpers/request'
import { Button } from '../Button'
import { Form } from '../Form'
import { UI } from '../Ui'

export const DeleteAccountForm = () => {
  const deleteAccountMethods = useForm<IDeleteAccountSchema>({
    resolver: zodResolver(deleteAccountSchema),
  })
  const {
    data: user,
    error,
    isLoading,
    deleteUserFail,
    deleteUserStart,
    deleteUserSuccess,
  } = useUserStore()
  const { send: sendDelete, error: deleteError } = useAxios(api.user.delete)
  const { send: sendLogin } = useAxios(api.auth.login)
  const { handleSubmit } = deleteAccountMethods
  const { token } = useCookie()
  const { back } = useRouter()
  const { push } = useRouter()

  const handleDelete = async (payload: IDeleteAccountSchema) => {
    deleteUserStart()

    const loginPayloadDto = {
      email: user?.email,
      password: payload.password,
    } as LoginUserPayload
    const resultLogin = await sendLogin(loginPayloadDto)
    if (!resultLogin) return deleteUserFail('Senha inválida')

    await sendDelete({ id: `${user?.id}`, token })
    if (deleteError) return deleteUserFail(deleteError)

    deleteUserSuccess()
    clearLocalData(['token', 'userId'])
    push('/profile/account/deleted')
  }

  return (
    <FormProvider {...deleteAccountMethods}>
      <form
        onSubmit={handleSubmit(handleDelete)}
        className="flex flex-col gap-6"
      >
        <Form.Field className="flex self-center max-md:self-stretch">
          <Form.Label className="self-start">Senha</Form.Label>
          <Form.PasswordInput name="password" autoComplete="off" />
          <Form.Error field="password" />
        </Form.Field>
        <UI.Erro>{error}</UI.Erro>
        <div className="flex gap-2 max-md:flex-col mt-2">
          <Button.Primary
            data-testid="deleteaccountform-cancel"
            onClick={back}
            disabled={isLoading}
            fullWidth
            type="button"
          >
            Cancelar
          </Button.Primary>
          <Button.Danger
            data-testid="deleteaccountform-confirm"
            disabled={isLoading}
            loading={isLoading}
            fullWidth
          >
            Deletar conta
          </Button.Danger>
        </div>
      </form>
    </FormProvider>
  )
}
