import { Transition } from '@headlessui/react'
import React, { PropsWithChildren } from 'react'

export const Trigger = (props: PropsWithChildren<{ trigger: boolean }>) => {
  return (
    <Transition show={props.trigger} as="div">
      {props.children}
    </Transition>
  )
}
