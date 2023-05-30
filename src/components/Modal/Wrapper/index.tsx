'use client'

import { XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import React, { MouseEvent, ReactNode, useRef } from 'react'

interface WrapperProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export const Wrapper = ({ children, className, onClick }: WrapperProps) => {
  const backgroundRef = useRef<null | HTMLDivElement>(null)
  const { back } = useRouter()
  const closeCallback = onClick || back

  const handleOutsideClick = (e: MouseEvent<HTMLDivElement>) => {
    const clickedElement = e.target
    const backgroundWasClicked = clickedElement === backgroundRef.current

    if (backgroundWasClicked) closeCallback()
  }

  return (
    <div
      className="fixed top-0 inset-x-0 overflow-hidden z-10"
      onClick={handleOutsideClick}
      data-testid="modal-wrapper"
    >
      <div
        className="flex items-center justify-center h-screen bg-gray-500/75 backdrop-blur p-16"
        data-testid="modal-background"
        ref={backgroundRef}
      >
        <div
          className={`z-10 bg-white rounded shadow-lg p-4 max-w-sm w-full text-center relative ${className}`}
        >
          <div className="absolute top-0 right-0">
            <button
              onClick={closeCallback}
              className="p-2"
              type="button"
              aria-label="fechar modal"
              data-testid="modal-close-button"
            >
              <XMarkIcon className="w-6 h-6 text-slate-600" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
