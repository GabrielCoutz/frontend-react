import { TrashIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import { Button } from '../Button'
import { Modal } from '../Modal'

export const ProductDeletedModal = () => {
  const [trigger, setTrigger] = useState(true)

  return (
    <Modal.Trigger trigger={trigger}>
      <Modal.Body onClose={setTrigger}>
        <Modal.IconWrapper className="bg-green-100">
          <TrashIcon className="text-green-500 h-6 w-6" />
        </Modal.IconWrapper>
        <Modal.Title>Até mais</Modal.Title>
        <Modal.Message>Produto deletado com sucesso</Modal.Message>
        <Modal.Actions>
          <Button.Primary onClick={() => setTrigger(false)} className="w-full">
            Continuar
          </Button.Primary>
        </Modal.Actions>
      </Modal.Body>
    </Modal.Trigger>
  )
}
