import userEvents from '@testing-library/user-event'
import { render, waitFor } from '@testing-library/react'

import { LogoutButton } from '.'

const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: () => ({
    push: () => mockPush(),
  }),
}))

const mockLogoutUser = jest.fn()
jest.mock('../../../hooks/useUserStore', () => ({
  ...jest.requireActual('../../../hooks/useUserStore'),
  useUserStore: () => ({
    logoutUser: () => mockLogoutUser(),
  }),
}))

describe('[SideNav] LogoutButton', () => {
  it('should render', () => {
    const { getByRole } = render(<LogoutButton />)

    expect(getByRole('button')).toBeInTheDocument()
  })

  it('should call logout when button is clicked', async () => {
    const { getByRole } = render(<LogoutButton />)
    const logoutButton = getByRole('button')

    await userEvents.click(logoutButton)

    await waitFor(() => {
      expect(mockPush).toBeCalled()
      expect(mockLogoutUser).toBeCalled()
    })
  })
})
