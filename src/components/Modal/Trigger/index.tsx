import { Transition } from '@headlessui/react'
import React from 'react'

interface TriggerProps {
  trigger: boolean
  children: React.ReactNode
}

export const Trigger = ({ children, trigger }: TriggerProps) => {
  return (
    <Transition data-testid="modal-tigger" show={trigger} as="div">
      {children}
    </Transition>
  )
}
