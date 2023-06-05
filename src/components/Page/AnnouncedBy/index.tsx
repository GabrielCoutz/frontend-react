import React from 'react'
import { Page } from '..'

interface AnnouncedBy {
  children: string
}

export const AnnouncedBy = ({ children }: AnnouncedBy) => {
  return (
    <div
      data-testid="page-announcedby"
      className="border border-slate-200 p-4 rounded-lg space-y-2 shadow-sm flex flex-col items-center text-center"
    >
      <Page.Subtitle>Anunciado por</Page.Subtitle>
      <Page.Box>
        <h3 className="italic">{children}</h3>
        <div className="inline-block h-16 w-16 rounded-full ring-2 ring-white bg-gray-300" />
      </Page.Box>
    </div>
  )
}
