import { render } from '@testing-library/react'
import { Sidenav } from '.'

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}))

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}))

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(() => ({
    menuIsOpen: false,
    setActiveOption: jest.fn(),
  })),
}))

describe('[Sidenav] index', () => {
  it('should render all components', () => {
    const { getAllByTestId } = render(
      <Sidenav.Nav>
        <Sidenav.NavToggle />
        <Sidenav.Options />
      </Sidenav.Nav>,
    )

    expect(getAllByTestId(/sidenav-*/)).toHaveLength(6)
  })
})
