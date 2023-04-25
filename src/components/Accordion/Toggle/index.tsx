import { Disclosure, DisclosureButtonProps } from '@headlessui/react'
import React, { PropsWithChildren } from 'react'

export const Toggle = (
  props: PropsWithChildren<DisclosureButtonProps<'div'>>,
) => {
  return (
    <Disclosure.Button as="div" {...props}>
      {props.children}
    </Disclosure.Button>
  )
}
