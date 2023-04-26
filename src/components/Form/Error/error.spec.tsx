import { render, renderHook } from '@testing-library/react'
import { FieldValues, FormProvider, FormState, useForm } from 'react-hook-form'
import { Error } from '.'

export const mockFormStateWithError = {
  errors: {
    name: {
      type: 'required',
      message: 'error',
    },
  },
} as unknown as FormState<FieldValues>

describe('[Form] Error', () => {
  it('should have error text', () => {
    const { result } = renderHook(() => useForm())

    const { getByTestId, getByText } = render(
      <FormProvider {...result.current} formState={mockFormStateWithError}>
        <Error field="name" />
      </FormProvider>,
    )

    expect(getByText('error')).toBeInTheDocument()
    expect(getByTestId('form-error')).toBeInTheDocument()
  })
})
