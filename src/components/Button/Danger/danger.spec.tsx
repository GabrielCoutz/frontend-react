import { render } from '@testing-library/react'
import { Danger } from '.'

describe('[Button] Danger', () => {
  it('should render', () => {
    const { getByText } = render(<Danger>teste</Danger>)

    expect(getByText('teste')).toBeInTheDocument()
  })
})
