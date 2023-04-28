import { render } from '@testing-library/react'

import { Field } from '.'

describe('[Form] Field', () => {
  it('should render', () => {
    const { getByText } = render(<Field>field</Field>)

    expect(getByText('field')).toBeInTheDocument()
  })
})
