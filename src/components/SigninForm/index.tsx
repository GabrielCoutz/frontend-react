import Link from 'next/link'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { api } from '../../helpers/request'
import { ApiErrorResponse } from '../../helpers/request/error'

import { Button } from '../Button'
import { Form } from '../Form'

interface SigninFormSchema {
  email: string
  password: string
}

const SigninForm = () => {
  const signinFormMethods = useForm<SigninFormSchema>()
  const { handleSubmit } = signinFormMethods
  const [error, setError] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState<boolean | undefined>(undefined)

  const handleSignin = (payload: SigninFormSchema) => {
    setError(undefined)
    setLoading(true)

    api.auth
      .login(payload)
      .then(({ data }) => console.log(data))
      .catch(({ response }: ApiErrorResponse) => {
        if (response?.data.statusCode == 401)
          return setError('Credenciais inválidas')
        else setError('Erro inesperado, por vafor tente novamente mais tarde.')
        console.log(response?.data)
      })
      .finally(() => setLoading(false))
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
            <Form.Input
              name="password"
              type="password"
              errormessage="Preencha este campo"
            />
            <Form.Error field="password" />
          </Form.Field>

          {error && (
            <span className="text-red-500 font-medium text-center text-sm">
              {error}
            </span>
          )}
          <Button.Primary className="mt-2" disabled={loading}>
            {loading ? 'Carregando...' : 'Entrar'}
          </Button.Primary>
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
