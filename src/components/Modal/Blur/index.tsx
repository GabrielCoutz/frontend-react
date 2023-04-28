import { Transition } from '@headlessui/react'
import React, { Fragment } from 'react'

export const Blur = () => {
  return (
    <Transition.Child
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 bg-slate-600 bg-opacity-75 transition-opacity" data-testid="modal-blur" />
    </Transition.Child>
  )
}
