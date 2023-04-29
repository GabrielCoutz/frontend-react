import { render } from '@testing-library/react'
import { Provider } from 'react-redux'

import { Options } from '.'

import { mockStore } from '../../../redux/__mocks__/redux.mock'

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
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

jest.mock('.././LogoutButton', () => ({
  LogoutButton: jest.fn(() => <div>logout button</div>),
}))

const renderOptions = () => {
  return render(
    <Provider store={mockStore({})}>
      <Options />
    </Provider>,
  )
}

describe('[Sidenav] Options', () => {
  it('should render', () => {
    const { container } = renderOptions()

    expect(container.getElementsByTagName('ul')[0]).toBeInTheDocument()
  })

  it('should render with logout button', () => {
    const { getByText } = renderOptions()

    expect(getByText('logout button')).toBeInTheDocument()
  })
})
