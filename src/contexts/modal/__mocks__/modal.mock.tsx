import { PropsWithChildren } from 'react'
import { ModalContext } from '..'

export const mockModalSetTrigger = jest.fn()
export const mockModalContext = {
  openModal: jest.fn(),
  setTrigger: () => mockModalSetTrigger(),
  trigger: '' as any,
}

export const MockModalContext = ({ children }: PropsWithChildren) => {
  return (
    <ModalContext.Provider value={mockModalContext}>
      {children}
    </ModalContext.Provider>
  )
}
