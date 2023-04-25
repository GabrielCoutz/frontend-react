import { Disclosure } from '@headlessui/react'
import React, { HTMLAttributes, PropsWithChildren } from 'react'

export const Wrapper = (
  props: PropsWithChildren<HTMLAttributes<HTMLDivElement>>,
) => {
  return (
    <Disclosure as="div" {...props}>
      {props.children}
    </Disclosure>
  )
}
