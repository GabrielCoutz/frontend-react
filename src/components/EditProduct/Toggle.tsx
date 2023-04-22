import { Disclosure, DisclosureButtonProps } from '@headlessui/react'
import React, { ElementType, PropsWithChildren } from 'react'

export const Toggle = (
  props: PropsWithChildren<DisclosureButtonProps<ElementType>>,
) => {
  return <Disclosure.Button {...props}>{props.children}</Disclosure.Button>
}
