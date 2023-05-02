import { render } from '@testing-library/react'
import { UI } from '.'

describe('[Ui] index', () => {
  it('should render all components', () => {
    const { getByText } = render(
      <>
        <UI.Erro>erro</UI.Erro>
        <UI.Success>success</UI.Success>
      </>,
    )

    expect(getByText('erro')).toBeInTheDocument()
    expect(getByText('success')).toBeInTheDocument()
  })

  it('should not render all components', () => {
    const { queryAllByTestId } = render(
      <>
        <UI.Erro></UI.Erro>
        <UI.Success></UI.Success>
      </>,
    )

    expect(queryAllByTestId(/ui-*/)).toHaveLength(0)
  })
})
