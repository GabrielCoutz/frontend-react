'use client'

import { TrashIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import React from 'react'

import { IProduct } from '../../interfaces/Product'
import { useCookie } from '../../hooks/useCookie'
import { useAxios } from '../../hooks/useAxios'
import { api } from '../../helpers/request'
import { Button } from '../Button'
import { Modal } from '../Modal'
import { useProductStore } from '../../hooks/useProductStore'

export const DeleteProductForm = ({ product }: { product: IProduct }) => {
  const productToDelete = product
  const { back, push } = useRouter()
  const { error, loading, send } = useAxios(api.product.delete)
  const { deleteProductFail, deleteProductSuccess } = useProductStore()
  const { token } = useCookie()

  const handleClick = async () => {
    await send({ id: productToDelete.id, token })
    if (error) return deleteProductFail(error)

    deleteProductSuccess(productToDelete.id)
    push('/profile/product/deleted')
  }

  return (
    <div>
      <Modal.IconWrapper className="bg-red-100">
        <TrashIcon className="text-red-500 h-6 w-6" />
      </Modal.IconWrapper>
      <Modal.Title>
        Deletar <span className="italic">"{productToDelete?.name}"</span>
      </Modal.Title>
      <Modal.Message>
        Você tem certeza que deseja deletar este produto?
      </Modal.Message>

      <Modal.Actions>
        <Button.Secondary
          fullWidth
          onClick={back}
          loading={loading}
          data-testid="cancel-delete-product-button"
        >
          Cancelar
        </Button.Secondary>
        <Button.Danger
          fullWidth
          onClick={handleClick}
          loading={loading}
          data-testid="confirm-delete-product-button"
        >
          Sim, tenho certeza
        </Button.Danger>
      </Modal.Actions>
    </div>
  )
}
