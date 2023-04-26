export const userMockState = {
  user: {
    isLoading: false,
    error: null,
    data: null,
  },
}

export const mockDispatch = jest.fn()
export const mockProductCreate = jest.fn(() => ({ data: {} }))