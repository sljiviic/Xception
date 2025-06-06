import { create } from 'zustand'
import { authApi } from '../api/authApi'

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
      set({ user, accessToken, isAuthenticated: true })
    } catch (error) {
      set({
        error: error instanceof Error ? error : new Error('Login failed'),
        isLoading: false
      })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  // userData needs to be a username, an email, and password.
  register: async (userData) => {
    set({ isLoading: true, error: null })
    try {
      const { user, accessToken } = await authApi.register(userData)
      set({ user, accessToken, isAuthenticated: true })
    } catch (error) {
      set({
        error: error instanceof Error ? error : new Error('Registration failed'),
        isLoading: false
      })
      throw error
    } finally {
      set({ isLoading: false })
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
    } catch {
      get().logout()
    }
  },

  initializeAuth: async () => {
    if (get().isAuthenticated) return

    try {
      const { accessToken } = await get().refreshToken()
      set({ accessToken, isAuthenticated: !!accessToken })
    } catch {
      set({ isAuthenticated: false })
    }
  },

  clearError: () => set({ error: null })
}))