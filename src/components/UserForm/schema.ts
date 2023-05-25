import { z } from 'zod'
import { IUser } from '../../interfaces/User'

export const userFormDefaultValues = {
  created_at: '',
  email: '',
  id: '',
  name: '',
  password: '',
  products: undefined,
}

const minNameLength = 4

export const userFormSchema = z.object({
  name: z
    .string()
    .min(minNameLength, `O nome precisa ter no mínimo ${minNameLength} letras`),
  email: z.string().email('Email inválido').nonempty(),
  password: z
    .string()
    .refine(
      (password) => (password.length ? password.length > 6 : true),
      'A senha precisa ter no mínimo 6 caracteres',
    )
    .transform((field) => (!field ? undefined : field)),
})

export type IUserFormSchema = z.infer<typeof userFormSchema> & IUser
