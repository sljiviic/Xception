import axios from "axios"

// Custom instance defaults
const authAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/auth',
  timeout: 5000,
  withCredentials: true,
})

export const authApi = {
  login: async (userData) => {
    const response = await authAxios.post('/login', userData)
    return response.data
  },
  register: async (userData) => {
    const response = await authAxios.post('/register', userData)
    return response.data
  },
  refreshToken: async () => {
    // Refresh token will be automatically sent via HttpOnly cookie
    const response = await authAxios.post('/refresh-token')
    return response.data
  },
  // To clear HttpOnly cookie
  logout: async () => {
    await authAxios.post('/logout')
  },
  // Email verification
  verifyEmail: async (token) => {
    await authAxios.post(`/verify-email?token=${token}`)
  }
}