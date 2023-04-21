import { createSlice } from '@reduxjs/toolkit'

import { IUser } from '../../interfaces/User'
import userReducers from './userReducers'

export interface IUserState {
  user: IUser
  isLoading: boolean
  error: string | null
}
const initialState: IUserState = {} as IUserState

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: userReducers,
})

export const { saveUser, updateUserStart, updateUserFail, updateUserSuccess } =
  userSlice.actions
export default userSlice.reducer
