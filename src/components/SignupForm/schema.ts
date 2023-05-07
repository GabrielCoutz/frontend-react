import { z } from 'zod'

export const signupFormSchema = z.object({
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

export type ISignupFormSchema = z.infer<typeof signupFormSchema>
