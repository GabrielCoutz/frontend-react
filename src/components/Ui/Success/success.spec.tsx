import { render } from '@testing-library/react'
import { Success } from '.'

describe('[Ui] Success', () => {
  it('should render', () => {
    const { getByText } = render(<Success>success</Success>)

    expect(getByText('success')).toBeInTheDocument()
  })

  it('should not render', () => {
    const { queryByTestId } = render(
      <Success data-testid="ui-success"></Success>,
    )

    expect(queryByTestId('ui-success')).not.toBeInTheDocument()
  })
})
