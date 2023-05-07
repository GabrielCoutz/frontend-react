import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'

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
import { clearLocalData } from '../../helpers/clearLocalData'
import { LoginUserPayload } from '../../helpers/request/auth'
import { useModal } from '../../hooks/useModal'
import { deleteAccountSchema, IDeleteAccountSchema } from './schema'

export const DeleteAccountForm = () => {
  const deleteAccountMethods = useForm<IDeleteAccountSchema>({
    resolver: zodResolver(deleteAccountSchema),
  })
  const { error, isLoading, data: user } = useSelector(selectUserState)
  const [deleteIntention, setDeleteIntention] = useState(false)
  const { showModal, Modal: DeletedAccountModal } = useModal()
  const { handleSubmit } = deleteAccountMethods
  const dispatch = useDispatch()
  const { token } = useCookie()
  const { push } = useRouter()

  const handleDelete = async (payload: IDeleteAccountSchema) => {
    dispatch(deleteUserStart())
    const loginPayloadDto = {
      email: user?.email,
      password: payload.password,
    } as LoginUserPayload

    try {
      await api.auth.login(loginPayloadDto)

      await api.user.delete(user?.id as string, token)
      setDeleteIntention(false)
      dispatch(deleteUserSuccess())
      clearLocalData()
      showModal('deletedAccount')
    } catch (error: any) {
      const { response }: ApiErrorResponse = error
      if (response?.data.statusCode === 401)
        return dispatch(deleteUserFail('Senha inválida'))

      dispatch(
        deleteUserFail(
          'Não foi possível realizar esta ação. Tente novamente mais tarde',
        ),
      )
    }
  }

  return (
    <>
      {DeletedAccountModal ? (
        <DeletedAccountModal callback={() => push('signin')} />
      ) : null}

      <Button.Danger
        data-testid="deleteaccountform-delete"
        onClick={() => setDeleteIntention(true)}
      >
        Deletar conta
      </Button.Danger>

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
                  <Form.PasswordInput name="password" autoComplete="off" />
                  <Form.Error field="password" />
                </Form.Field>
                <UI.Erro>{error}</UI.Erro>
                <div className="flex gap-2 max-md:flex-col mt-2">
                  <Button.Primary
                    data-testid="deleteaccountform-cancel"
                    onClick={() => setDeleteIntention(false)}
                    disabled={isLoading}
                    fullWidth
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
          </Modal.Actions>
        </Modal.Body>
      </Modal.Trigger>
    </>
  )
}
