import React, { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { api, ApiErrorResponse } from '../../helpers/request'
import { Button } from '../Button'
import { Form } from '../Form'

interface SignupFormSchema {
  name: string
  email: string
  password: string
}

const SignupForm = () => {
  const signupFormMethods = useForm<SignupFormSchema>()
  const { handleSubmit } = signupFormMethods
  const [error, setError] = useState<string | undefined>(undefined)

  const handleSignup = (data: SignupFormSchema) => {
    setError(undefined)
    api.user
      .create(data)
      .then((response) => console.log(response))
      .catch(({ response }: ApiErrorResponse) => {
        if (response?.data.statusCode === 409)
          return setError('Email já em uso.')
        else setError('Erro inesperado, por favor tente novamente mais tarde.')
        console.log(response?.data)
      })
  }

  return (
    <div className="mx-auto p-4 max-w-screen-sm">
      <FormProvider {...signupFormMethods}>
        <form
          className="bg-white p-10 container mx-auto my-8 rounded flex flex-col gap-4 max-w-[400px]"
          onSubmit={handleSubmit(handleSignup)}
        >
          <Form.Field>
            <Form.Label htmlFor="name">Nome</Form.Label>
            <Form.Input
              name="name"
              type="text"
              errorMessage="Preencha este campo"
            />
            <Form.Error field="name" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Input
              name="email"
              type="email"
              errorMessage="Preencha este campo"
            />
            <Form.Error field="email" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="password">Senha</Form.Label>
            <Form.Input
              name="password"
              type="password"
              errorMessage="Preencha este campo"
            />
            <Form.Error field="password" />
          </Form.Field>

          {error && (
            <span className="text-red-500 font-medium text-center">
              {error}
            </span>
          )}

          <Button.Primary>Cadastrar-se</Button.Primary>
        </form>
      </FormProvider>
    </div>
  )
}

export default SignupForm
