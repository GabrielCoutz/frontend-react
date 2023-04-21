import Link from 'next/link'
import React, { AnchorHTMLAttributes } from 'react'

interface HeaderLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: string
}

export const HeaderLink = (props: HeaderLinkProps) => {
  return (
    <Link
      {...props}
      href={props.href || ''}
      className="py-2 px-3 rounded-lg hover:bg-indigo-500 transition block max-md:hover:bg-slate-600"
    >
      {props.children}
    </Link>
  )
}
