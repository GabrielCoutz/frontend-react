import { CakeIcon } from '@heroicons/react/24/outline'
import React, { useContext } from 'react'
import { ModalContext } from '../../contexts/modal'
import { Button } from '../Button'
import { Modal } from '../Modal'

export const ProductCreatedModal = () => {
  const { trigger, setTrigger } = useContext(ModalContext)

  return (
    <Modal.Trigger trigger={!!trigger}>
      <Modal.Body onClose={() => setTrigger(undefined)}>
        <Modal.IconWrapper className="bg-green-200">
          <CakeIcon className="w-6 h-6 text-green-500" />
        </Modal.IconWrapper>
        <Modal.Title>É isso aí</Modal.Title>
        <Modal.Message>Produto criado com sucesso</Modal.Message>
        <Modal.Actions>
          <Button.Primary onClick={() => setTrigger(undefined)}>
            Ver meus produtos
          </Button.Primary>
        </Modal.Actions>
      </Modal.Body>
    </Modal.Trigger>
  )
}
