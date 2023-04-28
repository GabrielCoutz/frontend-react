import { render, renderHook } from '@testing-library/react'
import { FormProvider, useForm } from 'react-hook-form'

import { Error } from '.'

import { mockFormStateWithError } from './__mocks__/error.mock'

const renderErrorComponent = () => {
  const { result } = renderHook(() => useForm())

  return render(
    <FormProvider {...result.current} formState={mockFormStateWithError}>
      <Error field="name" />
    </FormProvider>,
  )
}

describe('[Form] Error', () => {
  it('should have error text', () => {
    const { getByTestId, getByText } = renderErrorComponent()

    expect(getByText('error')).toBeInTheDocument()
    expect(getByTestId('form-error')).toBeInTheDocument()
  })
})
