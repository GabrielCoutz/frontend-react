import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { Header } from '.'
import { mockStore } from '../../redux/__mocks__/redux.mock'

const renderHeader = () => {
  return render(
    <Provider store={mockStore({})}>
      <Header.Background>
        <Header.Container>
          <Header.Logo />
          <Header.MobileButton />
          <Header.Nav>
            <Header.Links />
          </Header.Nav>
        </Header.Container>
      </Header.Background>
    </Provider>,
  )
}

describe('[Header] index', () => {
  it('should render all components', () => {
    const { getAllByTestId } = renderHeader()

    expect(getAllByTestId(/header-*/)).toHaveLength(6)
  })
})
