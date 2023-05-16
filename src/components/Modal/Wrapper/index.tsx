'use client'

import { XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import React, { MouseEvent, ReactNode, useRef } from 'react'

interface WrapperProps {
  children: ReactNode
  className?: string
}

export const Wrapper = ({ children, className }: WrapperProps) => {
  const backgroundRef = useRef<null | HTMLDivElement>(null)
  const { back } = useRouter()

  const handleOutsideClick = (e: MouseEvent<HTMLDivElement>) => {
    const clickedElement = e.target
    const backgroundWasClicked = clickedElement === backgroundRef.current

    if (backgroundWasClicked) back()
  }

  return (
    <div
      className="fixed top-0 inset-x-0 overflow-hidden z-10"
      onClick={handleOutsideClick}
      data-testid="modal-wrapper"
    >
      <div
        className="flex items-center justify-center h-screen bg-gray-500/75 backdrop-blur p-16"
        ref={backgroundRef}
      >
        <div
          className={`z-10 bg-white rounded shadow-lg p-4 max-w-xs w-full text-center relative ${className}`}
        >
          <div className="absolute top-0 right-0">
            <button
              onClick={back}
              className="p-2"
              type="button"
              aria-label="fechar modal"
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
