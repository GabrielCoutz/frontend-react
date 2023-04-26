import { render } from '@testing-library/react'
import { Description } from '.'

describe('[Dangerzone] Description', () => {
  it('should render', () => {
    const { getByText } = render(<Description>description</Description>)

    expect(getByText('description')).toBeInTheDocument()
  })
})
