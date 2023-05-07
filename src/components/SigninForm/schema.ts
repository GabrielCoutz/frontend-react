import { z } from 'zod'

export const signinFormSchema = z.object({
  email: z.string().email('Email inválido').nonempty(),
  password: z
    .string()
    .min(6, 'A senha precisa ter no mínimo 6 caracteres')
    .nonempty(),
})
export type ISigninFormSchema = z.infer<typeof signinFormSchema>
