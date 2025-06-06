import axios from 'axios'
import { setupAuthInterceptors } from '../interceptors/auth'

const baseAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
})

setupAuthInterceptors(baseAxios)

export default baseAxios