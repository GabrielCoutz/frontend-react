import { RootState } from '../store'

export const selectUserState = ({ user }: RootState) => user

export const selectUserName = ({ user }: RootState) => user?.user?.name

export const selectUser = ({ user }: RootState) => user?.user

export const selectUserProducts = ({ user }: RootState) => user.user.products
