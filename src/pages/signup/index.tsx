import React from 'react'
import SignupForm from '../../components/SignupForm'

const Signup = () => {
  return (
    <section>
      <h1 className="text-center text-2xl text-slate-800 font-semibold mt-48 max-md:mt-24">
        Crie sua conta
      </h1>
      <SignupForm />
    </section>
  )
}

export default Signup
