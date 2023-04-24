import { createSlice } from '@reduxjs/toolkit'

import { IUser } from '../../interfaces/User'
import userReducers from './userReducers'

export interface IUserState {
  data: IUser | null
  isLoading: boolean
  error: string | null
}
const initialState: IUserState = {
  data: null,
  error: null,
  isLoading: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: userReducers,
})

export const {
  saveUser,
  updateUserStart,
  updateUserFail,
  updateUserSuccess,
  deleteUserStart,
  deleteUserFail,
  deleteUserSuccess,
} = userSlice.actions
export default userSlice.reducer
