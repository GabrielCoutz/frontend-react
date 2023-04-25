import { TrashIcon } from '@heroicons/react/24/outline'
import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { IProduct } from '../../interfaces/Product'
import { api } from '../../helpers/request'
import { Button } from '../Button'
import { Modal } from '../Modal'
import { UI } from '../Ui'
import {
  deleteProductFail,
  deleteProductSuccess,
} from '../../redux/product/productSlice'
import { selectUserProductsState } from '../../redux/product/productSelectors'
import { useCookie } from '../../hooks/useCookie'
import { ModalContext } from '../../contexts/modal'

export const Delete = ({ product }: { product: IProduct }) => {
  const { isLoading, error } = useSelector(selectUserProductsState)
  const [deleteIntention, setDeleteIntention] = useState(false)
  const { setTrigger } = useContext(ModalContext)
  const { token } = useCookie()
  const dispatch = useDispatch()

  const handleClick = async () => {
    try {
      await api.product.delete(product.id, token)
      dispatch(deleteProductSuccess(product.id))
      setTrigger('DeletedProduct')
    } catch (error) {
      console.log(error)
      dispatch(
        deleteProductFail(
          'Não foi possível realizar essa ação. Por favor, tente novamente mais tarde',
        ),
      )
    }
  }

  return (
    <>
      <Button.Terciary
        className="text-red-500 hover:text-red-900 bg-red-100 py-2 px-4"
        onClick={() => setDeleteIntention(true)}
        type="button"
      >
        Deletar
      </Button.Terciary>

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
          <UI.Erro className="my-4">{error}</UI.Erro>
          <Modal.Actions className="grid grid-cols-2 gap-4 max-sm:grid-cols-1 max-sm:gap-2">
            <Button.Primary
              onClick={() => setDeleteIntention(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button.Primary>
            <Button.Secondary onClick={handleClick}>
              {isLoading ? 'Aguarde...' : 'Sim, tenho certeza'}
            </Button.Secondary>
          </Modal.Actions>
        </Modal.Body>
      </Modal.Trigger>
    </>
  )
}
