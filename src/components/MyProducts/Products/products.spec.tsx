import { render, waitFor } from '@testing-library/react'

import { Products } from '.'

const mockData = jest.fn(() => ({
  data: [{ id: '1' }],
}))
jest.mock('../../../hooks/useProductStore', () => ({
  ...jest.requireActual('../../../hooks/useProductStore'),
  useProductStore: () => mockData(),
}))

describe('[MyProducts] Products', () => {
  it('should render', async () => {
    const { container } = render(<Products />)

    await waitFor(() => {
      expect(container.getElementsByTagName('li')[0]).toBeInTheDocument()
    })
  })

  it('should not render', async () => {
    mockData.mockReturnValue({ data: [] })
    const { container } = render(<Products />)

    await waitFor(() => {
      expect(container.getElementsByTagName('li')[0]).toBeFalsy()
    })
  })
})
