'use client'

import React, { useEffect } from 'react'

import { ProfileDisplay } from '../../components/ProfileDisplay'
import { Sidenav } from '../../components/Sidenav'
import { useCookie } from '../../hooks/useCookie'
import { api } from '../../helpers/request'
import { useRouter } from 'next/navigation'
import { useAxios } from '../../hooks/useAxios'
import { useUserStore } from '../../hooks/useUserStore'
import { useProductStore } from '../../hooks/useProductStore'

const ProfilePage = () => {
  const { saveUser } = useUserStore()
  const { saveProducts } = useProductStore()
  const { send } = useAxios(api.user.get)
  const { push } = useRouter()
  const { userId } = useCookie()

  useEffect(() => {
    const fetchUser = async () => {
      const result = await send({ id: userId })
      if (!result) return push('/signin')

      const { data } = result
      saveUser(data)

      if (data.products) saveProducts(data.products)
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
