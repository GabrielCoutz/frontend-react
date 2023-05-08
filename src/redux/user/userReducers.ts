import { PayloadAction } from '@reduxjs/toolkit'
import { IUserResponse } from '../../helpers/request/user/interface'

import { IUser } from '../../interfaces/User'
import { IUserState } from './userSlice'

const saveUser = (
  state: IUserState,
  { payload }: PayloadAction<IUser>,
): IUserState => ({
  ...state,
  data: payload,
  error: null,
  isLoading: false,
})

const updateUserStart = (state: IUserState): IUserState => ({
  ...state,
  error: null,
  isLoading: true,
})

const updateUserFail = (
  state: IUserState,
  { payload }: PayloadAction<string>,
): IUserState => ({
  ...state,
  error: payload,
  isLoading: false,
})

const updateUserSuccess = (
  state: IUserState,
  { payload }: PayloadAction<IUserResponse>,
): IUserState => {
  const updatedUser = {
    ...state.data,
    ...payload,
  } as IUser

  return {
    ...state,
    data: updatedUser,
    error: null,
    isLoading: false,
  }
}

const deleteUserStart = (state: IUserState): IUserState => ({
  ...state,
  isLoading: true,
})

const deleteUserFail = (
  state: IUserState,
  { payload }: PayloadAction<string>,
): IUserState => ({
  ...state,
  error: payload,
  isLoading: false,
})

const deleteUserSuccess = (state: IUserState): IUserState => ({
  ...state,
  data: null,
  error: null,
  isLoading: false,
})

const logoutUser = (state: IUserState): IUserState => ({
  ...state,
  data: null,
  error: null,
  isLoading: false,
})

export default {
  saveUser,
  updateUserSuccess,
  updateUserStart,
  updateUserFail,
  deleteUserStart,
  deleteUserFail,
  deleteUserSuccess,
  logoutUser,
}
