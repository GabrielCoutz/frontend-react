'use client'

import { useDispatch } from 'react-redux'
import React, { useEffect } from 'react'

import { ProfileDisplay } from '../../components/ProfileDisplay'
import { saveUser } from '../../redux/user/userSlice'
import { Sidenav } from '../../components/Sidenav'
import { useCookie } from '../../hooks/useCookie'
import { api } from '../../helpers/request'
import { saveProducts } from '../../redux/product/productSlice'
import { useRouter } from 'next/navigation'
import { useAxios } from '../../hooks/useAxios'

const ProfilePage = () => {
  const dispatch = useDispatch()
  const { send } = useAxios(api.user.get)
  const { push } = useRouter()

  useEffect(() => {
    const { userId } = useCookie()

    const fetchUser = async () => {
      const result = await send({ id: userId })
      if (!result) return push('/signin')

      const { data } = result
      dispatch(saveUser(data))

      if (data.products) dispatch(saveProducts(data.products))
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
