import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UpdateUserPayload } from '../../helpers/request/user'
import { IUser } from '../../interfaces/User'

const initialState: IUser = {} as IUser

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state, { payload }: PayloadAction<IUser>) => ({
      ...state,
      ...payload,
    }),
    updateUser: (state, { payload }: PayloadAction<UpdateUserPayload>) => ({
      ...state,
      ...payload,
    }),
  },
})

export const { saveUser, updateUser } = userSlice.actions
export default userSlice.reducer
