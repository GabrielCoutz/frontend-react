import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Deleted } from '.'

const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  usePathname: () => '/profile/product/deleted',
  useRouter: () => ({
    push: () => mockPush(),
  }),
}))

describe('[FeedbackOverlay] Product - Deleted', () => {
  it('should render', () => {
    const { getByText } = render(<Deleted />)

    expect(getByText('Produto deletado com sucesso'))
  })

  it('should back if click in background', async () => {
    const { getByTestId } = render(<Deleted />)
    const modalBackground = getByTestId('modal-background')

    await userEvent.click(modalBackground)

    await waitFor(() => {
      expect(mockPush).toBeCalled()
    })
  })

  it('should back if click in close icon (X)', async () => {
    const { getByTestId } = render(<Deleted />)
    const closeButton = getByTestId('modal-close-button')

    await userEvent.click(closeButton)

    await waitFor(() => {
      expect(mockPush).toBeCalled()
    })
  })

  it('should back if click in confirm button', async () => {
    const { getByText } = render(<Deleted />)
    const confirmButton = getByText('Continuar')

    await userEvent.click(confirmButton)

    await waitFor(() => {
      expect(mockPush).toBeCalled()
    })
  })
})
