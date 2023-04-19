import React from 'react'
import { IUser } from '../../interfaces/User'

const Owner = ({ name: owner }: Pick<IUser, 'name'>) => {
  return <span className="italic text-gray-400 text-sm mb-2">@{owner}</span>
}

export default Owner
