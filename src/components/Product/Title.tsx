import React, { HTMLAttributes, PropsWithChildren } from 'react'

const Title = (
  props: PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>,
) => {
  return (
    <h1 {...props} className={`text-gray-800 font-medium ${props.className}`}>
      {props.children}
    </h1>
  )
}

export default Title
