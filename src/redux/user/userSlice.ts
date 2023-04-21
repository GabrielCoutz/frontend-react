import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../interfaces/User'

const initialState: IUser = {} as IUser

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state, { payload }: PayloadAction<IUser>) => {
      return {
        ...state,
        ...payload,
      }
    },
  },
})

export const { saveUser } = userSlice.actions
export default userSlice.reducer
