import { render, renderHook } from '@testing-library/react'
import { FormProvider, useForm } from 'react-hook-form'

import { Input } from '.'

describe('[Form] Input', () => {
  it('should render', () => {
    const { result } = renderHook(() => useForm())
    const { container } = render(
      <FormProvider {...result.current}>
        <Input name="name" />
      </FormProvider>,
    )
    const input = container.querySelector('[name="name"]')

    expect(input).toBeInTheDocument()
  })
})
