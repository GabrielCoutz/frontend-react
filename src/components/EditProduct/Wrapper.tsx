import { Disclosure } from '@headlessui/react'
import React, { HTMLAttributes, PropsWithChildren } from 'react'

export const Wrapper = (
  props: PropsWithChildren<HTMLAttributes<HTMLDivElement>>,
) => {
  return (
    <Disclosure
      as="div"
      {...props}
      className={`grid grid-cols-2 col-span-full ${props.className} gap-y-4`}
    >
      {props.children}
    </Disclosure>
  )
}
