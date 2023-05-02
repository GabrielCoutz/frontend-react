import { render, renderHook } from '@testing-library/react'
import { FormProvider, useForm } from 'react-hook-form'

import { Textarea } from '.'

const renderTextarea = () => {
  const { result } = renderHook(() => useForm())

  return render(
    <FormProvider {...result.current}>
      <Textarea name="textarea" />
    </FormProvider>,
  )
}

describe('[Form] Textarea', () => {
  it('should render', () => {
    const { getByTestId } = renderTextarea()

    expect(getByTestId('form-textarea')).toBeInTheDocument()
  })
})
