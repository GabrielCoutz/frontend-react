import React, { PropsWithChildren } from 'react'

const Card = ({ children }: PropsWithChildren) => {
  return (
    <li className="rounded border border-gray-200 shadow-sm hover:shadow-md transition-all">
      {children}
    </li>
  )
}

export default Card
