import { z } from 'zod'

export const productFormSchema = z.object({
  name: z.string().nonempty('Preencha o nome'),
  price: z
    .string()
    .refine((price) => +price > 0, 'O preço precisa ser maior que 0')
    .transform((price) => +price),
  description: z.string().nonempty('Preencha a descrição'),
})
export type IProductFormSchema = z.infer<typeof productFormSchema>
