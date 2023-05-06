import { TrashIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux'
import React, { useState } from 'react'

import { IProduct } from '../../../interfaces/Product'
import { api } from '../../../helpers/request'
import { Button } from '../../Button'
import { Modal } from '../../Modal'
import { UI } from '../../Ui'
import {
  deleteProductFail,
  deleteProductSuccess,
} from '../../../redux/product/productSlice'
import { selectUserProductsState } from '../../../redux/product/productSelectors'
import { useCookie } from '../../../hooks/useCookie'
import { useModal } from '../../../hooks/useModal'

export const Delete = ({ product }: { product: IProduct }) => {
  const { isLoading, error } = useSelector(selectUserProductsState)
  const [deleteIntention, setDeleteIntention] = useState(false)
  const { showModal, Modal: DeletedProductModal } = useModal()
  const dispatch = useDispatch()
  const { token } = useCookie()

  const handleClick = async () => {
    setDeleteIntention(false)

    try {
      await api.product.delete(product.id, token)
      showModal('deletedProduct')
    } catch (error) {
      dispatch(
        deleteProductFail(
          'Não foi possível realizar essa ação. Por favor, tente novamente mais tarde',
        ),
      )
    }
  }

  return (
    <>
      {DeletedProductModal ? (
        <DeletedProductModal
          callback={() => dispatch(deleteProductSuccess(product.id))}
        />
      ) : null}

      <Button.Secondary
        data-testid="button-delete-product"
        onClick={() => setDeleteIntention(true)}
        type="button"
      >
        Deletar
      </Button.Secondary>

      <Modal.Trigger trigger={deleteIntention}>
        <Modal.Body onClose={setDeleteIntention}>
          <Modal.IconWrapper className="bg-red-100">
            <TrashIcon className="text-red-500 h-6 w-6" />
          </Modal.IconWrapper>
          <Modal.Title>
            Deletar <span className="italic">"{product.name}"</span>
          </Modal.Title>
          <Modal.Message>
            Você tem certeza que deseja deletar este produto?
          </Modal.Message>
          <div className="my-4">
            <UI.Erro>{error}</UI.Erro>
          </div>
          <Modal.Actions>
            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1 max-sm:gap-2">
              <Button.Primary
                onClick={() => setDeleteIntention(false)}
                disabled={isLoading}
              >
                Cancelar
              </Button.Primary>
              <Button.Secondary onClick={handleClick} loading={isLoading}>
                Sim, tenho certeza
              </Button.Secondary>
            </div>
          </Modal.Actions>
        </Modal.Body>
      </Modal.Trigger>
    </>
  )
}
