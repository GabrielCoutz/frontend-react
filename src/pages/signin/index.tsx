import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import React from 'react'

import SigninForm from '../../components/SigninForm'
import { api } from '../../helpers/request'

const signin = () => {
  return (
    <section>
      <h1 className="text-center text-2xl text-slate-800 font-semibold mt-48 max-md:mt-24">
        É bom te ver de novo
      </h1>
      <SigninForm />
    </section>
  )
}

export default signin

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const redirectObject = {
    destination: '/profile',
    permanent: false,
  }

  const { token, id } = parseCookies(ctx)
  if (!token || !id)
    return {
      props: {},
    }

  try {
    const { data: authData } = await api.auth.validate(token)
    if (authData.id === id)
      return {
        redirect: redirectObject,
      }
  } catch {}

  return {
    props: {},
  }
}
