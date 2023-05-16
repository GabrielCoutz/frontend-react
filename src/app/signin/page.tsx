import React from 'react'

import SigninForm from '../../components/SigninForm'

const SigninPage = () => {
  return (
    <section>
      <h1 className="text-center text-2xl text-slate-800 font-semibold mt-48 max-md:mt-24">
        É bom te ver de novo
      </h1>
      <SigninForm />
    </section>
  )
}

export default SigninPage
