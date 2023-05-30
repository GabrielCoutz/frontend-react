'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { setCookie } from 'nookies'
import Link from 'next/link'
import React from 'react'

import { ISigninFormSchema, signinFormSchema } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAxios } from '../../hooks/useAxios'
import { api } from '../../helpers/request'
import { Button } from '../Button'
import { Form } from '../Form'
import { UI } from '../Ui'

const SigninForm = () => {
  const signinFormMethods = useForm<ISigninFormSchema>({
    resolver: zodResolver(signinFormSchema),
  })
  const { push } = useRouter()
  const { handleSubmit } = signinFormMethods
  const { error, loading, send } = useAxios(api.auth.login)

  const handleSignin = async (payload: ISigninFormSchema) => {
    const result = await send(payload)
    if (!result) return

    const { data } = result

    const cookieMaxAge = 60 * 60 * 24 * 1 // 1 day

    setCookie(undefined, 'token', data.token, {
      maxAge: cookieMaxAge,
    })
    setCookie(undefined, 'userId', data.id, {
      maxAge: cookieMaxAge,
    })

    push('profile')
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
              data-testid="signinform-submit"
              fullWidth
              loading={loading}
            >
              Entrar
            </Button.Primary>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Não tem conta?{' '}
          <Link href="/signup">
            <Button.Terciary data-testid="signinform-signup-link">
              Faça uma agora!
            </Button.Terciary>
          </Link>
        </p>
      </FormProvider>
    </div>
  )
}

export default SigninForm
