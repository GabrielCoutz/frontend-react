import React from 'react'

interface DotListProps {
  list: {
    id: string
    info: string
  }[]
}

export const DotList = ({ list }: DotListProps) => {
  return (
    <ul data-testid="productpage-dotlist" className="list-disc space-y-2 pl-8">
      {list.map(({ info, id }) => (
        <li className="text-gray-600" key={id}>
          {info}
        </li>
      ))}
    </ul>
  )
}
