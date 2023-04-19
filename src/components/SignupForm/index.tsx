import React from 'react'
import { useForm } from 'react-hook-form'
import { ErrorIcon } from '../Icons/Error'

interface SignupFormSchema {
  name: string
  email: string
  password: string
}

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormSchema>()

  const handleSignup = (data: SignupFormSchema) => {
    console.log(data)
  }

  return (
    <div className="mx-auto p-4 max-w-screen-sm">
      <form
        className="bg-white p-10 container mx-auto my-8 rounded"
        onSubmit={handleSubmit(handleSignup)}
      >
        <div className="flex flex-col">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            {...register('name', { required: 'Preencha o nome' })}
            className="max-w-[300px] rounded border-2 border-gray-400 hover:border-indigo-600 focus:border-indigo-600 transition"
          />
          {errors.name?.message && (
            <span className="text-red-500 font-medium flex">
              <ErrorIcon />
              {errors.name?.message}
            </span>
          )}
        </div>

        <button className="bg-indigo-600 hover:bg-indigo-700 py-2 px-8 text-slate-50 rounded mt-4 transition">
          Cadastrar-se
        </button>
      </form>
    </div>
  )
}

export default SignupForm
