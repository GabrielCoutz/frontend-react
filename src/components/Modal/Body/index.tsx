import { Dialog, Transition } from '@headlessui/react'
import React from 'react'

import { Blur } from '../Blur'
import { Wrapper } from '../Wrapper'

interface BodyProps {
  onClose: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode
}

export const Body = ({ onClose, children }: BodyProps) => {
  return (
    <Dialog
      data-testid="modal-body"
      as="div"
      className="relative z-10"
      onClose={onClose}
    >
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
            {children}
          </Dialog.Panel>
        </Transition.Child>
      </Wrapper>
    </Dialog>
  )
}
