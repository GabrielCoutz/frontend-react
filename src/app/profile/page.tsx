'use client'

import { useDispatch } from 'react-redux'
import React, { useEffect } from 'react'

import { ProfileDisplay } from '../../components/ProfileDisplay'
import { saveUser } from '../../redux/user/userSlice'
import { Sidenav } from '../../components/Sidenav'
import { useCookie } from '../../hooks/useCookie'
import { api } from '../../helpers/request'

const ProfilePage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const { userId } = useCookie()

    const fetchUser = async () => {
      const data = await api.user.get({ id: userId })
      if (data) dispatch(saveUser(data.data))
    }

    fetchUser()
  }, [])

  return (
    <section className="container grid grid-cols-[300px,1fr] mx-auto max-w-6xl max-md:grid-cols-1 my-32 px-4">
      <Sidenav.Nav>
        <Sidenav.NavToggle />
        <Sidenav.Options />
      </Sidenav.Nav>
      <ProfileDisplay />
    </section>
  )
}

export default ProfilePage
