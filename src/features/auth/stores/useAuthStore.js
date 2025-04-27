import { create } from 'zustand'
import { authApi } from '../api/authApi'
import axios from 'axios'

export const useAuthStore = create((set, get) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // userData needs to be either a username or an email and password
  login: async (userData) => {
    set({ isLoading: true, error: null })
    try {
      const { user, accessToken } = await authApi.login(userData)
      set({ user, accessToken, isAuthenticated: true, isLoading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error : new Error('Login failed'),
        isLoading: false
      })
      throw error
    }
  },

  // userData needs to be a username, an email, and password.
  register: async (userData) => {
    set({ isLoading: true, error: null })
    try {
      const { user, accessToken } = await authApi.register(userData)
      set({ user, accessToken, isAuthenticated: true, isLoading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error : new Error('Registration failed'),
        isLoading: false
      })
      throw error
    }
  },

  logout: async () => {
    try {
      await authApi.logout()
    } finally {
      set({
        user: null,
        accessToken: null,
        isAuthenticated: false
      })
    }
  },

  refreshToken: async () => {
    try {
      const { accessToken } = await authApi.refreshToken()
      set({ accessToken })
      return accessToken
    } catch (error) {
      get().logout()
      throw error
    }
  },

  initializeAuth: async () => {
    try {
      const { accessToken } = await get().refreshToken()
      set({ accessToken, isAuthenticated: !!accessToken })
    } catch {
      set({ isAuthenticated: false })
    }
  },

  clearError: () => set({ error: null })
}))

// Axios interceptor setup
let refreshPromise = null

// Attaching the access token to the Authorization header
axios.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken

    if (accessToken) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Catch 401 Unauthorized errors (usually because the access token is expired), refresh the token, and then retry the original request seamlessly — without user interaction
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const { status } = error.response || {}

    // Handle 401 Unauthorized
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Prevent multiple refresh attempts
        refreshPromise = refreshPromise || useAuthStore.getState().refreshToken()
        const newToken = await refreshPromise
        refreshPromise = null

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return axios(originalRequest)
      } catch (refreshError) {
        useAuthStore.getState().logout()
        // Handling refresh failure
        return Promise.reject(refreshError)
      }
    }
    // Handling non-401 errors
    return Promise.reject(error)
  }
)