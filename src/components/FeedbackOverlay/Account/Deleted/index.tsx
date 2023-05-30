'use client'

import { CakeIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from '../../../Button'
import { Modal } from '../../../Modal'

export const Deleted = () => {
  const { push } = useRouter()

  return (
    <Modal.Wrapper onClick={() => push('/signin')}>
      <Modal.IconWrapper className="bg-green-100">
        <CakeIcon className="text-green-500 h-6 w-6" />
      </Modal.IconWrapper>
      <Modal.Title>Nos vemos em breve</Modal.Title>
      <Modal.Message>Conta deletada</Modal.Message>
      <Modal.Actions>
        <Button.Primary fullWidth onClick={() => push('/signin')}>
          Continuar
        </Button.Primary>
      </Modal.Actions>
    </Modal.Wrapper>
  )
}
