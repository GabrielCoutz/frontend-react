import { render, renderHook } from '@testing-library/react'
import { FormProvider, useForm } from 'react-hook-form'

import { Form } from '.'
import { mockFormStateWithError } from './Error/error.spec'

describe('[Form] index', () => {
  it('should render all components', () => {
    const { result } = renderHook(() => useForm())
    const { getByTestId } = render(
      <FormProvider {...result.current} formState={mockFormStateWithError}>
        <Form.Field>
          <Form.Label>label</Form.Label>
          <Form.Input name="name" />
          <Form.Error field="name" />
        </Form.Field>
      </FormProvider>,
    )

    expect(getByTestId('form-field')).toBeInTheDocument()
    expect(getByTestId('form-label')).toBeInTheDocument()
    expect(getByTestId('form-input')).toBeInTheDocument()
    expect(getByTestId('form-error')).toBeInTheDocument()
  })
})
