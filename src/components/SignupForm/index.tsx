import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import Link from 'next/link'
import React from 'react'

import { ISignupFormSchema, signupFormSchema } from './schema'
import { useAxios } from '../../hooks/useAxios'
import { useModal } from '../../hooks/useModal'
import { api } from '../../helpers/request'
import { Button } from '../Button'
import { Form } from '../Form'
import { UI } from '../Ui'

const SignupForm = () => {
  const signupFormMethods = useForm<ISignupFormSchema>({
    resolver: zodResolver(signupFormSchema),
  })
  const { handleSubmit } = signupFormMethods
  const { showModal, Modal } = useModal()
  const { push } = useRouter()
  const { error, loading, send } = useAxios(api.user.create)

  const handleSignup = async (payload: ISignupFormSchema) => {
    const result = await send({ payload })

    if (result) showModal('createdAccount')
  }

  return (
    <>
      {Modal ? <Modal callback={() => push('signin')} /> : null}

      <div className="mx-auto p-4 max-w-sm sm:w-full">
        <FormProvider {...signupFormMethods}>
          <form
            className="mx-auto rounded flex flex-col gap-4"
            onSubmit={handleSubmit(handleSignup)}
          >
            <Form.Field>
              <Form.Label htmlFor="name">Nome</Form.Label>
              <Form.Input name="name" />
              <Form.Error field="name" />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Input name="email" type="email" />
              <Form.Error field="email" />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="password">Senha</Form.Label>
              <Form.PasswordInput name="password" autoComplete="password" />
              <Form.Error field="password" />
            </Form.Field>

            <div className="text-center">
              <UI.Erro>{error}</UI.Erro>
            </div>
            <div className="mt-2">
              <Button.Primary
                data-testid="signupform-submit"
                fullWidth
                loading={loading}
              >
                Cadastrar-se
              </Button.Primary>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Já tem conta?{' '}
            <Link href="/signin">
              <Button.Terciary data-testid="signupform-singin-link">
                Faça login
              </Button.Terciary>
            </Link>
          </p>
        </FormProvider>
      </div>
    </>
  )
}

export default SignupForm
