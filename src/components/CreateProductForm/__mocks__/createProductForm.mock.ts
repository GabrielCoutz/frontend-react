export const userMockState = {
  isLoading: false,
  error: null,
  data: {
    id: '123',
  },
}

export const mockDispatch = jest.fn()
export const mockProductCreate = jest.fn(() => ({ data: {} }))
