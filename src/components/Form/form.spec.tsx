import { render, renderHook } from '@testing-library/react'
import { FormProvider, useForm } from 'react-hook-form'

import { Form } from '.'

import { mockFormStateWithError } from './Error/__mocks__/error.mock'

const renderForm = () => {
  const { result } = renderHook(() => useForm())

  return render(
    <FormProvider {...result.current} formState={mockFormStateWithError}>
      <Form.Field>
        <Form.Label>label</Form.Label>
        <Form.Input name="name" />
        <Form.Error field="name" />
      </Form.Field>
    </FormProvider>,
  )
}

describe('[Form] index', () => {
  it('should render all components', () => {
    const { getByTestId } = renderForm()

    expect(getByTestId('form-field')).toBeInTheDocument()
    expect(getByTestId('form-label')).toBeInTheDocument()
    expect(getByTestId('form-input')).toBeInTheDocument()
    expect(getByTestId('form-error')).toBeInTheDocument()
  })
})
