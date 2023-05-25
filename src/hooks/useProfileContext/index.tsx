'use client'

import { useContext } from 'react'
import { CreateProfileContext, IProfileContext } from '../../contexts/profile'

export const useProfileContext = (): IProfileContext => {
  return useContext(CreateProfileContext)
}
