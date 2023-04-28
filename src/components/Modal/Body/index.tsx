import { Dialog, Transition } from '@headlessui/react'
import React, { HtmlHTMLAttributes, PropsWithChildren } from 'react'
import { Blur } from '../Blur'
import { Wrapper } from '../Wrapper'

interface BodyProps
  extends PropsWithChildren<HtmlHTMLAttributes<HTMLDivElement>> {
  onClose: React.Dispatch<React.SetStateAction<boolean>>
}

export const Body = (props: BodyProps) => {
  return (
    <Dialog as="div" className="relative z-10" onClose={props.onClose}>
      <Blur />
      <Wrapper>
        <Transition.Child
          as="div"
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          className="max-sm:self-center"
        >
          <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-center shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:self-center px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            {props.children}
          </Dialog.Panel>
        </Transition.Child>
      </Wrapper>
    </Dialog>
  )
}
