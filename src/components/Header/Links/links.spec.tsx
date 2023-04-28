import { render } from '@testing-library/react'
import { Provider } from 'react-redux'

import { Links } from '.'

import { mockStore } from '../../../redux/__mocks__/redux.mock'
import { mockHeaderContextValues } from '../../../contexts/header/__mocks__/header.mock'

const mockUseSelector = jest.fn(() => '')
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: () => mockUseSelector(),
}))

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: () => mockHeaderContextValues,
}))

const renderLinks = () => {
  return render(
    <Provider store={mockStore({})}>
      <Links />
    </Provider>,
  )
}

describe('[Header] Links', () => {
  it('should render', () => {
    const { container } = renderLinks()

    expect(container.getElementsByTagName('ul')[0]).toBeInTheDocument()
  })

  it('should render profile button is user is logged', () => {
    mockUseSelector.mockReturnValue('user')
    const { container } = renderLinks()
    const profileLink = container.getElementsByTagName('a')[0]

    expect(profileLink.textContent).toEqual('User')
  })

  it('should render other links when user is not logged', () => {
    mockUseSelector.mockReturnValue('')
    const { container } = renderLinks()
    const profileLink = container.getElementsByTagName('a')[0]

    expect(profileLink.textContent).not.toEqual('User')
  })
})
