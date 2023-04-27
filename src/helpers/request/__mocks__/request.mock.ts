export const mockRequest = {
  api: {
    auth: {
      login: () => jest.fn(() => ({ data: { id: '123', token: '123' } })),
      validate: () => jest.fn(),
    },
    user: {
      delete: () => jest.fn(),
      create: () => jest.fn(),
      update: () => jest.fn(),
      getAll: () => jest.fn(),
      get: () => jest.fn(),
    },
    product: {
      delete: () => jest.fn(),
      create: () => jest.fn(),
      update: () => jest.fn(),
      getAll: () => jest.fn(),
      get: () => jest.fn(),
    },
  },
}
