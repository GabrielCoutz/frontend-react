import { TrashIcon } from '@heroicons/react/24/outline'
import React, { useContext } from 'react'

import { ModalContext } from '../../../contexts/modal'
import { Button } from '../../Button'
import { Modal } from '../../Modal'

export const ProductDeletedModal = () => {
  const { trigger, setTrigger } = useContext(ModalContext)

  return (
    <Modal.Trigger trigger={!!trigger}>
      <Modal.Body onClose={() => setTrigger(undefined)}>
        <Modal.IconWrapper className="bg-green-100">
          <TrashIcon className="text-green-500 h-6 w-6" />
        </Modal.IconWrapper>
        <Modal.Title>Até mais</Modal.Title>
        <Modal.Message>Produto deletado com sucesso</Modal.Message>
        <Modal.Actions>
          <Button.Primary onClick={() => setTrigger(undefined)} fullWidth>
            Continuar
          </Button.Primary>
        </Modal.Actions>
      </Modal.Body>
    </Modal.Trigger>
  )
}
