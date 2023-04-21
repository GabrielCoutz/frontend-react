import React, { useState } from 'react'
import { GetServerSideProps } from 'next'

import { api } from '../helpers/request'
import { parseCookies } from 'nookies'
import { Sidenav } from '../components/Sidenav'
import { IOption, ProfileContext } from '../contexts/profile'
import { ProfileDisplay } from '../components/ProfileDisplay'
import { IUser } from '../interfaces/User'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { saveUser } from '../redux/user/userSlice'

const profile = ({ userData }: { userData: IUser }) => {
  const dispatch = useAppDispatch()
  const [activeOption, setActiveOption] = useState<IOption | null>(null)
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  dispatch(saveUser(userData))

  return (
    <ProfileContext.Provider
      value={{
        activeOption,
        setActiveOption,
        menuIsOpen,
        setMenuIsOpen,
      }}
    >
      <section className="container grid grid-cols-[300px,1fr] mx-auto max-w-6xl max-md:grid-cols-1 my-32 px-4">
        <Sidenav.Nav>
          <Sidenav.NavToggle />
          <Sidenav.Options />
        </Sidenav.Nav>
        <ProfileDisplay />
      </section>
    </ProfileContext.Provider>
  )
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
