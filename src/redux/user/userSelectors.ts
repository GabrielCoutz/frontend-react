import { useAppSelector } from '../../hooks/useAppSelector'

export const selectUser = () => useAppSelector((state) => state.user)
export const selectUserName = () => useAppSelector((state) => state.user.name)
