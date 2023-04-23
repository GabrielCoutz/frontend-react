import { TrashIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import { IProduct } from '../../interfaces/Product'
import { Button } from '../Button'
import { Modal } from '../Modal'

export const Delete = ({product}: {product: IProduct}) => {
  const [deletingProduct, setDeletingProduct] = useState(false)
  const handleDeleteProduct = async () => {
    console.log('foi pro caraio')
  }

  return (
    <>
      <Button.Terciary
        className="text-red-500 hover:text-red-900 bg-red-100 py-2 px-4"
        onClick={() => setDeletingProduct(true)}
        type="button"
      >
        Deletar
      </Button.Terciary>

      <Modal.Trigger trigger={deletingProduct}>
        <Modal.Body onClose={setDeletingProduct}>
          <Modal.IconWrapper className="bg-red-100">
            <TrashIcon className="text-red-500 h-6 w-6" />
          </Modal.IconWrapper>
          <Modal.Title>
            Deletar <span className="italic">"{product.name}"</span>
          </Modal.Title>
          <Modal.Message>
            Você tem certeza que deseja deletar este produto?
          </Modal.Message>
          <Modal.Actions className="grid grid-cols-2 gap-4 max-sm:grid-cols-1 max-sm:gap-2">
            <Button.Primary onClick={() => setDeletingProduct(false)}>
              Cancelar
            </Button.Primary>
            <Button.Secondary onClick={handleDeleteProduct}>
              Sim, tenho certeza
            </Button.Secondary>
          </Modal.Actions>
        </Modal.Body>
      </Modal.Trigger>
    </>
  )
}
