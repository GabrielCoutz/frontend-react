import { render } from '@testing-library/react'
import { Erro } from '.'

describe('[Ui] Erro', () => {
  it('should render', () => {
    const { getByText } = render(<Erro>erro</Erro>)

    expect(getByText('erro')).toBeInTheDocument()
  })

  it('should not render', () => {
    const { queryByTestId } = render(<Erro data-testid="ui-erro"></Erro>)

    expect(queryByTestId('ui-erro')).not.toBeInTheDocument()
  })
})
