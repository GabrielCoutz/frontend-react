import { FieldValues, FormState } from 'react-hook-form'

export const mockFormStateWithError = {
  errors: {
    name: {
      type: 'required',
      message: 'error',
    },
  },
} as unknown as FormState<FieldValues>
