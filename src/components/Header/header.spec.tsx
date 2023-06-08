import { render } from '@testing-library/react'

import { Header } from '.'

const renderHeader = () => {
  return render(
    <Header.Background>
      <Header.Container>
        <Header.Logo />
        <Header.MobileButton />
        <Header.Nav>
          <Header.Links />
        </Header.Nav>
      </Header.Container>
    </Header.Background>,
  )
}

describe('[Header] index', () => {
  it('should render all components', () => {
    const { getAllByTestId } = renderHeader()

    expect(getAllByTestId(/header-*/)).toHaveLength(6)
  })
})
