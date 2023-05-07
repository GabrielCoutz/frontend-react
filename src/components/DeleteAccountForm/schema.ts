import { z } from 'zod'

export const deleteAccountSchema = z.object({
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
})
export type IDeleteAccountSchema = z.infer<typeof deleteAccountSchema>
