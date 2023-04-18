import { useRouter } from 'next/router'
import React from 'react'

const Repo = () => {
  const { query } = useRouter()
  return (
    <div>Repo: {query.id}</div>
  )
}

export default Repo