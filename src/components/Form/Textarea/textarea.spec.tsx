import { render, renderHook, screen } from '@testing-library/react'
import { FormProvider, useForm } from 'react-hook-form'
import { Textarea } from '.'

describe('[Form] Textarea', () => {
  it('should render', () => {
    const { result } = renderHook(() => useForm())
    const { getByTestId } = render(
      <FormProvider {...result.current}>
        <Textarea name="textarea" />
      </FormProvider>,
    )

    expect(getByTestId('textarea')).toBeInTheDocument()
  })
})
