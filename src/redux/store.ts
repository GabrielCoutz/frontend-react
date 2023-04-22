import { configureStore } from '@reduxjs/toolkit'
import productReducer from './product/productSlice'
import userReducer from './user/userSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
  },
})

export default store

// Typescript increase

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
