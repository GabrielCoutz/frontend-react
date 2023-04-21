import { PayloadAction } from '@reduxjs/toolkit'
import { UpdateUserPayload } from '../../helpers/request/user'
import { IUser } from '../../interfaces/User'
import { IUserState } from './userSlice'

const saveUser = (
  state: IUserState,
  { payload }: PayloadAction<IUser>,
): IUserState => ({
  ...state,
  user: payload,
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
  { payload }: PayloadAction<UpdateUserPayload>,
): IUserState => ({
  ...state,
  user: {
    ...state.user,
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
