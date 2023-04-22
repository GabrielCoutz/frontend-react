import React, { HTMLAttributes, PropsWithChildren } from 'react'

const List = (props: PropsWithChildren<HTMLAttributes<HTMLUListElement>>) => {
  return (
    <ul
      {...props}
      className={`flex flex-col container mx-auto px-4 gap-4 m-4 ${props.className}`}
    >
      {props.children}
    </ul>
  )
}

export default List
