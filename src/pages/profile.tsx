import { GetServerSideProps } from 'next'
import React from 'react'
import { api } from '../helpers/request'
import { parseCookies } from 'nookies'

const profile = ({ userData }: { userData: string }) => {
  return <pre>{JSON.stringify(userData)}</pre>
}

export default profile

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const redirectObject = {
    destination: 'signin',
    permanent: false,
  }

  const { token, id } = parseCookies(ctx)
  if (!token || !id)
    return {
      redirect: redirectObject,
    }

  try {
    const { data: authData } = await api.auth.validate(token)
    if (authData.id !== id) throw new Error()

    const { data: userData } = await api.user.get(id)
    return {
      props: {
        userData,
      },
    }
  } catch {
    return {
      redirect: redirectObject,
    }
  }
}
