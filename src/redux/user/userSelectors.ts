import { RootState } from '../store'

export const selectUserState = ({ user }: RootState) => user

export const selectUserName = ({ user }: RootState) => user?.data?.name

export const selectUser = ({ user }: RootState) => user?.data
