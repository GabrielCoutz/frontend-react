import { render } from '@testing-library/react'
import { Terciary } from '.'

describe('[Button] Terciary', () => {
  it('should render', () => {
    const { getByText } = render(<Terciary>teste</Terciary>)

    expect(getByText('teste')).toBeInTheDocument()
  })
})
