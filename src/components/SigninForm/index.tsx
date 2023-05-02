import Link from 'next/link'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { setCookie } from 'nookies'

import { api } from '../../helpers/request'
import { ApiErrorResponse } from '../../helpers/request/error'
import { Button } from '../Button'
import { Form } from '../Form'
import { useRouter } from 'next/router'
import { UI } from '../Ui'

interface SigninFormSchema {
  email: string
  password: string
}

const SigninForm = () => {
  const signinFormMethods = useForm<SigninFormSchema>()
  const { push } = useRouter()
  const { handleSubmit } = signinFormMethods
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleSignin = async (payload: SigninFormSchema) => {
    setError('')
    setLoading(true)

    try {
      const { data } = await api.auth.login(payload)
      const cookieMaxAge = 60 * 60 * 24 * 1 // 1 day

      setCookie(undefined, 'token', data.token, {
        maxAge: cookieMaxAge,
      })
      setCookie(undefined, 'id', data.id, {
        maxAge: cookieMaxAge,
      })
      push('profile')
    } catch (error: any) {
      const { response }: ApiErrorResponse = error

      if (response?.data.statusCode === 401)
        return setError('Credenciais inválidas')

      setError('Erro inesperado, por favor tente novamente mais tarde.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto p-4 max-w-sm sm:w-full">
      <FormProvider {...signinFormMethods}>
        <form
          onSubmit={handleSubmit(handleSignin)}
          className="mx-auto rounded flex flex-col gap-4"
        >
          <Form.Field>
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Input
              name="email"
              type="email"
              errormessage="Preencha este campo"
              validation={{ value: /\S+@\S+\.\S+/, message: 'Email inválido' }}
            />
            <Form.Error field="email" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="password">Senha</Form.Label>
            <Form.PasswordInput
              name="password"
              errormessage="Preencha este campo"
              autoComplete="password"
            />
            <Form.Error field="password" />
          </Form.Field>

          <div className="text-center">
            <UI.Erro>{error}</UI.Erro>
          </div>
          <div className="mt-2">
            <Button.Primary fullWidth loading={loading}>
              Entrar
            </Button.Primary>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Não tem conta?{' '}
          <Link href="signup">
            <Button.Terciary>Faça uma agora!</Button.Terciary>
          </Link>
        </p>
      </FormProvider>
    </div>
  )
}

export default SigninForm
