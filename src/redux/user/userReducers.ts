import { PayloadAction } from '@reduxjs/toolkit'
import { IUpdateUserPayload } from '../../helpers/request/user'
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
  { payload }: PayloadAction<IUpdateUserPayload>,
): IUserState => ({
  ...state,
  data: {
    ...state.data,
    ...payload,
  },
  error: null,
  isLoading: false,
})

export default {
  saveUser,
  updateUserSuccess,
  updateUserStart,
  updateUserFail,
}
