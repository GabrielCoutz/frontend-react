import { render } from '@testing-library/react'
import { Provider } from 'react-redux'

import Layout from '.'

import { mockStore } from '../../redux/__mocks__/redux.mock'

const renderLayout = () => {
  return render(
    <Provider store={mockStore({})}>
      <Layout>layout</Layout>
    </Provider>,
  )
}

describe('[Layout] index', () => {
  it('should render', () => {
    const { getByText } = renderLayout()

    expect(getByText('layout')).toBeInTheDocument()
  })
})
