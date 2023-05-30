import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Created } from '.'

const mockPush = jest.fn()
const mockBack = jest.fn()
jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: () => ({
    push: () => mockPush(),
    back: () => mockBack(),
  }),
}))

describe('[FeedbackOverlay] Product - Created', () => {
  it('should render', () => {
    const { getByText } = render(<Created />)

    expect(getByText('Produto criado com sucesso'))
  })

  it('should back if click in confirm button', async () => {
    const { getByText } = render(<Created />)
    const confirmButton = getByText('Continuar')

    await userEvent.click(confirmButton)

    await waitFor(() => {
      expect(mockBack).toBeCalled()
    })
  })
})
