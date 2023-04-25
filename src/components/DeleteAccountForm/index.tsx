import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import React, { useContext, useState } from 'react'
import { destroyCookie } from 'nookies'

import { selectUserState } from '../../redux/user/userSelectors'
import { Button } from '../Button'
import { Form } from '../Form'
import { Modal } from '../Modal'
import { UI } from '../Ui'
import { api } from '../../helpers/request'
import {
  deleteUserFail,
  deleteUserStart,
  deleteUserSuccess,
} from '../../redux/user/userSlice'
import { ApiErrorResponse } from '../../helpers/request/error'
import { useRouter } from 'next/router'
import { useCookie } from '../../hooks/useCookie'
import { ModalContext } from '../../contexts/modal'

interface DeleteAccountSchema {
  password: string
}

export const DeleteAccountForm = () => {
  const [deleteIntention, setDeleteIntention] = useState(false)
  const deleteAccountMethods = useForm<DeleteAccountSchema>()
  const { token } = useCookie()
  const { setTrigger } = useContext(ModalContext)
  const { handleSubmit } = deleteAccountMethods
  const { error, isLoading, data: user } = useSelector(selectUserState)
  const dispatch = useDispatch()
  const { push } = useRouter()

  const handleDelete = async (payload: DeleteAccountSchema) => {
    if (!user?.id) return

    dispatch(deleteUserStart())
    const loginPayloadDto = {
      email: user.email,
      password: payload.password,
    }

    try {
      const { data } = await api.auth.login(loginPayloadDto)

      const passwordIsValid = data.id
      if (!passwordIsValid) throw new Error()

      await api.user.delete(user.id, token)
      dispatch(deleteUserSuccess())

      destroyCookie(undefined, 'token')
      destroyCookie(undefined, 'id')
      setTrigger('DeletedAccount')
      push('signin')
    } catch (error: any) {
      const { response }: ApiErrorResponse = error
      if (response?.data.statusCode === 401)
        return dispatch(deleteUserFail('Senha inválida'))

      console.log(error)
      dispatch(
        deleteUserFail(
          'Não foi possível realizar esta ação. Tente novamente mais tarde',
        ),
      )
    }
  }

  return (
    <>
      <Button.Primary
        className="bg-red-500 hover:bg-red-700 whitespace-nowrap"
        onClick={() => setDeleteIntention(true)}
      >
        Deletar conta
      </Button.Primary>

      <Modal.Trigger trigger={deleteIntention}>
        <Modal.Body onClose={() => setDeleteIntention(false)}>
          <Modal.IconWrapper className="bg-red-100">
            <ExclamationTriangleIcon className="w-6 h-6 text-red-500" />
          </Modal.IconWrapper>
          <Modal.Title>Deletar conta</Modal.Title>
          <Modal.Message>
            Antes de deletar sua conta, é necessário validar sua identidade.
            <br />
            Por favor, insira sua senha.
          </Modal.Message>
          <Modal.Actions>
            <FormProvider {...deleteAccountMethods}>
              <form
                onSubmit={handleSubmit(handleDelete)}
                className="flex flex-col gap-6"
              >
                <Form.Field className="flex self-center max-md:self-stretch">
                  <Form.Label className="self-start">Senha</Form.Label>
                  <Form.PasswordInput
                    name="password"
                    errormessage="Por favor, insira sua senha"
                    autoComplete="off"
                  />
                  <Form.Error field="password" />
                </Form.Field>
                <UI.Erro>{error}</UI.Erro>
                <div className="flex gap-2 max-md:flex-col mt-2">
                  <Button.Primary
                    onClick={() => setDeleteIntention(false)}
                    disabled={isLoading}
                    className="w-full"
                  >
                    Cancelar
                  </Button.Primary>
                  <Button.Secondary
                    disabled={isLoading}
                    className="hover:text-white border-red-500 text-red-500 whitespace-nowrap w-full hover:!bg-red-500"
                  >
                    {isLoading ? 'Aguarde...' : 'Deletar conta'}
                  </Button.Secondary>
                </div>
              </form>
            </FormProvider>
          </Modal.Actions>
        </Modal.Body>
      </Modal.Trigger>
    </>
  )
}
