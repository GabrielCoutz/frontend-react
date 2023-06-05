import { render } from '@testing-library/react'
import { DotList } from '.'

export const mockDotList = [
  {
    id: '1',
    info: 'item',
  },
  {
    id: '2',
    info: 'item',
  },
  {
    id: '3',
    info: 'item',
  },
]

describe('[ProductPage] DotList', () => {
  it('should render', () => {
    const { getAllByText } = render(<DotList list={mockDotList} />)

    expect(getAllByText('item')).toHaveLength(3)
  })
})
