import { render } from '@testing-library/react'

import { Label } from '.'

describe('[Form] Label', () => {
  it('should render', () => {
    const { getByText } = render(<Label>label</Label>)

    expect(getByText('label')).toBeInTheDocument()
  })
})
