import { Transition } from '@headlessui/react'
import { PropsWithChildren } from 'react'

export class MockResizeObserver {
  observe() {}
  disconnect() {}
  unobserve() {}
}

export const MockTransitionWrapper = ({ children }: PropsWithChildren) => {
  return <Transition show={true}>{children}</Transition>
}
