import axios from 'axios'
import { user } from './user'
import { auth } from './auth'
import { product } from './product'

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const api = {
  user,
  auth,
  product,
}
