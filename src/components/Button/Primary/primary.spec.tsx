import { render } from '@testing-library/react'
import { Primary } from '.'

describe('[Button] Primary', () => {
  it('should render', () => {
    const { getByText } = render(<Primary>teste</Primary>)

    expect(getByText('teste')).toBeInTheDocument()
  })
})
