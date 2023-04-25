import { Disclosure } from '@headlessui/react'
import React, { HtmlHTMLAttributes, PropsWithChildren } from 'react'

export const Content = (
  props: PropsWithChildren<HtmlHTMLAttributes<HTMLDivElement>>,
) => {
  return (
    <Disclosure.Panel as="div" {...props}>
      {props.children}
    </Disclosure.Panel>
  )
}
