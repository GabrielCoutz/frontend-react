import configureStore from 'redux-mock-store'

export const mockStore = configureStore([])
export const store = mockStore()

export const mockDispatch = jest.fn()
export const mockUseSelect = (mockState?: any) => jest.fn(() => mockState)
