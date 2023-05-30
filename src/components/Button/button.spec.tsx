import { render } from '@testing-library/react'
import { Button } from '.'

describe('[Button] index', () => {
  it('should render primary button', () => {
    const { getByText } = render(<Button.Primary>primary</Button.Primary>)

    expect(getByText('primary')).toBeInTheDocument()
  })

  it('should render secondary button', () => {
    const { getByText } = render(<Button.Secondary>secondary</Button.Secondary>)

    expect(getByText('secondary')).toBeInTheDocument()
  })

  it('should render terciary button', () => {
    const { getByText } = render(<Button.Terciary>terciary</Button.Terciary>)

    expect(getByText('terciary')).toBeInTheDocument()
  })

  it('should render danger button', () => {
    const { getByText } = render(<Button.Danger>danger</Button.Danger>)

    expect(getByText('danger')).toBeInTheDocument()
  })
})
