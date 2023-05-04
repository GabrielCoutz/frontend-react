import React, { HtmlHTMLAttributes, PropsWithChildren } from 'react'

const Card = (props: PropsWithChildren<HtmlHTMLAttributes<HTMLLIElement>>) => {
  return (
    <li
      {...props}
      className={`rounded-md border border-slate-200 shadow-sm hover:shadow-md transition p-4 list-none ${props.className}`}
    >
      {props.children}
    </li>
  )
}

export default Card
