'use client'

import { CakeIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import React from 'react'

import { Button } from '../../../Button'
import { Modal } from '../../../Modal'

export const Created = () => {
  const { back } = useRouter()
  return (
    <Modal.Wrapper>
      <Modal.IconWrapper className="bg-green-100">
        <CakeIcon className="text-green-500 h-6 w-6" />
      </Modal.IconWrapper>
      <Modal.Title>É isso aí</Modal.Title>
      <Modal.Message>Produto criado com sucesso</Modal.Message>
      <Modal.Actions>
        <Button.Primary fullWidth onClick={back}>
          Continuar
        </Button.Primary>
      </Modal.Actions>
    </Modal.Wrapper>
  )
}
