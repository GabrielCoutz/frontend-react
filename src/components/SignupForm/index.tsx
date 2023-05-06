import { useForm, FormProvider } from 'react-hook-form'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { ApiErrorResponse } from '../../helpers/request/error'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '../../helpers/request'
import { Button } from '../Button'
import { Form } from '../Form'
import { UI } from '../Ui'
import { z } from 'zod'
import { useModal } from '../../hooks/useModal'

const signupFormSchema = z.object({
  name: z
    .string()
    .min(4, 'O nome precisa ter no mínimo 4 letras')
    .nonempty()
    .trim()
    .transform((name) => name.replace(/\s+/g, ' ')),
  email: z.string().email('Email inválido').nonempty(),
  password: z
    .string()
    .min(6, 'A senha precisa ter no mínimo 6 caracteres')
    .nonempty(),
})

type ISignupFormSchema = z.infer<typeof signupFormSchema>

const SignupForm = () => {
  const signupFormMethods = useForm<ISignupFormSchema>({
    resolver: zodResolver(signupFormSchema),
  })
  const { handleSubmit } = signupFormMethods
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const { showModal, Modal } = useModal()
  const { push } = useRouter()

  const handleSignup = async (payload: ISignupFormSchema) => {
    setError('')
    setLoading(true)

    try {
      await api.user.create(payload)
      showModal('createdAccount')
    } catch (error: any) {
      const { response }: ApiErrorResponse = error
      if (response?.data.statusCode === 409) return setError('Email já em uso.')

      setError('Erro inesperado, por favor tente novamente mais tarde.')
    } finally {
      setLoading(false)
    }
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
