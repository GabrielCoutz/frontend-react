'use client'

import { useEffect } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { IUser } from '../../interfaces/User'

interface IUserState {
  data: IUser | null
  isLoading: boolean
  error: string | null
}

interface IUserActions {
  saveUser: (payload: IUser) => void
  updateUserStart: () => void
  updateUserFail: (payload: string) => void
  updateUserSuccess: (payload: IUser) => void
  deleteUserStart: () => void
  deleteUserFail: (payload: string) => void
  deleteUserSuccess: () => void
  logoutUser: () => void
}

type IUserStore = IUserState & IUserActions

const useUserSlice = create<IUserStore>()(
  persist(
    (set) => ({
      data: null,
      error: null,
      isLoading: false,
      saveUser: (payload) =>
        set((state) => ({
          ...state,
          data: payload,
        })),
      updateUserStart: () =>
        set((state) => ({
          ...state,
          error: null,
          isLoading: true,
        })),
      updateUserFail: (payload) =>
        set((state) => ({
          ...state,
          error: payload,
          isLoading: false,
        })),
      updateUserSuccess: (payload) =>
        set((state) => ({
          ...state,
          data: payload,
          error: null,
          isLoading: false,
        })),
      logoutUser: () =>
        set((state) => ({
          ...state,
          data: null,
          error: null,
          isLoading: false,
        })),
      deleteUserStart: () =>
        set((state) => ({
          ...state,
          error: null,
          isLoading: true,
        })),
      deleteUserFail: (payload) =>
        set((state) => ({
          ...state,
          error: payload,
          isLoading: false,
        })),
      deleteUserSuccess: () =>
        set((state) => ({
          ...state,
          data: null,
          error: null,
          isLoading: false,
        })),
    }),
    {
      name: 'user-store',
      skipHydration: true,
    },
  ),
)

export const useUserStore = () => {
  useEffect(() => {
    useUserSlice.persist.rehydrate()
  }, [])

  return useUserSlice()
}
