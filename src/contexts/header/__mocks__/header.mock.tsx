export const mockSetMenuIsOpen = jest.fn()
export const mockHeaderContextValues = jest.fn(() => ({
  menuIsOpen: false,
  setMenuIsOpen: () => mockSetMenuIsOpen(),
}))
