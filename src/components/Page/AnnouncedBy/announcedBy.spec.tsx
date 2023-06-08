import { render } from '@testing-library/react'
import { AnnouncedBy } from '.'

jest.mock('..', () => ({
  Page: {
    Subtitle: jest.fn(),
    Box: jest.fn(),
  },
}))

describe('[ProductPage] AnnouncedBy', () => {
  it('should render', () => {
    const { getByTestId } = render(<AnnouncedBy>name</AnnouncedBy>)

    expect(getByTestId('page-announcedby')).toBeInTheDocument()
  })
})
