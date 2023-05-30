'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'

import { LoginUserPayload } from '../../helpers/request/auth/interface'
import { deleteAccountSchema, IDeleteAccountSchema } from './schema'
import { selectUserState } from '../../redux/user/userSelectors'
import { clearLocalData } from '../../helpers/clearLocalData'
import { useCookie } from '../../hooks/useCookie'
import { useAxios } from '../../hooks/useAxios'
import { api } from '../../helpers/request'
import { Button } from '../Button'
import { Form } from '../Form'
import { UI } from '../Ui'
import {
  deleteUserFail,
  deleteUserStart,
  deleteUserSuccess,
} from '../../redux/user/userSlice'

export const DeleteAccountForm = () => {
  const deleteAccountMethods = useForm<IDeleteAccountSchema>({
    resolver: zodResolver(deleteAccountSchema),
  })
  const { send: sendDelete, error: deleteError } = useAxios(api.user.delete)
  const { error, isLoading, data: user } = useSelector(selectUserState)
  const { send: sendLogin } = useAxios(api.auth.login)
  const { handleSubmit } = deleteAccountMethods
  const dispatch = useDispatch()
  const { token } = useCookie()
  const { back } = useRouter()
  const { push } = useRouter()

  const handleDelete = async (payload: IDeleteAccountSchema) => {
    dispatch(deleteUserStart())

    const loginPayloadDto = {
      email: user?.email,
      password: payload.password,
    } as LoginUserPayload
    const resultLogin = await sendLogin(loginPayloadDto)
    if (!resultLogin) return dispatch(deleteUserFail('Senha inválida'))

    await sendDelete({ id: `${user?.id}`, token })
    if (deleteError) return dispatch(deleteUserFail(deleteError))

    dispatch(deleteUserSuccess())
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
