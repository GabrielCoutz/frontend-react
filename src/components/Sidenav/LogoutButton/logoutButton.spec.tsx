import userEvents from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'

import { LogoutButton } from '.'

import { mockStore } from '../../../redux/__mocks__/redux.mock'

const mockPush = jest.fn()
jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn(() => ({ push: mockPush() })),
}))

const mockUseDispatch = jest.fn()
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockUseDispatch(),
}))

const renderLogoutButton = () => {
  return render(
    <Provider store={mockStore({})}>
      <LogoutButton />
    </Provider>,
  )
}

describe('[SideNav] LogoutButton', () => {
  it('should render', () => {
    const { getByRole } = renderLogoutButton()

    expect(getByRole('button')).toBeInTheDocument()
  })

  it('should call logout when button is clicked', () => {
    const { getByRole } = renderLogoutButton()
    const logoutButton = getByRole('button')

    userEvents.click(logoutButton)

    expect(mockPush).toBeCalled()
    expect(mockUseDispatch).toBeCalled()
  })
})
