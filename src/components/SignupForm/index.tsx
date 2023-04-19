import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Form } from '../Form'

interface SignupFormSchema {
  name: string
  email: string
  password: string
}

const SignupForm = () => {
  const signupFormMethods = useForm<SignupFormSchema>()
  const { handleSubmit } = signupFormMethods

  const handleSignup = (data: SignupFormSchema) => {
    console.log(data)
  }

  return (
    <div className="mx-auto p-4 max-w-screen-sm">
      <FormProvider {...signupFormMethods}>
        <form
          className="bg-white p-10 container mx-auto my-8 rounded"
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

          <button className="bg-indigo-600 hover:bg-indigo-700 py-2 px-8 text-slate-50 rounded mt-4 transition">
            Cadastrar-se
          </button>
        </form>
      </FormProvider>
    </div>
  )
}

export default SignupForm
